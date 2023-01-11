#!/usr/bin/env sh

# abort on errors
set -e

# change dir
cd ../

# build project
npm run build

# deploy
npm run deploy