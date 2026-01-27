#!/bin/bash

################################################################################
# Anyline React Native Plugin - Environment Check Script
################################################################################
# This script validates your development environment for building and running
# the Anyline React Native example application on Android and iOS.
#
# Usage:
#   ./scripts/check-environment.sh           # Interactive mode with colors
#   ./scripts/check-environment.sh --ci      # CI mode (plain text, strict)
#   ./scripts/check-environment.sh --help    # Show help
#
# This script checks for:
#   - Node.js version (from .nvmrc file)
#   - npm and yarn package managers
#   - Java (for Android builds)
#   - Gradle (for Android builds)
#   - Android SDK and environment variables
#   - Android Build Tools (for React Native Android builds)
#   - Android NDK (optional but recommended)
#   - Xcode and iOS development tools (macOS only)
#   - CocoaPods (macOS only, REQUIRED for iOS builds)
#   - xcrun devicectl (recommended for iOS device deployment)
#   - Watchman (optional file watching service)
#   - React Native dependencies (yarn install status)
#   - License key (src/license.js or ANYLINE_MOBILE_SDK_LICENSE_KEY)
#
# Exit codes:
#   0 - All required prerequisites are met (warnings allowed)
#   1 - One or more required prerequisites are missing
################################################################################

set -e  # Exit on error in strict mode (can be overridden)
set +e  # Allow continuing through checks

# Detect CI environment
CI_MODE=false
if [[ "$1" == "--ci" ]] || [[ -n "${CI:-}" ]]; then
    CI_MODE=true
fi

if [[ "$1" == "--help" ]] || [[ "$1" == "-h" ]]; then
    cat << EOF
Anyline React Native Plugin - Environment Check Script

Usage:
  ./scripts/check-environment.sh           # Interactive mode with colors
  ./scripts/check-environment.sh --ci      # CI mode (plain text, strict)
  ./scripts/check-environment.sh --help    # Show this help

This script checks for:
  - Node.js version (from .nvmrc file)
  - npm and yarn package managers
  - Java (for Android builds)
  - Gradle (for Android builds)
  - Android SDK and environment variables
  - Android Build Tools (for React Native Android builds)
  - Android NDK (optional but recommended)
  - Xcode and iOS development tools (macOS only)
  - CocoaPods (macOS only, REQUIRED for iOS builds)
  - xcrun devicectl (recommended for iOS device deployment)
  - Watchman (optional file watching service)
  - React Native dependencies (yarn install status)
  - License key (src/license.js or ANYLINE_MOBILE_SDK_LICENSE_KEY)

Exit codes:
  0 - All required prerequisites met (warnings allowed)
  1 - One or more required prerequisites missing
EOF
    exit 0
fi

# Find repository root and change to it
if git rev-parse --git-dir > /dev/null 2>&1; then
    REPO_ROOT=$(git rev-parse --show-toplevel)
    cd "$REPO_ROOT" || {
        echo "Error: Could not change to repository root: $REPO_ROOT" >&2
        exit 1
    }
else
    echo "Warning: Not in a git repository. Assuming current directory is repository root."
fi

# Navigate to example app directory
if [[ -d "source/example/RNExampleApp" ]]; then
    cd source/example/RNExampleApp || {
        echo "Error: Could not change to example app directory" >&2
        exit 1
    }
else
    echo "Warning: Not in expected directory structure. Assuming current directory is correct."
fi

# Color codes (disabled in CI mode)
if [[ "$CI_MODE" == "true" ]]; then
    RED=""
    GREEN=""
    YELLOW=""
    BLUE=""
    BOLD=""
    DIM=""
    NC=""
    CHECK="[OK]"
    CROSS="[FAIL]"
    WARN="[WARN]"
    INFO="[INFO]"
else
    RED='\033[0;31m'
    GREEN='\033[0;32m'
    YELLOW='\033[1;33m'
    BLUE='\033[0;34m'
    BOLD='\033[1m'
    DIM='\033[2m'
    NC='\033[0m'
    CHECK="✅"
    CROSS="❌"
    WARN="⚠️ "
    INFO="ℹ️ "
fi

# Track overall status
HAS_ERRORS=false
HAS_WARNINGS=false

# AWK pattern for extracting fields
AWK_PRINT_FIELD2='{print $2}'

# Platform constants
readonly PLATFORM_MACOS="darwin"

# Helper functions
print_header() {
    local message="$1"
    echo ""
    echo "=========================================="
    echo "$message"
    echo "=========================================="
    return 0
}

print_section() {
    local message="$1"
    echo ""
    echo -e "${BOLD}$message${NC}"
    return 0
}

print_success() {
    local message="$1"
    echo -e "${GREEN}${CHECK}${NC} $message"
    return 0
}

print_error() {
    local message="$1"
    echo -e "${RED}${CROSS}${NC} $message"
    HAS_ERRORS=true
    return 0
}

print_warning() {
    local message="$1"
    echo -e "${YELLOW}${WARN}${NC} $message"
    HAS_WARNINGS=true
    return 0
}

print_info() {
    local message="$1"
    echo -e "${BLUE}${INFO}${NC} $message"
    return 0
}

print_fix() {
    local message="$1"
    echo -e "   ${BLUE}→${NC} Fix: $message"
    return 0
}

# Start checks
print_header "Anyline React Native Plugin - Environment Check"

if [[ "$CI_MODE" == "true" ]]; then
    echo "Running in CI mode"
else
    echo "Running in local mode"
fi

################################################################################
# Check 1: Node.js and npm/yarn
################################################################################
print_section "Check 1: Node.js and Package Managers"

# Read expected version from .nvmrc
EXPECTED_NODE_VERSION=""
if [[ -f "../../../.nvmrc" ]]; then
    EXPECTED_NODE_VERSION=$(cat ../../../.nvmrc | tr -d '[:space:]')
    print_info "Project requires Node.js version: $EXPECTED_NODE_VERSION"
elif [[ -f ".nvmrc" ]]; then
    EXPECTED_NODE_VERSION=$(cat .nvmrc | tr -d '[:space:]')
    print_info "Project requires Node.js version: $EXPECTED_NODE_VERSION"
else
    print_warning ".nvmrc file not found"
fi

# Check Node.js installation
if command -v node &> /dev/null; then
    CURRENT_NODE_VERSION=$(node --version | sed 's/v//')
    CURRENT_NODE_MAJOR=$(echo "$CURRENT_NODE_VERSION" | cut -d. -f1)

    print_success "Node.js is installed: v$CURRENT_NODE_VERSION"

    # Validate against .nvmrc if available
    if [[ -n "$EXPECTED_NODE_VERSION" ]]; then
        EXPECTED_MAJOR=$(echo "$EXPECTED_NODE_VERSION" | cut -d. -f1)

        if [[ "$CURRENT_NODE_MAJOR" -lt "$EXPECTED_MAJOR" ]]; then
            print_warning "Node.js version below recommended: Expected >= v$EXPECTED_NODE_VERSION, Got: v$CURRENT_NODE_VERSION"
            print_fix "Update Node.js: nvm install && nvm use"
            print_fix "Or install Node.js v$EXPECTED_NODE_VERSION+ from https://nodejs.org/"
            print_info "Older versions may cause compatibility issues"
        elif [[ "$CURRENT_NODE_MAJOR" -gt "$EXPECTED_MAJOR" ]]; then
            print_success "Node.js version exceeds minimum requirement (v$CURRENT_NODE_VERSION >= v$EXPECTED_MAJOR)"
        else
            print_success "Node.js version matches .nvmrc requirement (v$EXPECTED_MAJOR)"
        fi
    fi
else
    print_error "Node.js is not installed"
    if [[ -n "$EXPECTED_NODE_VERSION" ]]; then
        print_fix "Install Node.js v$EXPECTED_NODE_VERSION from https://nodejs.org/"
        print_fix "Or use NVM: nvm install $EXPECTED_NODE_VERSION"
    else
        print_fix "Install Node.js from https://nodejs.org/"
    fi
fi

# Check npm (bundled with Node.js)
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    print_success "npm is installed: $NPM_VERSION"
else
    print_error "npm is not installed (should be bundled with Node.js)"
    print_fix "Reinstall Node.js to restore npm"
fi

# Check yarn (optional - npm is preferred)
if command -v yarn &> /dev/null; then
    YARN_VERSION=$(yarn --version)
    print_success "yarn is installed: $YARN_VERSION"
    print_info "Note: This project uses npm as the primary package manager"
else
    print_info "yarn is not installed (optional - npm is the preferred package manager)"
fi

# Check NVM (optional but recommended)
if command -v nvm &> /dev/null; then
    NVM_VERSION=$(nvm --version 2>&1 || true)
    print_success "NVM is installed: $NVM_VERSION"
elif [[ -s "$HOME/.nvm/nvm.sh" ]]; then
    print_warning "NVM is installed but not activated in this shell"
    print_fix "Source NVM: source ~/.nvm/nvm.sh"
    print_fix "Or add to shell profile: https://github.com/nvm-sh/nvm#installing-and-updating"
else
    print_warning "NVM is not installed (optional but recommended)"
    print_fix "Install NVM from https://github.com/nvm-sh/nvm"
    print_info "NVM allows switching Node.js versions per project"
fi

################################################################################
# Check 2: Expo CLI
################################################################################
print_section "Check 2: Expo CLI"

# Check if npx is available (required for expo via npx)
if ! command -v npx &> /dev/null; then
    print_error "npx is not available (should be bundled with npm)"
    print_fix "Reinstall Node.js to restore npx"
    HAS_ERRORS=true
else
    # Check if expo package is in dependencies
    if [[ -f "package.json" ]] && grep -q '"expo"' package.json; then
        print_success "Expo is listed in package.json dependencies"

        # Check if it's installed in node_modules
        if [[ -d "node_modules/expo" ]]; then
            if [[ -f "node_modules/expo/package.json" ]]; then
                EXPO_VERSION=$(grep '"version"' node_modules/expo/package.json | head -1 | awk -F'"' '{print $4}')
                print_success "Expo is installed in node_modules: $EXPO_VERSION"
            else
                print_success "Expo is installed in node_modules"
            fi
            print_info "This project uses 'npx expo' commands (no global install needed)"
        else
            print_warning "Expo is in package.json but not installed in node_modules"
            print_fix "Run: npm install"
        fi
    else
        print_warning "Expo is not in package.json dependencies"
        print_fix "Add to dependencies: npm install expo"
    fi

    # Check if expo is installed globally (optional)
    if command -v expo &> /dev/null; then
        EXPO_VERSION=$(expo --version 2>&1)
        print_info "Expo CLI is also installed globally: $EXPO_VERSION (optional)"
        print_info "Note: This project uses 'npx expo' which doesn't require global install"
    fi

    # Check if expo-cli (legacy) is installed
    if command -v expo-cli &> /dev/null; then
        print_warning "Legacy expo-cli detected (deprecated)"
        print_fix "Uninstall legacy version: npm uninstall -g expo-cli"
        print_info "The expo-cli package has been replaced by @expo/cli"
    fi
fi

################################################################################
# Check 3: Watchman (Optional)
################################################################################
print_section "Check 3: Watchman (Optional)"

if command -v watchman &> /dev/null; then
    WATCHMAN_VERSION=$(watchman --version 2>&1 | head -n 1)
    print_success "Watchman is installed: $WATCHMAN_VERSION"
    print_info "Watchman improves React Native development performance"
else
    print_warning "Watchman is not installed (optional for better performance)"
    print_fix "Install Watchman: brew install watchman (macOS)"
    print_fix "Or follow instructions: https://facebook.github.io/watchman/docs/install.html"
    print_info "Watchman watches files for changes and improves Metro bundler performance"
fi

################################################################################
# Check 4: Java (for Android builds)
################################################################################
print_section "Check 4: Java"

if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1)
    print_success "Java is installed: $JAVA_VERSION"

    if [[ -n "${JAVA_HOME:-}" ]]; then
        print_success "JAVA_HOME is set: $JAVA_HOME"
    else
        print_warning "JAVA_HOME environment variable is not set"
        print_fix "Set JAVA_HOME in your shell profile (~/.zshrc or ~/.bashrc)"
        print_info "JAVA_HOME is required for Android builds"
    fi
else
    print_error "Java is not installed"
    print_fix "Install Java 11 or higher for Android builds"
    print_fix "Using Homebrew: brew install openjdk@17"
    print_fix "Or download from: https://adoptium.net/"
fi

################################################################################
# Check 5: Gradle (for Android builds)
################################################################################
print_section "Check 5: Gradle"

if command -v gradle &> /dev/null; then
    GRADLE_VERSION=$(gradle --version 2>&1 | grep "Gradle" | head -n 1)
    print_success "Gradle is installed: $GRADLE_VERSION"
else
    print_info "Gradle is not installed globally (React Native bundles Gradle wrapper)"
    print_info "React Native Android builds use bundled Gradle wrapper (./gradlew)"
    print_info "Manual Gradle installation: brew install gradle or sdk install gradle"
fi

################################################################################
# Check 6: Android SDK
################################################################################
print_section "Check 6: Android SDK"

ANDROID_SDK_FOUND=false
ANDROID_SDK_PATH=""

# Check environment variables
if [[ -n "${ANDROID_HOME:-}" ]] && [[ -d "$ANDROID_HOME" ]]; then
    print_success "ANDROID_HOME is set: $ANDROID_HOME"
    ANDROID_SDK_FOUND=true
    ANDROID_SDK_PATH="$ANDROID_HOME"
elif [[ -n "${ANDROID_SDK_ROOT:-}" ]] && [[ -d "$ANDROID_SDK_ROOT" ]]; then
    print_success "ANDROID_SDK_ROOT is set: $ANDROID_SDK_ROOT"
    ANDROID_SDK_FOUND=true
    ANDROID_SDK_PATH="$ANDROID_SDK_ROOT"
elif [[ -d "$HOME/Library/Android/sdk" ]]; then
    print_warning "Android SDK found at $HOME/Library/Android/sdk, but ANDROID_HOME not set"
    print_fix "Add to your shell profile: export ANDROID_HOME=\$HOME/Library/Android/sdk"
    print_fix "Add to PATH: export PATH=\$ANDROID_HOME/platform-tools:\$PATH"
    ANDROID_SDK_FOUND=true
    ANDROID_SDK_PATH="$HOME/Library/Android/sdk"
elif [[ -d "$HOME/Android/Sdk" ]]; then
    print_warning "Android SDK found at $HOME/Android/Sdk, but ANDROID_HOME not set"
    print_fix "Add to your shell profile: export ANDROID_HOME=\$HOME/Android/Sdk"
    print_fix "Add to PATH: export PATH=\$ANDROID_HOME/platform-tools:\$PATH"
    ANDROID_SDK_FOUND=true
    ANDROID_SDK_PATH="$HOME/Android/Sdk"
else
    print_error "Android SDK not found"
    print_fix "Install Android SDK via Android Studio"
    print_fix "Or install command line tools: https://developer.android.com/studio"
fi

# Check for platform-tools (adb)
if [[ "$ANDROID_SDK_FOUND" == "true" ]]; then
    if command -v adb &> /dev/null; then
        ADB_VERSION=$(adb --version 2>&1 | head -n 1)
        print_success "Android Platform Tools: $ADB_VERSION"
    else
        print_warning "adb not in PATH"
        print_fix "Add to PATH: export PATH=\$ANDROID_HOME/platform-tools:\$PATH"
    fi

    # Check for build-tools (React Native needs recent version)
    if [[ -d "$ANDROID_SDK_PATH/build-tools" ]]; then
        LATEST_BUILD_TOOLS=$(ls -1 "$ANDROID_SDK_PATH/build-tools" 2>/dev/null | sort -V | tail -n 1 || true)
        if [[ -n "$LATEST_BUILD_TOOLS" ]]; then
            print_success "Android Build Tools installed: $LATEST_BUILD_TOOLS"

            # List all available versions for info
            if [[ "$CI_MODE" != "true" ]]; then
                ALL_BUILD_TOOLS=$(ls -1 "$ANDROID_SDK_PATH/build-tools" 2>/dev/null | tr '\n' ', ' | sed 's/,$//' || true)
                if [[ -n "$ALL_BUILD_TOOLS" ]]; then
                    print_info "Available Build Tools: $ALL_BUILD_TOOLS"
                fi
            fi
        else
            print_warning "No Android Build Tools found"
            print_fix "Install via Android Studio SDK Manager"
            print_fix "Or via command line: \$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager 'build-tools;34.0.0'"
        fi
    else
        print_error "Android Build Tools directory not found"
        print_fix "Install Build Tools via Android Studio SDK Manager"
    fi

    # Check for NDK (optional but recommended for React Native)
    if [[ -d "$ANDROID_SDK_PATH/ndk" ]]; then
        NDK_VERSIONS=$(ls -1 "$ANDROID_SDK_PATH/ndk" 2>/dev/null || true)
        if [[ -n "$NDK_VERSIONS" ]]; then
            LATEST_NDK=$(echo "$NDK_VERSIONS" | sort -V | tail -n 1)
            print_success "Android NDK found: $LATEST_NDK"
            if [[ "$CI_MODE" != "true" ]]; then
                ALL_NDK=$(echo "$NDK_VERSIONS" | tr '\n' ', ' | sed 's/,$//')
                print_info "Available NDK versions: $ALL_NDK"
            fi
        else
            print_warning "Android NDK directory exists but is empty"
        fi
    else
        print_warning "Android NDK not found (optional but recommended)"
        print_info "NDK is required for native modules with C++ code"
        print_fix "Install via Android Studio SDK Manager"
        print_fix "Or via command line: \$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager 'ndk;25.1.8937393'"
    fi
fi

################################################################################
# Check 7: Xcode and iOS Development Tools (macOS only)
################################################################################
if [[ "$OSTYPE" == "$PLATFORM_MACOS"* ]]; then
    print_section "Check 7: Xcode and iOS Tools"

    # Check Xcode
    if command -v xcodebuild &> /dev/null; then
        XCODE_VERSION=$(xcodebuild -version | head -n 1)
        print_success "$XCODE_VERSION is installed"

        # Check command line tools
        if xcode-select -p &> /dev/null; then
            XCODE_PATH=$(xcode-select -p)
            print_success "Xcode Command Line Tools: $XCODE_PATH"

            # Check if pointing to standalone tools instead of Xcode
            if [[ "$XCODE_PATH" == "/Library/Developer/CommandLineTools" ]]; then
                print_warning "Command line tools pointing to standalone installation"
                print_fix "Point to Xcode: sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer"
            fi
        else
            print_error "Xcode Command Line Tools not configured"
            print_fix "Run: sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer"
            print_fix "Or install standalone tools: xcode-select --install"
        fi
    else
        print_error "Xcode is not installed"
        print_fix "Install Xcode from the Mac App Store"
        print_fix "Or download from https://developer.apple.com/xcode/"
    fi

    # Check CocoaPods (REQUIRED for React Native iOS builds)
    if command -v pod &> /dev/null; then
        POD_VERSION=$(pod --version 2>&1)
        print_success "CocoaPods is installed: $POD_VERSION"
    else
        print_error "CocoaPods not found (REQUIRED for React Native iOS builds)"
        print_fix "Install CocoaPods: sudo gem install cocoapods"
        print_fix "Or via Homebrew: brew install cocoapods"
        HAS_ERRORS=true
    fi

    # Check xcrun devicectl (recommended for iOS device deployment)
    if command -v xcrun &> /dev/null; then
        if xcrun devicectl --version &> /dev/null 2>&1 || xcrun devicectl --help &> /dev/null 2>&1; then
            print_success "xcrun devicectl is available (recommended for device deployment)"
        else
            print_warning "xcrun devicectl not available"
            print_info "Update Xcode to latest version for improved device deployment"
        fi
    fi

else
    print_info "Skipping iOS checks (not on macOS)"
fi

################################################################################
# Check 8: React Native Dependencies
################################################################################
print_section "Check 8: React Native Dependencies"

# Check if node_modules exists
if [[ -d "node_modules" ]]; then
    print_success "node_modules directory exists"

    # Check if react-native is installed
    if [[ -d "node_modules/react-native" ]]; then
        RN_VERSION=$(cat node_modules/react-native/package.json | grep '"version"' | head -1 | awk -F'"' '{print $4}' || true)
        if [[ -n "$RN_VERSION" ]]; then
            print_success "React Native is installed: $RN_VERSION"
        else
            print_success "React Native is installed"
        fi
    else
        print_warning "React Native not found in node_modules"
        print_fix "Run: npm install"
    fi

    # Check if Anyline plugin is installed
    if [[ -d "node_modules/anyline-ocr-react-native-module" ]] || [[ -L "node_modules/anyline-ocr-react-native-module" ]]; then
        print_success "Anyline React Native plugin is installed"
    else
        print_warning "Anyline plugin not found in node_modules"
        print_fix "Run: npm run reinstall (to link local plugin)"
    fi
else
    if [[ "$CI_MODE" == "true" ]]; then
        print_warning "node_modules directory not found (expected in CI .pre stage)"
        print_fix "Will be installed in build stage: npm install"
    else
        print_error "node_modules directory not found"
        print_fix "Run: npm install"
        HAS_ERRORS=true
    fi
fi

# Check package.json
if [[ -f "package.json" ]]; then
    print_success "package.json found"
else
    print_error "package.json not found"
    print_fix "You may not be in the correct directory"
fi

################################################################################
# Check 9: iOS CocoaPods Dependencies (macOS only)
################################################################################
if [[ "$OSTYPE" == "$PLATFORM_MACOS"* ]]; then
    print_section "Check 9: iOS CocoaPods Dependencies"

    PODFILE="ios/Podfile"
    PODFILE_LOCK="ios/Podfile.lock"
    PODS_DIR="ios/Pods"

    if [[ -f "$PODFILE" ]]; then
        if [[ -d "$PODS_DIR" ]] && [[ -f "$PODFILE_LOCK" ]]; then
            print_success "iOS CocoaPods dependencies are installed"

            # Check Anyline SDK version
            if grep -q "Anyline" "$PODFILE_LOCK"; then
                ANYLINE_VERSION=$(grep -A 1 "- Anyline" "$PODFILE_LOCK" | grep ":" | head -1 | awk "$AWK_PRINT_FIELD2" | tr -d '()')
                if [[ -n "$ANYLINE_VERSION" ]]; then
                    print_info "Anyline iOS SDK version: $ANYLINE_VERSION"
                fi
            fi
        else
            print_warning "iOS CocoaPods dependencies not installed"
            print_fix "Run: cd ios && pod install"
            HAS_WARNINGS=true
        fi
    else
        print_warning "No Podfile found at ios/Podfile"
        print_info "May need to run: npm run prebuild (for Expo projects)"
    fi
fi

################################################################################
# Check 10: License Key
################################################################################
print_section "Check 10: License Key"

# Check for license in src/license.js
if [[ -f "src/license.js" ]]; then
    if grep -q "const license" src/license.js; then
        LICENSE_VALUE=$(grep "const license" src/license.js | sed "s/.*['\"]\\(.*\\)['\"].*/\\1/" || true)
        if [[ -n "$LICENSE_VALUE" ]] && [[ "$LICENSE_VALUE" != "YOUR_LICENSE_KEY_HERE" ]] && [[ "$LICENSE_VALUE" != "undefined" ]]; then
            OBFUSCATED_KEY="${LICENSE_VALUE:0:10}...${LICENSE_VALUE: -10}"
            print_success "License key is set in src/license.js: $OBFUSCATED_KEY"
        else
            print_warning "License key in src/license.js appears to be placeholder or undefined"
            print_fix "Run: export ANYLINE_MOBILE_SDK_LICENSE_KEY='your-license-key' && node add_license_key.js"
        fi
    else
        print_warning "License key not found in src/license.js"
        print_fix "Run: export ANYLINE_MOBILE_SDK_LICENSE_KEY='your-license-key' && node add_license_key.js"
    fi
else
    print_warning "src/license.js not found"
    print_fix "Run: export ANYLINE_MOBILE_SDK_LICENSE_KEY='your-license-key' && node add_license_key.js"
fi

# Also check environment variable
if [[ -n "${ANYLINE_MOBILE_SDK_LICENSE_KEY:-}" ]]; then
    OBFUSCATED_KEY="${ANYLINE_MOBILE_SDK_LICENSE_KEY:0:10}...${ANYLINE_MOBILE_SDK_LICENSE_KEY: -10}"
    print_info "ANYLINE_MOBILE_SDK_LICENSE_KEY environment variable is also set: $OBFUSCATED_KEY"
fi

################################################################################
# Check 11: iOS Simulators (local mode only, macOS only)
################################################################################
if [[ "$CI_MODE" == "false" ]] && [[ "$OSTYPE" == "darwin"* ]]; then
    print_section "Check 11: iOS Simulators (Optional)"

    if command -v xcrun &> /dev/null; then
        SIMULATOR_COUNT=$(xcrun simctl list devices available 2>/dev/null | grep -c "iPhone" || true)

        if [[ "$SIMULATOR_COUNT" -gt 0 ]]; then
            print_success "Found $SIMULATOR_COUNT iOS simulator(s)"
        else
            print_warning "No iOS simulators found"
            print_fix "Open Xcode and install iOS simulators via Settings > Platforms"
        fi
    fi
fi

################################################################################
# Check 12: Android Devices/Emulators (local mode only)
################################################################################
if [[ "$CI_MODE" == "false" ]] && [[ "$ANDROID_SDK_FOUND" == "true" ]]; then
    print_section "Check 12: Android Devices/Emulators (Optional)"

    # Check for connected devices
    if command -v adb &> /dev/null; then
        DEVICE_COUNT=$(adb devices 2>/dev/null | grep -v "List of devices" | grep -c "device" || true)

        if [[ "$DEVICE_COUNT" -gt 0 ]]; then
            print_success "Found $DEVICE_COUNT connected Android device(s)/emulator(s)"
        else
            print_warning "No Android devices or emulators connected"
            print_fix "Connect a device or start an emulator via Android Studio AVD Manager"
            print_fix "Or use Expo CLI: npm run android"
        fi
    fi
fi

################################################################################
# Summary
################################################################################
print_header "Summary"

if [[ "$HAS_ERRORS" == "true" ]]; then
    echo -e "${RED}${CROSS} Some required prerequisites are missing${NC}"
    echo ""
    echo "Please fix the errors above and run this script again."
    echo ""

    if [[ "$CI_MODE" == "false" ]]; then
        echo "Quick setup guide:"
        echo "  1. Install Node.js (version from .nvmrc): nvm install && nvm use"
        echo "  2. Install Java 11+: brew install openjdk@17"
        echo "  3. Install Android SDK via Android Studio"
        if [[ "$OSTYPE" == "$PLATFORM_MACOS"* ]]; then
            echo "  4. Install Xcode from Mac App Store"
            echo "  5. Install CocoaPods: sudo gem install cocoapods"
        fi
        echo "  6. Install dependencies: npm install"
        echo "  7. Run this script again: ./scripts/check-environment.sh"
    fi

    exit 1
elif [[ "$HAS_WARNINGS" == "true" ]]; then
    echo -e "${YELLOW}${WARN} Environment check passed with warnings${NC}"
    echo ""
    echo "You can proceed with development, but some optional features may not work."
    echo "Review the warnings above to enable all functionality."

    if [[ "$CI_MODE" == "false" ]]; then
        echo ""
        echo "Recommended next steps:"
        echo "  1. Update license key in src/license.js"
        echo "  2. Install dependencies: npm install"
        echo "  3. Link plugin: npm run reinstall"
        echo "  4. Run Metro bundler: npm start"
        echo "  5. Build and run:"
        echo "     - Android: npm run android"
        echo "     - iOS: npm run ios"
        echo ""
        if [[ "$OSTYPE" == "$PLATFORM_MACOS"* ]]; then
            echo "For iOS development:"
            echo "  - Install pods: cd ios && pod install"
            echo "  - Build iOS: npm run prebuild && npm run ios"
            echo ""
        fi
        echo "For more information, see ReadMe.md"
    fi

    exit 0
else
    echo -e "${GREEN}${CHECK} All prerequisites are met!${NC}"
    echo ""

    if [[ "$CI_MODE" == "false" ]]; then
        echo -e "${BOLD}Next steps:${NC}"
        echo ""
        echo "  1. Update license key in src/license.js (if not already done)"
        echo ""
        echo "  2. Install dependencies:"
        echo -e "     ${DIM}npm install${NC}"
        echo ""
        echo "  3. Link plugin:"
        echo -e "     ${DIM}npm run reinstall${NC}"
        echo ""
        echo "  4. Start Metro bundler:"
        echo -e "     ${DIM}npm start${NC}"
        echo ""
        echo "  5. In another terminal, run the app:"
        echo -e "     ${DIM}npm run android     # Android${NC}"
        echo -e "     ${DIM}npm run ios         # iOS${NC}"
        echo ""
        if [[ "$OSTYPE" == "$PLATFORM_MACOS"* ]]; then
            echo -e "  Tip: For iOS, first run: ${DIM}cd ios && pod install && cd ..${NC}"
            echo ""
        fi
        echo "For more information, see ReadMe.md"
    else
        echo "Environment ready for CI build"
    fi

    exit 0
fi
