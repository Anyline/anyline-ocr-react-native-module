# Anyline React-Native Example App

## Requirements

- Cocoapods
- Gradle
- Node/Npm

## Getting Started

- `cd example/RNExampleApp`
- `npm install` or `yarn install`
- `npm run reinstall` or `yarn reinstall`
- `npm run <PLATFORM>` or `yarn <PLATFORM>`, where PLATFORM is one of 'ios' or 'android'

### Set the License Key

IMPORTANT: Before running the example app, replace the string defined in `license` (in RNExampleApp/src/license.js) with a valid license key. To claim a free developer / trial license, go to: [Anyline SDK Register Form](https://anyline.com/free-demos/)

### Android

The recommended (proven) way to run these Developer Examples, as of April 2025:
- Use node v18.18.0: `nvm alias default v18.18.0`
- Use Java 17: `sdk default java 17.0.12-tem`
- Use yarn (as opposed to npm), version 1.22.22 (other versions might work too)

To launch the Developer Examples on Android with expo-cli run the following commands:
```shell
cd example/RNExampleApp/
yarn install
yarn run reinstall
npx expo run:android
```

Alternatively, run the Developer Examples App via react-native cli:

* `cd example/RNExampleApp`
* `npx react-native run-android` or `npx react-native@latest run-android`

Alternatively, open the folder `example/RNExampleApp` with Android Studio, sync gradle, and deploy to device. Make sure you're either running Metro (run `npx react-native start`) or that your bundle is packaged correctly for release.

To testing the release build of the app:

* `cd example/RNExampleApp`
* `npm run android --mode="release"` or `yarn android --mode release`

To generate a release AAB:

* `npx react-native build-android --mode=release`

In case you run any issues, run the following commands to uninstall and reinstall the necessary dependencies:

* `cd example/RNExampleApp`
* `yarn install` or `npm install`
* `yarn run reinstall` or `npm run reinstall`

How to generate a debug apk (in `example/RNExampleApp/android/app/build/outputs/apk/debug/app-debug.apk`):

```shell
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
  cd android && ./gradlew assembleDebug
```


#### Troubleshooting

* Make sure you have the latest/correct version of node installed.
* If you get stuck completely on Android, go into the "android" directory and do a gradle clean: `cd example/RNExampleApp/android/`, then `./gradlew clean`.

### iOS

Run `yarn ios` from `example/RNExampleApp` to build and deploy the developer examples app to a device.

Alternatively, you can open `example/RNExampleApp/iOS/RNExampleApp.xcworkspace` with Xcode.

TIP: when debugging certain issues, when possible, try to build and run the examples app from Xcode by opening the `ios/*.xcworkspace file`. Xcode can usually present the issues more clearly and provide better actionable steps.


#### Troubleshooting

To do a fresh build and install of the developer examples app on iOS, execute the following commands from `example/RNExampleApp`:

```
rm -rf node_modules package-lock.json
rm -rf ios/Pods ios/Podfile.lock ios/RNExampleApp.xcworkspace
npm cache clean --force
npm install
npm run reinstall
```

Doing this may help resolve up some issues with NPM dependencies.


NOTE: If you're running on iOS, recent versions of the developer examples app may require [patch-package](https://github.com/ds300/patch-package) to be installed beforehand:

```
npm install --save-dev patch-package postinstall-postinstall
```

For additional information, read on for more details: [Verification checksum was incorrect](https://github.com/boostorg/boost/issues/843)