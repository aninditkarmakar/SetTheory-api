#!/bin/bash
# This script sets DATABASE_URL in the .env file using the NEON_POSTGRES_DEV_DB_CONNECTION_STRING environment variable.

if [ -z "$NEON_POSTGRES_DEV_DB_CONNECTION_STRING" ]; then
  echo "Error: NEON_POSTGRES_DEV_DB_CONNECTION_STRING is not set."
  exit 1
fi

echo "DATABASE_URL=\"$NEON_POSTGRES_DEV_DB_CONNECTION_STRING\"" > .env
echo ".env file updated with DATABASE_URL from NEON_POSTGRES_DEV_DB_CONNECTION_STRING."
