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

RUN --mount=type=cache,target=/root/web/.yarn,id=yarn-cache,sharing=shared \
    --mount=type=cache,target=/root/web/.nx,id=nx-cache,sharing=shared \
    yarn install \
      --network-timeout 1800000 \
      --verbose \
      --ignore-engines \
      --non-interactive \
      --production=false
      
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
    PIP_INDEX_URL=https://mirrors.aliyun.com/pypi/simple/ \
    PIP_TRUSTED_HOST=mirrors.aliyun.com \
    POETRY_CACHE_DIR="/.poetry-cache" \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_VIRTUALENVS_PREFER_ACTIVE_PYTHON=true \
    PATH="/opt/poetry/bin:$PATH"

RUN pip install "poetry==${POETRY_VERSION}"

# 换阿里云 APT 源（兼容 Debian 13 新格式）
RUN sed -i 's|deb.debian.org|mirrors.aliyun.com|g' /etc/apt/sources.list 2>/dev/null || true; \
    sed -i 's|deb.debian.org|mirrors.aliyun.com|g' /etc/apt/sources.list.d/debian.sources 2>/dev/null || true

# 合并安装所有构建依赖（原分两次，现一次搞定）
RUN --mount=type=cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,target=/var/lib/apt/lists,sharing=locked \
    set -eux; \
    apt-get update; \
    apt-get install --no-install-recommends -y \
            build-essential \
            git \
            ca-certificates; \
    apt-get autoremove -y

WORKDIR /label-studio

ENV VENV_PATH="/label-studio/.venv"
ENV PATH="$VENV_PATH/bin:$PATH"

COPY pyproject.toml poetry.lock README.md ./

ARG INCLUDE_DEV=false

# 不再 poetry source add（避免修改 pyproject.toml）
# 不再 poetry lock（构建时不应重新生成锁文件）
RUN --mount=type=cache,target=/.poetry-cache,id=poetry-cache,sharing=locked \
    git config --global url."https://github.com/".insteadOf git@github.com: && \
    git config --global url."https://".insteadOf git:// && \
    poetry config installer.max-workers 2 && \
    if [ "$INCLUDE_DEV" = "true" ]; then \
        poetry install --no-root --extras uwsgi --with test --no-interaction; \
    else \
        poetry install --no-root --without test --extras uwsgi --no-interaction; \
    fi

COPY label_studio label_studio

# --extras uwsgi is mandatory here due to Poetry issue #7302
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

# === 系统包安装 ===
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
COPY --chown=1001:0 deploy /label-studio/deploy

RUN mkdir -p /label-studio/deploy/docker-entrypoint.d/common && \
    cp -a deploy/docker-entrypoint.d/common/. /label-studio/deploy/docker-entrypoint.d/common/ 2>/dev/null || true

RUN find /label-studio/deploy -name "*.sh" -exec chmod +x {} \;
# ======================================================

# 从其他 stage 复制代码和静态资源
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
