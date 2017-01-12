	 _____         _ _         
	|  _  |___ _ _| |_|___ ___ 
	|     |   | | | | |   | -_|
	|__|__|_|_|_  |_|_|_|_|___|
	          |___|            
	          
# Anyline React-Native Plugin

[Anyline](https://www.anyline.io) is mobile OCR SDK, which can be configured by yourself to scan all kinds of numbers, characters, text and codes. 

The plugin lets you connect to the SDK with React-Native.
	  
## Example ##

Go to the Example project in the [example folder](https://github.com/Anyline/anyline-ocr-react-native-module/tree/master/example/Anyline).

Check out the examples ResultView.js and config.json to see the implementation.
	                
## Quick Start Guide

### 1. Get a License
Go to [our pricing page](https://www.anyline.io/pricing/) and get your license (currently we only support enterprise licenses for react-native, community is comming soon).

### 2. Get the Anyline react-native plugin

Download or Clone the Repo to your node_modules (Npm coming soon). 
```
project   
│    android.index.js
│    ios.index.js
└─── node_modules
     └─── anyline-ocr-react-native-module

```
To link the project install [rnpm](https://github.com/rnpm/rnpm) and run 
 ```
rnpm link
 ```
in the root folder.

### 3. Get the native Dependencies

#### Android

##### Setup Packages

Package name must match with the bundleID from your Anyline License. 

##### Add Anyline Package

Go into the native Android folder of your Project to your MainApplication.

Import the AnylinePackage
```
import com.anyline.reactnative.AnylinePackage;
```
and add the package to your getPackages function
```
@Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new AnylinePackage()
      );
    }
```
#### Issues
Strict mode does not allow function declarations in a lexically nested statement.
 
 http://stackoverflow.com/a/41076153/2157717

duplicate files during packaging of APK
```
packagingOptions {
  pickFirst 'lib/armeabi-v7a/libgnustl_shared.so'
  pickFirst 'lib/x86/libgnustl_shared.so'
}
```
#### iOS 
Disable bitcode in your project

##### Podfile
- Copy the [Podfile](https://github.com/Anyline/anyline-ocr-react-native-module/tree/master/example/Anyline/ios/Podfile) 
from our example Project to your native iOS root folder.
- Change the target of the Podfile to your project name.
- ```pod install```

##### Permissions
Add Camera Permissions to Info.plist
```
Privacy - Camera Usage Description
```
Add also every other permission you want to configure in your config.js (vibrate, sound).

##### Anyline License
Your BundleIdentifier of your app has to match with your bundleID from your Anyline License.

### 4. Import the plugin to your JavaScript file
```
import Anyline from 'anyline-ocr-react-native-module';
```
### 5. Import the config file
```
import config from './config.js';
```
Add and import a JSON file with the proper structure and elements. The JSON config contains: 

1.) The license key 

2.) Options field with
-	AnylineSDK config parameter
-	“segment”: which contains the scanModes for the UI Segment (e.g. switch between Analog and Digital)

If you want to get detailed information on the config JSON, go to our[`documentation`](https://documentation.anyline.io/toc/view_configuration/index.html).

### 6. Add the Anyline component in your render function
```
<Anyline config={config} scanMode={“ANALOG_METER”} onResult={this.onResult} onError={this.onError} onCancel={this.onCancel} />
```
## Props

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| config | string | \*required | config (JSON String)|
| scanMode | string |  \*required  | Will set the scanMode/Module of the Plugin. |
| onResult | function | \*required | The function you pass will be the onResult callback. Use this callback to handle the found scan results. |
| onError | function |  \*required  | The onError function will be called when the AnylinePlugin encounters an error. Handle the error messages in this method. |
| onCancel | function |  \*required  | The onCancel function will be called when the AnylinePlugin is canceled without any result (pressing back button) |

### config
Stringified JSON with all the configurations, detailed information [here](https://documentation.anyline.io/toc/view_configuration/index.html).

### scanMode
Available settings: 
```
“ANALOG_METER”
“DIGITAL_METER”
“BARCODE”
“ANYLINE_OCR”
“MRZ”
```
### onResult Function
Callback -> Stringified JSON
```
{
    reading : 'Result of the Scan',
    imagePath : 'path to cropped image',
    fullImagePath : 'path to full image',
    barcode : 'result of the simultaneous barcode scanning',
    scanMode : 'selected scanMode',
    meterType : 'meter type',
    cutoutBase64 : 'base64 string of cropped image', 
    fullImageBase64 : 'base64 string of full image' 
}
```
More information about the simultaneous barcode scanning [here](https://documentation.anyline.io/toc/modules/overview.html#anyline-modules-simultaneous-barcode-scanning).
### onError Function
Callback -> String
- String errorMessage

### onCancel Function
Callback
