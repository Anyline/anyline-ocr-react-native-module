# Anyline React-Native Example App

## Requirements

The example app requires the following tools to be installed:

- Node.js (v18.18.0 recommended)
- npm (comes with Node.js)
- Java 17 (for Android development)
- Android SDK (for Android development)
- Xcode (for iOS development, macOS only)
- CocoaPods (for iOS development, macOS only)

**Quick Check:** Run the environment check script to verify your setup:
```bash
./scripts/check-environment.sh
```

## Getting Started

All commands below should be run from `example/RNExampleApp/`.

- `cd example/RNExampleApp`
- `npm install`
- `npm run reinstall`
- `npm run prebuild`
- `npm run <PLATFORM>` where PLATFORM is one of 'android' or 'ios'

**Note:** The `prebuild` step regenerates native Android/iOS projects with all Expo modules properly configured. Run it:
- On first setup
- After adding new Expo dependencies
- When native build configuration needs to be reset

### Set the License Key

IMPORTANT: Before running the example app, you must set a valid Anyline license key.

**Option 1: Environment Variable (Recommended)**

Set the license key in your shell profile (`~/.zshrc` or `~/.bashrc`):
```bash
export ANYLINE_MOBILE_SDK_LICENSE_KEY="your-license-key-here"
```

Then generate the license file:
```bash
./scripts/generate_license_key.sh
```

This script reads from `ANYLINE_MOBILE_SDK_LICENSE_KEY` and creates `src/license.js`.

**Note:** The license is also generated automatically when running `npm run reinstall`.

**Option 2: Manual Edit**
Replace the string defined in `license` in `src/license.js` with a valid license key.

To claim a free developer / trial license, go to: [Anyline SDK Register Form](https://anyline.com/free-demos/)

### Android

#### Environment Setup

The recommended environment for running the Android example app:
- Node.js v18.18.0: `nvm alias default v18.18.0`
- Java 17: `sdk default java 17.0.12-tem`

#### Running on Device/Emulator

To launch the example app on Android:
```shell
cd example/RNExampleApp/
npm install
npm run reinstall
npm run prebuild
npm run android
```

This command builds the app, deploys it to your connected device or running emulator, and automatically starts the Metro bundler.

#### Alternative: Android Studio

You can also open the folder `example/RNExampleApp` with Android Studio, sync Gradle, and deploy to device. If you build directly via Android Studio, you must start Metro manually with `npm start` in a separate terminal.

#### Release Build

To test the release build of the app:
```bash
npm run android -- --mode=release
```

To generate a release AAB:
```bash
npx expo build:android --release-channel production
```

#### Reinstalling Dependencies

If you encounter issues, uninstall and reinstall the dependencies:
```bash
npm install
npm run reinstall
```


#### Troubleshooting

* Make sure you have the latest/correct version of Node.js installed (v18.18.0 recommended).
* If you get stuck completely on Android, go into the "android" directory and do a Gradle clean: `cd example/RNExampleApp/android/`, then `./gradlew clean`.

### iOS

#### First-Time Setup

**Important:** Before running on a physical iOS device for the first time, you must configure code signing in Xcode:

1. Open the workspace: `open ios/RNExampleApp.xcworkspace`
2. Select the `RNExampleApp` target in the left sidebar
3. Go to "Signing & Capabilities" tab
4. Check "Automatically manage signing"
5. Select your Apple Developer Team

Once configured, the signing settings are saved and command-line deployment will work for subsequent builds.

#### Running on Device

To build, deploy, and launch the app on your connected iOS device:
```bash
cd example/RNExampleApp/
npm run ios
```

This command builds the app, deploys it to your connected device, and automatically starts the Metro bundler.

**Note:** If you build directly via Xcode, you must start Metro manually with `npm start` in a separate terminal.

#### Alternative: Xcode

You can also open `example/RNExampleApp/ios/RNExampleApp.xcworkspace` with Xcode to build and deploy.

**Tip:** When debugging certain issues, try building and running the app from Xcode by opening the `ios/RNExampleApp.xcworkspace` file. Xcode can present build issues more clearly and provide better actionable steps.


#### Troubleshooting

To do a fresh build and install of the example app on iOS, execute the following commands from `example/RNExampleApp/`:

```bash
rm -rf node_modules package-lock.json
rm -rf ios/Pods ios/Podfile.lock ios/RNExampleApp.xcworkspace
npm cache clean --force
npm install
npm run reinstall
npm run prebuild
```

This cleans all dependencies and regenerates the iOS project, which may help resolve build or dependency issues.