#!/usr/bin/env sh

# abort on errors
set -e

# change dir
cd ../

# stage
git add .

# commit
git commit -m "Auto commit, quick fix"

# push
git push