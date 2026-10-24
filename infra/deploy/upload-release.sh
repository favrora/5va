#!/usr/bin/env bash
# Only executed by a trusted main-branch build. The server key is forced-command restricted.
set -euo pipefail

if [[ $# -ne 2 || ! $1 =~ ^[0-9a-f]{40}$ ]]; then
  echo 'Usage: upload-release.sh <full-commit-sha> <built-dist-directory>' >&2
  exit 2
fi
commit_sha=$1
built_dist=$2
: "${FIVEVA_DEPLOY_KEY:?Set the dedicated fiveva forced-command SSH private key}"
: "${FIVEVA_KNOWN_HOSTS:?Set the independently verified SSH known_hosts entry}"
[[ -f "$built_dist/index.html" && -f "$built_dist/robots.txt" && -f "$built_dist/sitemap.xml" ]]
umask 077
deploy_tmp=$(mktemp -d)
trap 'rm -rf -- "$deploy_tmp"' EXIT
printf '%s\n' "$FIVEVA_DEPLOY_KEY" > "$deploy_tmp/key"
printf '%s\n' "$FIVEVA_KNOWN_HOSTS" > "$deploy_tmp/known_hosts"
tar -C "$built_dist" -czf "$deploy_tmp/release.tar.gz" .
ssh -T -i "$deploy_tmp/key" \
  -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=yes \
  -o "UserKnownHostsFile=$deploy_tmp/known_hosts" \
  -o ConnectTimeout=30 -o ServerAliveInterval=30 -o ServerAliveCountMax=3 \
  fiveva@18.211.218.92 "deploy $commit_sha" < "$deploy_tmp/release.tar.gz"
curl --fail --silent --show-error --max-time 20 --retry 8 --retry-delay 2 \
  "https://5varepair.com/release.json?verify=$commit_sha" > "$deploy_tmp/release.json"
python3 - "$commit_sha" "$deploy_tmp/release.json" <<'PY'
import json, sys
with open(sys.argv[2], encoding='utf-8') as response:
    result = json.load(response)
if result.get('commit') != sys.argv[1] or result.get('origin') != 'https://5varepair.com':
    raise SystemExit('Published release does not match the pushed commit')
print('Verified live production commit: ' + sys.argv[1])
PY
