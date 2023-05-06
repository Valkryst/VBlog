#!/bin/bash

# Ensure we're using the latest version of asdf
asdf update

# Install Plugins
cat .tool-versions | awk '{print "asdf plugin add "$1}' | sh

# Install Tools
asdf install

# Misc. Setup
asdf direnv setup --shell bash --version latest