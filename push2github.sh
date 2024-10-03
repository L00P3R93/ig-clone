#!/bin/bash

# Prompt the user for a commit message
read -p "Enter commit message: " commit_message

# Add all changes to the staging area
git add .

# Commit the changes with the user-provided message
git commit -m "$commit_message"

# Push the changes to the remote repository (assuming the remote is named 'origin' and the branch is 'main')
git push -u origin