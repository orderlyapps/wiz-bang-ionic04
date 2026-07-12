#!/bin/bash
set -e

# Skip '--' if passed as first argument
if [ "$1" = "--" ]; then
  shift
fi

APP=$1
if [ -z "$APP" ]; then
  echo "Usage: vp run deploy:app -- <app-name> [project-name] [branch]"
  exit 1
fi

PROJECT=${2:-orderly}
BRANCH=${3:-$APP}

echo "Building app '$APP'..."
vp run build:app -- "$APP"

echo ""
echo "Deploying app '$APP' to project '$PROJECT' (branch: $BRANCH)..."
wrangler pages deploy dist --project-name="$PROJECT" --branch="$BRANCH"
echo ""
echo "✓ DEPLOYED $APP TO $PROJECT/$BRANCH"
echo "✓ Finished at $(date '+%Y-%m-%d %H:%M:%S')"
