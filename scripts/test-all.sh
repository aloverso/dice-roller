#!/usr/bin/env bash

cd $(git rev-parse --show-toplevel)

set -e

npm run lint
npm run test:ci

echo "  _            _                             _"
echo " | |          | |                           | |"
echo " | |_ ___  ___| |_ ___   _ __   __ _ ___ ___| |"
echo " | __/ _ \/ __| __/ __| | '_ \ / _\` / __/ __| |"
echo " | ||  __/\__ \ |_\__ \ | |_) | (_| \__ \__ \_|"
echo "  \__\___||___/\__|___/ | .__/ \__,_|___/___(_)"
echo "                        | |"
echo "                        |_|"
