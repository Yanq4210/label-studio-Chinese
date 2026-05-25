# syntax=docker/dockerfile:1
ARG NODE_VERSION=22
ARG PYTHON_VERSION=3.13
ARG POETRY_VERSION=2.3.2
ARG VERSION_OVERRIDE
ARG BRANCH_OVERRIDE

################################ Overview
# This Dockerfile builds a Label Studio environment.
# It consists of five main stages:
# 1. "frontend-builder" - Compiles the frontend assets using Node.
# 2. "frontend-version-generator" - Generates version files for frontend sources.
# 3. "venv-builder" - Prepares the virtualenv environment.
# 4. "py-version-generator" - Generates version files for python sources.
# 5. "prod" - Creates the final production image with the Label Studio, Nginx, and other dependencies.

################################ Stage: frontend-builder (build frontend assets)
FROM --platform=${BUILDPLATFORM} node:${NODE_VERSION}-trixie AS frontend-builder

ENV BUILD_NO_SERVER=true \
    BUILD_NO_HASH=true \
    BUILD_NO_CHUNKS=true \
    BUILD_MODULE=true \
    YARN_CACHE_FOLDER=/root/web/.yarn \
    NX_CACHE_DIRECTORY=/root/web/.nx \
    NODE_ENV=production \
    NODE_OPTIONS="--max-old-space-size=4096" \
    npm_config_registry=https://registry.npmmirror.com

WORKDIR /label-studio/web

# 配置 Yarn 使用国内镜像源
RUN yarn config set registry https://registry.npmmirror.com && \
    yarn config set network-timeout 1200000

COPY web/package.json .
COPY web/yarn.lock .
COPY web/tools tools

# 替换 yarn.lock 中写死的原始 registry，确保下载全部走镜像源
RUN sed -i \
      -e 's#https://registry.yarnpkg.com#https://registry.npmmirror.com#g' \
      -e 's#https://registry.npmjs.org#https://registry.npmmirror.com#g' \
      yarn.lock || true

RUN --mount=type=cache,target=/root/web/.yarn,id=yarn-cache,sharing=locked \
    --mount=type=cache,target=/root/web/.nx,id=nx-cache,sharing=locked \
    yarn install \
      --prefer-offline \
      --no-progress \
      --pure-lockfile \
      --frozen-lockfile \
      --ignore-engines \
      --non-interactive \
      --production=false \
      --network-timeout 1800000

COPY web/ .
COPY pyproject.toml ../pyproject.toml

RUN --mount=type=cache,target=/root/web/.yarn,id=yarn-cache,sharing=locked \
    --mount=type=cache,target=/root/web/.nx,id=nx-cache,sharing=locked \
    yarn run build

################################ Stage: frontend-version-generator
FROM frontend-builder AS frontend-version-generator

RUN --mount=type=cache,target=/root/web/.yarn,id=yarn-cache,sharing=locked \
    --mount=type=cache,target=/root/web/.nx,id=nx-cache,sharing=locked \
    --mount=type=bind,source=.git,target=../.git \
    yarn version:libs; \
    if [ ! -f dist/apps/labelstudio/version.json ]; then \
        mkdir -p dist/apps/labelstudio && echo '{}' > dist/apps/labelstudio/version.json; \
    fi; \
    if [ ! -f dist/libs/editor/version.json ]; then \
        mkdir -p dist/libs/editor && echo '{}' > dist/libs/editor/version.json; \
    fi; \
    if [ ! -f dist/libs/datamanager/version.json ]; then \
        mkdir -p dist/libs/datamanager && echo '{}' > dist/libs/datamanager/version.json; \
    fi

################################ Stage: venv-builder (prepare the virtualenv)
FROM python:${PYTHON_VERSION}-slim-trixie AS venv-builder

ARG POETRY_VERSION
ARG INCLUDE_DEV=false

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    PIP_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple \
    PIP_TRUSTED_HOST=pypi.tuna.tsinghua.edu.cn \
    PIP_CACHE_DIR="/.cache" \
    POETRY_CACHE_DIR="/.poetry-cache" \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_VIRTUALENVS_PREFER_ACTIVE_PYTHON=true

# 换阿里云 APT 源（兼容 Debian 13 新格式）
RUN set -eux; \
    if [ -f /etc/apt/sources.list ]; then \
      sed -i \
        -e 's|http://deb.debian.org/debian|https://mirrors.aliyun.com/debian|g' \
        -e 's|http://security.debian.org/debian-security|https://mirrors.aliyun.com/debian-security|g' \
        -e 's|https://deb.debian.org/debian|https://mirrors.aliyun.com/debian|g' \
        -e 's|https://security.debian.org/debian-security|https://mirrors.aliyun.com/debian-security|g' \
        /etc/apt/sources.list; \
    fi; \
    if [ -f /etc/apt/sources.list.d/debian.sources ]; then \
      sed -i \
        -e 's|http://deb.debian.org/debian|https://mirrors.aliyun.com/debian|g' \
        -e 's|http://security.debian.org/debian-security|https://mirrors.aliyun.com/debian-security|g' \
        -e 's|https://deb.debian.org/debian|https://mirrors.aliyun.com/debian|g' \
        -e 's|https://security.debian.org/debian-security|https://mirrors.aliyun.com/debian-security|g' \
        /etc/apt/sources.list.d/debian.sources; \
    fi

# 一次性安装所有构建依赖
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
    set -eux; \
    apt-get update; \
    apt-get install --no-install-recommends -y \
        build-essential \
        git \
        ca-certificates \
        curl \
        pkg-config \
        python3-dev; \
    apt-get autoremove -y

# 用 pip 安装固定版本 Poetry，走清华源（而非官方安装脚本访问 pypi.org）
RUN pip install --no-cache-dir "poetry==${POETRY_VERSION}" && \
    poetry --version

WORKDIR /label-studio

ENV VENV_PATH="/label-studio/.venv"
ENV PATH="$VENV_PATH/bin:$PATH"

## Starting from this line all packages will be installed in $VENV_PATH

# Copy dependency files
COPY pyproject.toml poetry.lock README.md ./

# Install dependencies
# - poetry check --lock: 校验锁文件一致性，不重新解析
# - poetry source add: 添加清华源
# - git config: 确保 GitHub 依赖走 HTTPS 协议
# - 不再使用 poetry lock（构建时不应重新生成锁文件）
RUN --mount=type=cache,target=/.poetry-cache,id=poetry-cache,sharing=locked \
    poetry source remove tuna 2>/dev/null || true; \
    poetry source add --priority=primary tuna https://pypi.tuna.tsinghua.edu.cn/simple/; \
    git config --global url."https://github.com/".insteadOf git@github.com:; \
    git config --global url."https://".insteadOf git://; \
    poetry config installer.max-workers 2; \
    poetry check --lock; \
    if [ "$INCLUDE_DEV" = "true" ]; then \
        poetry install --no-root --extras uwsgi --with test --no-interaction; \
    else \
        poetry install --no-root --without test --extras uwsgi --no-interaction; \
    fi

# Install Label Studio
COPY label_studio label_studio

# --extras uwsgi is mandatory here due to Poetry issue #7302
# https://github.com/python-poetry/poetry/issues/7302
RUN --mount=type=cache,target=/.poetry-cache,id=poetry-cache,sharing=locked \
    poetry install --only-root --extras uwsgi --no-interaction && \
    python3 label_studio/manage.py collectstatic --no-input

################################ Stage: py-version-generator
FROM venv-builder AS py-version-generator

ARG VERSION_OVERRIDE
ARG BRANCH_OVERRIDE

RUN --mount=type=bind,source=.git,target=./.git \
    VERSION_OVERRIDE=${VERSION_OVERRIDE} BRANCH_OVERRIDE=${BRANCH_OVERRIDE} poetry run python label_studio/core/version.py; \
    if [ ! -f label_studio/core/version_.py ]; then \
        echo '__version__ = "0.0.0-dev"' > label_studio/core/version_.py; \
    fi

################################### Stage: prod
FROM python:${PYTHON_VERSION}-slim-trixie AS production

ENV LS_DIR=/label-studio \
    HOME=/label-studio \
    LABEL_STUDIO_BASE_DATA_DIR=/label-studio/data \
    OPT_DIR=/opt/heartex/instance-data/etc \
    PATH="/label-studio/.venv/bin:$PATH" \
    DJANGO_SETTINGS_MODULE=core.settings.label_studio \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR $LS_DIR

# 换阿里云 APT 源（兼容 Debian 13 新格式）
RUN set -eux; \
    if [ -f /etc/apt/sources.list ]; then \
      sed -i \
        -e 's|http://deb.debian.org/debian|https://mirrors.aliyun.com/debian|g' \
        -e 's|http://security.debian.org/debian-security|https://mirrors.aliyun.com/debian-security|g' \
        -e 's|https://deb.debian.org/debian|https://mirrors.aliyun.com/debian|g' \
        -e 's|https://security.debian.org/debian-security|https://mirrors.aliyun.com/debian-security|g' \
        /etc/apt/sources.list; \
    fi; \
    if [ -f /etc/apt/sources.list.d/debian.sources ]; then \
      sed -i \
        -e 's|http://deb.debian.org/debian|https://mirrors.aliyun.com/debian|g' \
        -e 's|http://security.debian.org/debian-security|https://mirrors.aliyun.com/debian-security|g' \
        -e 's|https://deb.debian.org/debian|https://mirrors.aliyun.com/debian|g' \
        -e 's|https://security.debian.org/debian-security|https://mirrors.aliyun.com/debian-security|g' \
        /etc/apt/sources.list.d/debian.sources; \
    fi

# Install runtime prerequisites for app
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
    set -eux; \
    apt-get update; \
    apt-get upgrade -y; \
    apt-get install --no-install-recommends -y \
        libexpat1 \
        libgl1 \
        libglx-mesa0 \
        libglib2.0-0t64 \
        gnupg2 \
        curl \
        nginx \
        bash; \
    apt-get autoremove -y

# Create directories and set permissions
RUN set -eux; \
    mkdir -p $LS_DIR $LABEL_STUDIO_BASE_DATA_DIR $OPT_DIR && \
    chown -R 1001:0 $LS_DIR $LABEL_STUDIO_BASE_DATA_DIR $OPT_DIR /var/log/nginx /etc/nginx

# Copy nginx configuration
COPY --chown=1001:0 deploy/default.conf /etc/nginx/nginx.conf

# Copy essential files for installing Label Studio and its dependencies
COPY --chown=1001:0 pyproject.toml .
COPY --chown=1001:0 poetry.lock .
COPY --chown=1001:0 README.md .
COPY --chown=1001:0 LICENSE LICENSE
COPY --chown=1001:0 licenses licenses
COPY --chown=1001:0 deploy deploy

# Ensure all .sh scripts have execute permission
# (symlinks that were broken in the source repo have been fixed to wrapper scripts)
RUN find /label-studio/deploy -name "*.sh" -exec chmod +x {} \;

# Copy files from build stages
COPY --chown=1001:0 --from=venv-builder               $LS_DIR                                           $LS_DIR
COPY --chown=1001:0 --from=py-version-generator       $LS_DIR/label_studio/core/version_.py             $LS_DIR/label_studio/core/version_.py
COPY --chown=1001:0 --from=frontend-builder           $LS_DIR/web/dist                                  $LS_DIR/web/dist
COPY --chown=1001:0 --from=frontend-version-generator $LS_DIR/web/dist/apps/labelstudio/version.json    $LS_DIR/web/dist/apps/labelstudio/version.json
COPY --chown=1001:0 --from=frontend-version-generator $LS_DIR/web/dist/libs/editor/version.json         $LS_DIR/web/dist/libs/editor/version.json
COPY --chown=1001:0 --from=frontend-version-generator $LS_DIR/web/dist/libs/datamanager/version.json    $LS_DIR/web/dist/libs/datamanager/version.json

USER 1001

EXPOSE 8080

ENTRYPOINT ["./deploy/docker-entrypoint.sh"]
CMD ["label-studio"]