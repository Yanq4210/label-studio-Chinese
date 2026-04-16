# syntax=docker/dockerfile:1
ARG NODE_VERSION=22
ARG PYTHON_VERSION=3.13
ARG POETRY_VERSION=2.1.4
ARG VERSION_OVERRIDE
ARG BRANCH_OVERRIDE

################################ Stage: frontend-builder
FROM --platform=${BUILDPLATFORM} node:${NODE_VERSION}-trixie AS frontend-builder

ENV BUILD_NO_SERVER=true \
    BUILD_NO_HASH=true \
    BUILD_NO_CHUNKS=true \
    BUILD_MODULE=true \
    YARN_CACHE_FOLDER=/root/web/.yarn \
    NX_CACHE_DIRECTORY=/root/web/.nx \
    NODE_ENV=production

WORKDIR /label-studio/web

# 只换源，其他保持原版
RUN yarn config set registry https://registry.npmmirror.com
RUN yarn config set network-timeout 1200000

COPY web/package.json .
COPY web/yarn.lock .
COPY web/tools tools

RUN --mount=type=cache,target=/root/web/.yarn,id=yarn-cache,sharing=locked \
    --mount=type=cache,target=/root/web/.nx,id=nx-cache,sharing=locked \
    yarn install --prefer-offline --no-progress --pure-lockfile --frozen-lockfile --ignore-engines --non-interactive --production=false

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

################################ Stage: venv-builder
FROM python:${PYTHON_VERSION}-slim-trixie AS venv-builder

ARG POETRY_VERSION

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    PIP_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple \
    PIP_TRUSTED_HOST=pypi.tuna.tsinghua.edu.cn \
    POETRY_CACHE_DIR="/.poetry-cache" \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_VIRTUALENVS_PREFER_ACTIVE_PYTHON=true \
    PATH="/opt/poetry/bin:$PATH"

ADD https://install.python-poetry.org /tmp/install-poetry.py
RUN python /tmp/install-poetry.py

# 换阿里云 APT 源（兼容 Debian 13 新格式）
RUN sed -i 's|deb.debian.org|mirrors.aliyun.com|g' /etc/apt/sources.list 2>/dev/null || true; \
    sed -i 's|deb.debian.org|mirrors.aliyun.com|g' /etc/apt/sources.list.d/debian.sources 2>/dev/null || true

RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
    set -eux; \
    apt-get update; \
    apt-get install --no-install-recommends -y \
            build-essential git; \
    apt-get autoremove -y

WORKDIR /label-studio

ENV VENV_PATH="/label-studio/.venv"
ENV PATH="$VENV_PATH/bin:$PATH"

COPY pyproject.toml poetry.lock README.md ./

ARG INCLUDE_DEV=false

#RUN --mount=type=cache,target=/.poetry-cache,id=poetry-cache,sharing=locked \
#    poetry source add --priority=primary tuna https://pypi.tuna.tsinghua.edu.cn/simple/ && \
#    poetry lock && \
#    if [ "$INCLUDE_DEV" = "true" ]; then \
#        poetry install --no-root --extras uwsgi --with test; \
#    else \
#        poetry install --no-root --without test --extras uwsgi; \
#    fi


# 先安装 git 和 ca-certificates（解决 git+https 依赖）
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
    apt-get update && \
    apt-get install --no-install-recommends -y git ca-certificates && \
    apt-get autoremove -y

RUN --mount=type=cache,target=/.poetry-cache,id=poetry-cache,sharing=locked \
    poetry source add --priority=primary tuna https://pypi.tuna.tsinghua.edu.cn/simple/ && \
    # 关键修复：配置 git 使用 https 协议，避免 ssh/git 协议问题
    git config --global url."https://github.com/".insteadOf git@github.com: && \
    git config --global url."https://".insteadOf git:// && \
    # 限制并发，降低网络压力（香港访问 GitHub 容易不稳定）
    poetry config installer.max-workers 2 && \
    # 使用 --no-update 避免每次都重新解析全部依赖（加快速度）
    poetry lock --no-interaction && \
    if [ "$INCLUDE_DEV" = "true" ]; then \
        poetry install --no-root --extras uwsgi --with test --no-interaction; \
    else \
        poetry install --no-root --without test --extras uwsgi --no-interaction; \
    fi

COPY label_studio label_studio

RUN --mount=type=cache,target=/.poetry-cache,id=poetry-cache,sharing=locked \
    poetry install --only-root --extras uwsgi && \
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

################################### Stage: production
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
RUN sed -i 's|deb.debian.org|mirrors.aliyun.com|g' /etc/apt/sources.list 2>/dev/null || true; \
    sed -i 's|deb.debian.org|mirrors.aliyun.com|g' /etc/apt/sources.list.d/debian.sources 2>/dev/null || true

# === 系统包安装（保持你的原有）===
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
    set -eux; \
    apt-get update; \
    apt-get upgrade -y; \
    apt-get install --no-install-recommends -y libexpat1 libgl1 libglx-mesa0 libglib2.0-0t64 \
        gnupg2 curl nginx; \
    apt-get autoremove -y

# 创建目录并设置权限
RUN set -eux; \
    mkdir -p $LS_DIR $LABEL_STUDIO_BASE_DATA_DIR $OPT_DIR && \
    chown -R 1001:0 $LS_DIR $LABEL_STUDIO_BASE_DATA_DIR $OPT_DIR /var/log/nginx /etc/nginx

# 复制 nginx 配置
COPY --chown=1001:0 deploy/default.conf /etc/nginx/nginx.conf

# 复制项目元数据文件
COPY --chown=1001:0 pyproject.toml poetry.lock README.md LICENSE ./
COPY --chown=1001:0 licenses licenses

# ==================== 关键修复部分 ====================
# 完整、明确地复制整个 deploy 目录（推荐方式）
COPY --chown=1001:0 deploy /label-studio/deploy

# 额外保险措施：强制确保 common 目录存在并复制文件（防止 build cache 或 .dockerignore 导致缺失）
RUN mkdir -p /label-studio/deploy/docker-entrypoint.d/common && \
    cp -a deploy/docker-entrypoint.d/common/. /label-studio/deploy/docker-entrypoint.d/common/ 2>/dev/null || true

# 给所有 .sh 文件加上执行权限（使用完整路径）
RUN find /label-studio/deploy -name "*.sh" -exec chmod +x {} \;
# ======================================================

# 从其他 stage 复制代码和静态资源（去重）
COPY --chown=1001:0 --from=venv-builder $LS_DIR $LS_DIR
COPY --chown=1001:0 --from=py-version-generator $LS_DIR/label_studio/core/version_.py $LS_DIR/label_studio/core/version_.py
COPY --chown=1001:0 --from=frontend-builder $LS_DIR/web/dist $LS_DIR/web/dist
COPY --chown=1001:0 --from=frontend-version-generator $LS_DIR/web/dist/apps/labelstudio/version.json $LS_DIR/web/dist/apps/labelstudio/version.json
COPY --chown=1001:0 --from=frontend-version-generator $LS_DIR/web/dist/libs/editor/version.json $LS_DIR/web/dist/libs/editor/version.json
COPY --chown=1001:0 --from=frontend-version-generator $LS_DIR/web/dist/libs/datamanager/version.json $LS_DIR/web/dist/libs/datamanager/version.json

USER 1001
EXPOSE 8080
ENTRYPOINT ["./deploy/docker-entrypoint.sh"]
CMD ["label-studio"]

# # syntax=docker/dockerfile:1
# ARG NODE_VERSION=22
# ARG PYTHON_VERSION=3.13
# ARG POETRY_VERSION=2.1.4
# ARG VERSION_OVERRIDE
# ARG BRANCH_OVERRIDE

# ################################ Overview

# # This Dockerfile builds a Label Studio environment.
# # It consists of five main stages:
# # 1. "frontend-builder" - Compiles the frontend assets using Node.
# # 2. "frontend-version-generator" - Generates version files for frontend sources.
# # 3. "venv-builder" - Prepares the virtualenv environment.
# # 4. "py-version-generator" - Generates version files for python sources.
# # 5. "prod" - Creates the final production image with the Label Studio, Nginx, and other dependencies.

# ################################ Stage: frontend-builder (build frontend assets)
# FROM --platform=${BUILDPLATFORM} node:${NODE_VERSION}-trixie AS frontend-builder
# ENV BUILD_NO_SERVER=true \
#     BUILD_NO_HASH=true \
#     BUILD_NO_CHUNKS=true \
#     BUILD_MODULE=true \
#     YARN_CACHE_FOLDER=/root/web/.yarn \
#     NX_CACHE_DIRECTORY=/root/web/.nx \
#     NODE_ENV=production

# WORKDIR /label-studio/web

# # Fix Docker Arm64 Build
# RUN yarn config set registry https://registry.npmjs.org/
# RUN yarn config set network-timeout 1200000 # HTTP timeout used when downloading packages, set to 20 minutes

# COPY web/package.json .
# COPY web/yarn.lock .
# COPY web/tools tools
# RUN --mount=type=cache,target=/root/web/.yarn,id=yarn-cache,sharing=locked \
#     --mount=type=cache,target=/root/web/.nx,id=nx-cache,sharing=locked \
#     yarn install --prefer-offline --no-progress --pure-lockfile --frozen-lockfile --ignore-engines --non-interactive --production=false

# COPY web/ .
# COPY pyproject.toml ../pyproject.toml
# RUN --mount=type=cache,target=/root/web/.yarn,id=yarn-cache,sharing=locked \
#     --mount=type=cache,target=/root/web/.nx,id=nx-cache,sharing=locked \
#     yarn run build

# ################################ Stage: frontend-version-generator
# FROM frontend-builder AS frontend-version-generator
# RUN --mount=type=cache,target=/root/web/.yarn,id=yarn-cache,sharing=locked \
#     --mount=type=cache,target=/root/web/.nx,id=nx-cache,sharing=locked \
#     --mount=type=bind,source=.git,target=../.git \
#     yarn version:libs

# ################################ Stage: venv-builder (prepare the virtualenv)
# FROM python:${PYTHON_VERSION}-slim-trixie AS venv-builder
# ARG POETRY_VERSION

# ENV PYTHONUNBUFFERED=1 \
#     PYTHONDONTWRITEBYTECODE=1 \
#     PIP_NO_CACHE_DIR=off \
#     PIP_DISABLE_PIP_VERSION_CHECK=on \
#     PIP_DEFAULT_TIMEOUT=100 \
#     PIP_CACHE_DIR="/.cache" \
#     POETRY_CACHE_DIR="/.poetry-cache" \
#     POETRY_HOME="/opt/poetry" \
#     POETRY_VIRTUALENVS_IN_PROJECT=true \
#     POETRY_VIRTUALENVS_PREFER_ACTIVE_PYTHON=true \
#     PATH="/opt/poetry/bin:$PATH"

# ADD https://install.python-poetry.org /tmp/install-poetry.py
# RUN python /tmp/install-poetry.py

# RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
#     --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
#     set -eux; \
#     apt-get update; \
#     apt-get install --no-install-recommends -y \
#             build-essential git; \
#     apt-get autoremove -y

# WORKDIR /label-studio

# ENV VENV_PATH="/label-studio/.venv"
# ENV PATH="$VENV_PATH/bin:$PATH"

# ## Starting from this line all packages will be installed in $VENV_PATH

# # Copy dependency files
# COPY pyproject.toml poetry.lock README.md ./

# # Set a default build argument for including dev dependencies
# ARG INCLUDE_DEV=false

# # Install dependencies
# RUN --mount=type=cache,target=/.poetry-cache,id=poetry-cache,sharing=locked \
#     poetry check --lock && \
#     if [ "$INCLUDE_DEV" = "true" ]; then \
#         poetry install --no-root --extras uwsgi --with test; \
#     else \
#         poetry install --no-root --without test --extras uwsgi; \
#     fi

# # Install LS
# COPY label_studio label_studio
# RUN --mount=type=cache,target=/.poetry-cache,id=poetry-cache,sharing=locked \
#     # `--extras uwsgi` is mandatory here due to poetry bug: https://github.com/python-poetry/poetry/issues/7302
#     poetry install --only-root --extras uwsgi && \
#     python3 label_studio/manage.py collectstatic --no-input

# ################################ Stage: py-version-generator
# FROM venv-builder AS py-version-generator
# ARG VERSION_OVERRIDE
# ARG BRANCH_OVERRIDE

# # Create version_.py and ls-version_.py
# RUN --mount=type=bind,source=.git,target=./.git \
#     VERSION_OVERRIDE=${VERSION_OVERRIDE} BRANCH_OVERRIDE=${BRANCH_OVERRIDE} poetry run python label_studio/core/version.py

# ################################### Stage: prod
# FROM python:${PYTHON_VERSION}-slim-trixie AS production

# ENV LS_DIR=/label-studio \
#     HOME=/label-studio \
#     LABEL_STUDIO_BASE_DATA_DIR=/label-studio/data \
#     OPT_DIR=/opt/heartex/instance-data/etc \
#     PATH="/label-studio/.venv/bin:$PATH" \
#     DJANGO_SETTINGS_MODULE=core.settings.label_studio \
#     PYTHONUNBUFFERED=1 \
#     PYTHONDONTWRITEBYTECODE=1

# WORKDIR $LS_DIR

# # install prerequisites for app
# RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
#     --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
#     set -eux; \
#     apt-get update; \
#     apt-get upgrade -y; \
#     apt-get install --no-install-recommends -y libexpat1 libgl1 libglx-mesa0 libglib2.0-0t64 \
#         gnupg2 curl nginx; \
#     apt-get autoremove -y

# RUN set -eux; \
#     mkdir -p $LS_DIR $LABEL_STUDIO_BASE_DATA_DIR $OPT_DIR && \
#     chown -R 1001:0 $LS_DIR $LABEL_STUDIO_BASE_DATA_DIR $OPT_DIR /var/log/nginx /etc/nginx

# COPY --chown=1001:0 deploy/default.conf /etc/nginx/nginx.conf

# # Copy essential files for installing Label Studio and its dependencies
# COPY --chown=1001:0 pyproject.toml .
# COPY --chown=1001:0 poetry.lock .
# COPY --chown=1001:0 README.md .
# COPY --chown=1001:0 LICENSE LICENSE
# COPY --chown=1001:0 licenses licenses
# COPY --chown=1001:0 deploy deploy

# # Copy files from build stages
# COPY --chown=1001:0 --from=venv-builder               $LS_DIR                                           $LS_DIR
# COPY --chown=1001:0 --from=py-version-generator       $LS_DIR/label_studio/core/version_.py             $LS_DIR/label_studio/core/version_.py
# COPY --chown=1001:0 --from=frontend-builder           $LS_DIR/web/dist                                  $LS_DIR/web/dist
# COPY --chown=1001:0 --from=frontend-version-generator $LS_DIR/web/dist/apps/labelstudio/version.json    $LS_DIR/web/dist/apps/labelstudio/version.json
# COPY --chown=1001:0 --from=frontend-version-generator $LS_DIR/web/dist/libs/editor/version.json         $LS_DIR/web/dist/libs/editor/version.json
# COPY --chown=1001:0 --from=frontend-version-generator $LS_DIR/web/dist/libs/datamanager/version.json    $LS_DIR/web/dist/libs/datamanager/version.json

# USER 1001

# EXPOSE 8080

# ENTRYPOINT ["./deploy/docker-entrypoint.sh"]
# CMD ["label-studio"]
