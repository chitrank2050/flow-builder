#!/bin/bash

TOTAL_STEPS=4

echo "🚀 Starting Vite installation process..."

set -e

# Step 1: Check for pnpm
echo "[1/$TOTAL_STEPS] 🔍 Checking package manager..."
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Install it first."
    exit 1
fi

# Step 2: Install dependencies
echo "[2/$TOTAL_STEPS] 📦 Installing dependencies..."
if [ -f pnpm-lock.yaml ]; then
    echo "      -> Lockfile detected. Running frozen install..."
    pnpm install --frozen-lockfile
else
    echo "      -> No lockfile found. Running standard install..."
    pnpm install
fi

# Step 3: Verify Vite exists
echo "[3/$TOTAL_STEPS] 🔎 Verifying Vite setup..."
if ! pnpm list vite > /dev/null 2>&1; then
    echo "❌ Vite is not installed properly."
    exit 1
fi

# Step 6: Final Verification
echo "[4/$TOTAL_STEPS] ✅ Running type check..."
pnpm exec tsc --noEmit

echo "🎉 Setup complete. Project is ready."