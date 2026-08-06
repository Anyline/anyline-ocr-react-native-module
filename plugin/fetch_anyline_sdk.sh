#!/bin/sh
#
# Fetches and vendors the Anyline iOS SDK xcframework.
#
# Invoked from AnylineReact.podspec's prepare_command during `pod install`.
# The SDK ships as a prebuilt xcframework on the Anyline CDN rather than being
# resolved as a CocoaPods dependency (Trunk goes read-only 2026-12-02), so it is
# downloaded and placed next to this script where s.vendored_frameworks expects
# it.
#
# The version and checksum are passed in by the podspec, which is the single
# source of truth for both.
#
# Usage: sh fetch_anyline_sdk.sh <version> <sha256>
#

set -e

version="$1"
checksum="$2"

if [ -z "$version" ] || [ -z "$checksum" ]; then
  echo "usage: sh $0 <version> <sha256>" >&2
  exit 1
fi

framework="Anyline.xcframework"
stamp="$framework/.anyline-vendored-version"
expected="$version $checksum"

# The _spm_ archive holds the xcframework at its root, so no strip step is needed.
url="https://mobile-sdk-ios.anyline.io/spm/Anyline.xcframework-spm-$version.zip"

# Key the cache on version+checksum rather than mere directory existence, so
# bumping the SDK never silently builds against a previously fetched copy.
if [ -f "$stamp" ] && [ "$(cat "$stamp")" = "$expected" ]; then
  exit 0
fi

echo "[AnylineReact] Fetching $framework $version..."

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

# --proto/--proto-redir pin HTTPS for both the initial request and any redirect,
# so -L can never be downgraded to plaintext by a redirect.
curl --proto '=https' --proto-redir '=https' -fL --retry 3 -o "$tmp/sdk.zip" "$url"

actual="$(shasum -a 256 "$tmp/sdk.zip" | awk '{print $1}')"
if [ "$actual" != "$checksum" ]; then
  echo "error: checksum mismatch for $framework $version" >&2
  echo "  expected $checksum" >&2
  echo "  actual   $actual" >&2
  exit 1
fi

unzip -q "$tmp/sdk.zip" -d "$tmp/extracted"
if [ ! -d "$tmp/extracted/$framework" ]; then
  echo "error: $framework not found at the root of the downloaded archive" >&2
  exit 1
fi

# Swap in only after the archive is verified and fully extracted, so an
# interrupted run cannot leave a partial framework that looks complete.
rm -rf "$framework"
mv "$tmp/extracted/$framework" "$framework"
echo "$expected" > "$stamp"
