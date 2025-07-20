#!/bin/bash

# File: run-app.sh
echo "Node and Npm should be pre-installed before running this script"
# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "Installing Angular dependencies..."
    npm install || { echo "npm install failed"; exit 1; }
fi

# Run Angular dev server
echo "Starting Angular application on http://localhost:4200"
npm start
