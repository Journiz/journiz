#/bin/bash
if [ -z "$(git status --porcelain)" ]; then

else
  echo "Git directory dirty. Please commit or stash your changes before bumping."
  exit(1)
fi