#!/usr/bin/env bash
set -euo pipefail

echo "=== Development Environment Setup ==="

# Add mise to PATH (needed for non-interactive shells like postCreateCommand)
export PATH="$HOME/.local/bin:$PATH"

# Install mise if not present
if ! command -v mise &>/dev/null; then
  echo "Installing mise..."
  curl --proto '=https' --tlsv1.2 -fsSL https://mise.run | sh
fi

echo "Trusting mise configuration..."
mise trust

# Set GITHUB_TOKEN for mise to avoid GitHub API rate limits (aqua backend).
if [[ -z "${GITHUB_TOKEN:-}" ]]; then
  if token="$(gh auth token 2>/dev/null)"; then
    echo "Setting GITHUB_TOKEN from gh auth..."
    export GITHUB_TOKEN="$token"
  else
    echo "WARNING: GITHUB_TOKEN not set and gh auth unavailable."
    echo "mise install may fail due to GitHub API rate limits."
    echo "Run 'gh auth login' on the host and rebuild the container."
  fi
fi

echo "Installing tools via mise..."
mise install

# Workaround: mise install writes incorrect bin_paths cache for some tools (gh, uv).
# Clearing the cache forces mise to recompute correct bin paths on next activation.
find ~/.cache/mise -name 'bin_paths-*.msgpack.z' -delete 2>/dev/null || true

# Load mise-managed tool paths into current shell
eval "$(mise env)"

echo "Installing Node.js dependencies..."
pnpm install

# SETUP:EXTRA

echo "=== Setup complete ==="
