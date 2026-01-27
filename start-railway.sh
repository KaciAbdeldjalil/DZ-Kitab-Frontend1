#!/bin/bash
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "Installing dependencies..."
npm install
echo "Building..."
npm run build
echo "Starting server..."
npm run preview -- --host 0.0.0.0 --port 4173