#!/bin/bash
# Renders the Slash Voice artwork in branding/ into the files the app ships:
# the app icons (src-tauri/icons/) and the twelve tray images (src-tauri/resources/).
# Run from the repository root after changing anything in branding/.
set -euo pipefail
bun run --silent tauri icon branding/app-icon.svg >/dev/null 2>&1
# `tauri icon` also writes Android and iOS sets; this app ships neither.
rm -rf src-tauri/icons/android/mipmap-anydpi-v26 src-tauri/icons/android/values
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
for svg in branding/tray/*.svg; do
  name="$(basename "$svg" .svg)"
  bun run --silent tauri icon "$svg" -o "$tmp/$name" -p 64 >/dev/null 2>&1
  cp "$tmp/$name/64x64.png" "src-tauri/resources/$name.png"
done
echo "Rendered the app icon and $(ls branding/tray/*.svg | wc -l | tr -d ' ') tray images."
