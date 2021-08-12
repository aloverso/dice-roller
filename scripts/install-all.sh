#!/usr/bin/env bash

set -e

npm --prefix=frontend install --production=false
npm --prefix=backend install --production=false