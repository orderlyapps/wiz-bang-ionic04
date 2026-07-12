#!/bin/bash
set -e

# Skip '--' if passed as first argument
if [ "$1" = "--" ]; then
  shift
fi

APP=$1
if [ -z "$APP" ]; then
  echo "Usage: vp run dev:app -- <app-name>"
  exit 1
fi

# Check if app exists
if [ ! -f "src/apps/$APP/index.html" ]; then
  echo "Error: App '$APP' not found at src/apps/$APP/index.html"
  exit 1
fi

PORT=$(grep "^VITE_APP_PORT=" ".env.$APP" 2>/dev/null | cut -d= -f2)
PORT=${PORT:-5173}

echo "Starting dev server for app: $APP"
echo "Opening: http://localhost:$PORT/"
vp dev --mode "$APP" --host --open "/"
