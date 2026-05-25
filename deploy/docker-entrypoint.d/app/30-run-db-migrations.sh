#!/usr/bin/env bash
set -e
exec "$(dirname "$0")/../common/30-run-db-migrations.sh"
