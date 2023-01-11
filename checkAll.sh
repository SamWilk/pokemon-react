#!/usr/bin/env sh

# abort on errors
set -e

# Change dir
cd ./scripts/

# Check for Mac operating system
if [[ "$OSTYPE" == "darwin"* ]]; then
        sh ./autoCommit.sh
        sh ./deploy.sh
else
        # Exec
        ./autoCommit.sh
        ./deploy.sh
fi