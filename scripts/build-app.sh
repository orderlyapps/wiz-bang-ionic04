#!/bin/bash
set -e

# Skip '--' if passed as first argument
if [ "$1" = "--" ]; then
  shift
fi

APP=$1
if [ -z "$APP" ]; then
  echo "Usage: vp run build:app -- <app-name>"
  exit 1
fi

if [ ! -d "src/apps/$APP" ]; then
  echo "Error: App '$APP' not found at src/apps/$APP"
  exit 1
fi

echo "Building app '$APP'..."
vp build --mode "$APP"

if [ -f "dist/index.html" ]; then
  echo "✓ Built app '$APP' for deployment"
else
  echo "✗ Build output not found at dist/index.html"
  exit 1
fi

echo "✓ Finished at $(date '+%Y-%m-%d %H:%M:%S')"
