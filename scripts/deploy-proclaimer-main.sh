#!/bin/bash
set -e

APP="proclaimer"

echo "Building app '$APP'..."
vp run build:app -- "$APP"

echo ""
echo "Deploying app '$APP' to project 'orderly' (branch: main)..."
wrangler pages deploy dist --project-name=orderly --branch=main
echo "✓ DEPLOYED $APP TO orderly/main"

echo ""
echo "Deploying app '$APP' to project 'proclaimer' (branch: main)..."
wrangler pages deploy dist --project-name=proclaimer --branch=main
echo "✓ DEPLOYED $APP TO proclaimer/main"

echo ""
echo "✓✓ DONE — $APP deployed to both orderly/main and proclaimer/main"
echo "✓ Finished at $(date '+%Y-%m-%d %H:%M:%S')"
