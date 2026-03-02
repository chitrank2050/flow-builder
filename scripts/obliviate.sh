#!/bin/bash

TOTAL_STEPS=4

echo "🪄 Initiating clean reset..."

set -e

# Step 1: Build artifacts
echo "[1/$TOTAL_STEPS] 🗑️ Removing build artifacts (dist)..."
rm -rf dist

# Step 2: Dependencies
echo "[2/$TOTAL_STEPS] 💥 Removing dependencies (node_modules)..."
rm -rf node_modules

# Step 3: Lockfiles
echo "[3/$TOTAL_STEPS] 🔓 Removing lockfiles..."
rm -f pnpm-lock.yaml
rm -f package-lock.json
rm -f yarn.lock
rm -f bun.lockb

# Step 4: Tooling caches
echo "[4/$TOTAL_STEPS] 🧹 Clearing internal caches..."
rm -rf .vite
rm -rf .eslintcache
rm -rf .cache
rm -rf coverage
rm -rf tsconfig.tsbuildinfo

echo "✨ Reset complete. Fresh install required."