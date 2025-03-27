#!/bin/bash

# Navigate into your project (if not already)
cd "$(dirname "$0")"

# Initialize Git if not already done
git init

# Set GitHub remote (make sure to use a token with correct scopes)
git remote add origin https://mantizzza:"$Repo token"@github.com/mantizzza/code-quest.git

# Set user config (optional if you’ve already set it globally)
git config user.name "mantizzza"
git config user.email "meier311.com"

echo "Git setup complete!"