#!/bin/bash
# 获取 Label Studio 用户的 refresh token（纯 API，不走 DB）
# 用法: ./get_ls_token.sh [email] [password]
# 默认: apitest@example.com / ApiTest2024!

BASE="${LS_BASE:-http://127.0.0.1:8095}"
EMAIL="${1:-apitest@example.com}"
PASSWORD="${2:-ApiTest2024!}"

COOKIE_FILE=$(mktemp)
trap "rm -f $COOKIE_FILE" EXIT

# ---- 1. 登录 ----
CSRF=$(curl -s -c "$COOKIE_FILE" "$BASE/user/login/" \
  | python3 -c "import sys,re; print(re.search(r'csrfmiddlewaretoken\" value=\"([^\"]+)', sys.stdin.read()).group(1))")

HTTP_CODE=$(curl -s -b "$COOKIE_FILE" -c "$COOKIE_FILE" \
  -X POST "$BASE/user/login/" \
  -d "email=$EMAIL&password=$PASSWORD&csrfmiddlewaretoken=$CSRF&persist_session=on" \
  -o /dev/null -w "%{http_code}")

if [ "$HTTP_CODE" != "302" ]; then
  echo "登录失败 HTTP=$HTTP_CODE"
  exit 1
fi
echo "[1/4] 登录成功 ($EMAIL)"

# ---- 2. 查已有 token ----
TOKEN_LIST=$(curl -s -b "$COOKIE_FILE" "$BASE/api/token/")
EXISTING_TOKEN=$(echo "$TOKEN_LIST" | python3 -c "
import sys,json
try:
    tokens = json.load(sys.stdin)
    if isinstance(tokens, list) and len(tokens) > 0:
        print(tokens[0].get('token',''))
except: pass
")

if [ -n "$EXISTING_TOKEN" ]; then
  echo "[2/4] 发现旧 token，作废中..."
  curl -s -b "$COOKIE_FILE" \
    -X POST "$BASE/api/token/blacklist/" \
    -H "Content-Type: application/json" \
    -d "{\"refresh\":\"$EXISTING_TOKEN\"}" > /dev/null
  echo "[3/4] 旧 token 已作废"
else
  echo "[2/4] 无旧 token，跳过"
  echo "[3/4] -"
fi

# ---- 4. 创建新 token ----
echo "[4/4] 创建新 token..."
RESP=$(curl -s -b "$COOKIE_FILE" -X POST "$BASE/api/token/")
echo ""
REFRESH_TOKEN=$(echo "$RESP" | python3 -c "import sys,json; print(json.load(sys.stdin).get('token',''))")

if [ -z "$REFRESH_TOKEN" ]; then
  echo "失败: $RESP"
  exit 1
fi

echo "========== REFRESH TOKEN =========="
echo "$REFRESH_TOKEN"
echo "==================================="
echo ""
echo "# 验证:"
echo "curl -s -X POST $BASE/api/token/refresh/ -H 'Content-Type: application/json' -d '{\"refresh\":\"$REFRESH_TOKEN\"}'"
