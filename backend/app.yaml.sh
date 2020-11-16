#!/bin/bash
echo """
runtime: nodejs10
env_variables:
  DB_USER: postgres
  DB_PASS: \"$DB_PASS\"
  DB_NAME: \"$DB_NAME\"
  DB_ENV: \"$DB_ENV\"
  CLOUD_SQL_CONNECTION_NAME: \"$CLOUD_SQL_CONNECTION_NAME\"
  NODE_OPTIONS: --max_old_space_size=4096
"""
