#!/bin/bash

# Define total steps
TOTAL_STEPS=5

echo "🏗️  Starting Vite build process..."

# Stop on errors
set -e

# Step 1: Pre-flight check
echo "[1/$TOTAL_STEPS] 🧹 Preparing environment..."
rm -rf dist

# Step 2: Extract Schema
echo "[2/$TOTAL_STEPS] ⚙️  Extracting schema..."
npx sanity@latest schema extract

# Step 3: Generate Types
echo "[3/$TOTAL_STEPS] ⚙️  Generating types..."
npx sanity@latest typegen generate

# Step 4: Run Vite build
echo "[4/$TOTAL_STEPS] ⚙️  Running Vite build..."
pnpm run build

# Step 5: Finalize
echo "[5/$TOTAL_STEPS] 🏁 Build complete!"
echo "      -> Output directory: dist/"
echo "      -> Ready for deployment."