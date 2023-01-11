#!/usr/bin/env sh

# abort on errors
set -e

# Change dir
cd ./scripts/

# Exec
./autoCommit.sh
./deploy.sh