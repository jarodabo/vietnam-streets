#!/bin/bash

echo "🚀 Deploying Vietnam Streets to Railway..."
echo ""

# Make sure we're in the right directory
cd "/Users/jackross-cpgio/Vietnam Streets"

# Check if logged in
echo "Checking Railway login..."
railway whoami

echo ""
echo "📦 Initializing Railway project..."
railway init

echo ""
echo "🚢 Deploying to Railway..."
railway up

echo ""
echo "🌐 Generating public domain..."
railway domain

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Your site should now be live. Check the URL above ☝️"
