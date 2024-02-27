# Anyline React-Native Example App

## Requirements

- Cocoapods
- Gradle
- Node/Npm

## Getting Started

- clone Repo
- `cd example/RNExampleApp`
- `npm/yarn install`
- `npm/yarn run reinstall`
- `cd ios`
- `pod update`

### Set the License Key

IMPORTANT: Before running the example app, replace the string defined in `demoAppLicenseKey` (in RNExampleApp/src/index.js) with a valid license key. To claim a free developer / trial license, go to: [Anyline SDK Register Form](https://anyline.com/free-demos/)

### Android

To run the Anyline React Native Developer Examples App on Android:

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

* Make sure you have the latest/correct version of node installed
* If you get stuck completely on Android, go into the "android" directory and do a gradle clean: `cd example/RNExampleApp/android/`, then `./gradlew clean`.
* Examples app won't build or run correctly on iOS? Execute these commands from `example/RNExampleApp`:
  * `rm -rf node_modules package-lock.json ios/Pods ios/Podfile.lock ios/RNExampleApp.xcworkspace`
  * `yarn cache clean`
  * `yarn reinstall`
  * `yarn ios` (this does `expo run:ios --device`)

TIP: when debugging issues, try and build and run the examples app with the xcworkspace on Xcode. If there are issues, they will have more actionable steps.

### iOS

Open `example/RNExampleApp/iOS/RNExampleApp.xcworkspace` with XCode and build/deploy to device.
