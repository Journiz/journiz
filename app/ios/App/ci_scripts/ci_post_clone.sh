#!/usr/bin/env bash

set -x

export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
brew install cocoapods node@18

Showing All Messages
PATH="/usr/local/opt/node@18/bin:$PATH"
export PATH


# have to add node yourself link to this issue https://stackoverflow.com/questions/73462672/xcode-cloud-suddenly-failing-to-link-node-and-install-dependencies
#NODE_VER=18
#VERSION=$(curl -s https://nodejs.org/dist/latest-v$NODE_VER.x/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')
#if [[ "$(arch)" == "arm64" ]]
#then
#  ARCH="arm64"
#else
#  ARCH="x64"
#fi
#
#curl "https://nodejs.org/dist/latest-v$NODE_VER.x/node-$VERSION-darwin-$ARCH.tar.gz" -o $HOME/Downloads/node.tar.gz
#tar -xf "$HOME/Downloads/node.tar.gz"
#NODE_PATH="$PWD/node-$VERSION-darwin-$ARCH/bin"
#PATH+=":$NODE_PATH"
#export PATH
#node -v
#npm -v

brew install pnpm # optional, you can also install yarn if you use it

pnpm install --frozen-lockfile
# build and sync
npm run device-ci