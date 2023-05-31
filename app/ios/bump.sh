#/bin/bash
if [ -z "$(git status --porcelain)" ]; then
  cd ios/App
  agvtool bump
  git add .
  git commit -m "auto: bump build number"
else
  echo "Git directory dirty. Please commit or stash your changes before bumping."
  exit 1
fi