#!/bin/bash
# This script sets DATABASE_URL in the .env file using the NEON_POSTGRES_DEV_DB_CONNECTION_STRING environment variable.

if [ -z "$SET_THEORY_ENCRYPTION_KEY" ]; then
  echo "Error: SET_THEORY_ENCRYPTION_KEY is not set."
  exit 1
fi

openssl aes-256-cbc -d -pbkdf2 -in .env.local.enc -out .env -pass pass:$SET_THEORY_ENCRYPTION_KEY
