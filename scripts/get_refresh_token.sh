#!/bin/bash
# get_refresh_token.sh — 注册/登录 LS 并获取 refresh token
# 用法: bash get_refresh_token.sh <邮箱> <密码> [LS地址]
# 示例: bash get_refresh_token.sh admin@qq.com MyPass123! http://192.168.10.200:8095

EMAIL="${1:?用法: $0 <邮箱> <密码> [LS地址]}"
PASS="${2:?用法: $0 <邮箱> <密码> [LS地址]}"
BASE="${3:-http://127.0.0.1:8095}"

# ── Step 1: 注册用户（GET signup 页拿 CSRF → POST 注册） ──
CSRF=$(curl -s -c /tmp/ls_signup.txt "$BASE/user/signup/" \
  | grep -oP 'csrfmiddlewaretoken" value="\K[^"]+')
[ -z "$CSRF" ] && { echo "ERROR: 获取 signup CSRF 失败，LS 是否已启动？"; exit 1; }

SIGNUP=$(curl -s -b /tmp/ls_signup.txt -c /tmp/ls_signup2.txt \
  "$BASE/user/signup/" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "csrfmiddlewaretoken=$CSRF&email=$EMAIL&password=$PASS" \
  -o /dev/null -w "%{http_code}" -L)
echo "注册: HTTP $SIGNUP (200=成功/已存在)"

# ── Step 2: 登录（GET login 页拿 CSRF → POST 登录） ──
CSRF2=$(curl -s -c /tmp/ls_login.txt "$BASE/user/login/" \
  | grep -oP 'csrfmiddlewaretoken" value="\K[^"]+')
[ -z "$CSRF2" ] && { echo "ERROR: 获取 login CSRF 失败"; exit 1; }

LOGIN=$(curl -s -b /tmp/ls_login.txt -c /tmp/ls_login2.txt \
  "$BASE/user/login/" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "csrfmiddlewaretoken=$CSRF2&email=$EMAIL&password=$PASS" \
  -o /dev/null -w "%{http_code}" -L)
echo "登录: HTTP $LOGIN"

# ── Step 3: 检查已有 token（同用户只能持有一个） ──
EXISTING=$(curl -s -b /tmp/ls_login2.txt "$BASE/api/token/")
if echo "$EXISTING" | grep -q '"token"'; then
  OLD=$(echo "$EXISTING" | grep -oP '"token":"\K[^"]+')
  echo "发现旧 token，正在作废..."
  curl -s -b /tmp/ls_login2.txt -X POST "$BASE/api/token/blacklist/" \
    -H "Content-Type: application/json" \
    -d "{\"refresh\":\"$OLD\"}" > /dev/null
  echo "已作废旧 token"
fi

# ── Step 4: 创建新 refresh token ──
RESULT=$(curl -s -b /tmp/ls_login2.txt -X POST "$BASE/api/token/" \
  -H "Content-Type: application/json" -d '{}')

RF=$(echo "$RESULT" | grep -oP '"token":"\K[^"]+')
if [ -z "$RF" ]; then
  echo "ERROR: 创建 token 失败: $RESULT"
  exit 1
fi

# ── 输出 ──
echo ""
echo "=========================================="
echo "Refresh Token:"
echo "$RF"
echo "=========================================="
