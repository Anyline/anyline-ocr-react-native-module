#!/bin/bash
################################################################################
# Generate license.js from ANYLINE_MOBILE_SDK_LICENSE_KEY environment variable
################################################################################

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$SCRIPT_DIR/.."

if [[ -z "$ANYLINE_MOBILE_SDK_LICENSE_KEY" ]]; then
    echo "Error: ANYLINE_MOBILE_SDK_LICENSE_KEY environment variable is not set" >&2
    echo "" >&2
    echo "Please set it in your shell profile (~/.zshrc or ~/.bashrc):" >&2
    echo "  export ANYLINE_MOBILE_SDK_LICENSE_KEY='your-license-key-here'" >&2
    echo "" >&2
    echo "Then reload your shell or run: source ~/.zshrc" >&2
    exit 1
fi

# Run the Node.js script that generates src/license.js
cd "$APP_DIR"
node add_license_key.js
