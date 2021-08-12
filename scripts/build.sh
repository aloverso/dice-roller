#!/usr/bin/env bash

set -e

npm --prefix=frontend run build
npm --prefix=backend run build

mv frontend/build backend/dist