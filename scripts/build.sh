#!/bin/bash

# Define total steps
TOTAL_STEPS=2

echo "🏗️  Starting Vite build process..."

# Stop on errors
set -e

# Step 1: Run Vite build
echo "[1/$TOTAL_STEPS] ⚙️  Running Vite build..."
pnpm run build

# Step 2: Finalize
echo "[2/$TOTAL_STEPS] 🏁 Build complete!"
echo "      -> Output directory: dist/"
echo "      -> Ready for deployment."