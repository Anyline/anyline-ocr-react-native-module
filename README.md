	 _____         _ _         
	|  _  |___ _ _| |_|___ ___ 
	|     |   | | | | |   | -_|
	|__|__|_|_|_  |_|_|_|_|___|
	          |___|            
	          
# Anyline React-Native Plugin

[Anyline](https://www.anyline.io) is mobile OCR SDK, which can be configured by yourself to scan all kinds of numbers, characters, text and codes. 

The plugin lets you connect to the SDK with React-Native.
	  
## Example

Go to the Example project in the [example folder](https://github.com/Anyline/anyline-ocr-react-native-module/tree/master/example/Anyline).

Check out the examples ResultView.js and config.json to see the implementation.
	                
## Quick Start Guide

### 1. Get a License
Go to [our pricing page](https://www.anyline.io/pricing/) and get your license or sign up for your expiring test license.

### 2. Get the Anyline react-native plugin

Download or Clone the Repo to your node_modules
```
project   
│    android.index.js
│    ios.index.js
└─── node_modules
     └─── anyline-ocr-react-native-module
```

or just go 

```
 npm i anyline-ocr-react-native-module
``` 
 

Link the project. Run in root:
 ```
react-native link
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

##### Podfile
- Copy the [Podfile](https://github.com/Anyline/anyline-ocr-react-native-module/blob/master/example/RNExampleApp/ios/Podfile) 
from our example Project to your native iOS root folder.
- Change the target and project of the Podfile to your project name.
- ```pod update```
  - if you get an error about node_modules dependencies initialize your project with `npm install` first.

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
import AnylineOCR from 'anyline-ocr-react-native-module';
```
### 5. Import the config file
```
import config from './config.js';
```
Add and import a JSON file with the proper structure and elements. The JSON config contains: 

1. The license key 

2. Options field with
-	AnylineSDK config parameter
-	“segment”: which contains the scanModes for the UI Segment (e.g. switch between Analog and Digital) - optional
3. OCR field with (Only if you want to use the OCR module)
-   your custom training data
-   RegEx Validation

If you want to get detailed information on the config JSON, go to our[`documentation`](https://documentation.anyline.io/toc/view_configuration/index.html).

### 6. Call the Anyline component 

#### Callbacks

```
AnylineOCR.setup(
        JSON.stringify(config),
        “ANALOG_METER”,
        this.onResult,
        this.onError
    );
```

#### Promise
```
openAnyline = async () => {
    ...
    
    try {
        const result = await AnylineOCR.setupPromise(JSON.stringify(config), “ANALOG_METER”);
    } catch(error) {
        console.error(error);
    }
    
    ...
}
```

##### Deprecated
```
AnylineOCR.setupScanViewWithConfigJson(
        JSON.stringify(config),
        “ANALOG_METER”,
        this.onResult,
        this.onError
    );
```



### 7. Add TrainData to the OCR Module
If you are using the ANYLINE_OCR module, you'll have to add some traineddata. There are some predefined traineddata which
you can find in the example app. Also the OCR Config has to reflect the path. Check the VoucherConfig.js in the 
example/RNExampleApp/config folder.

IMPORTANT: The trainedFiles have to be directly in the Asset folder in Android.

#### iOS
```
ios   
 └─── myTrainedData.traineddata
```

#### Android
```
android   
   └─── app
         └─── src
               └─── main
                      └─── assets
                             └─── myTrainedData.traineddata || myTrainedData.any
```


## Props

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| config | string | \*required | config (JSON String)|
| scanMode | string |  \*required  | Will set the scanMode/Module of the Plugin. |
| onResult | function | \*required | The function you pass will be the onResult callback. Use this callback to handle the found scan results. |
| onError | function |  \*required  | The onError function will be called when the AnylinePlugin encounters an error. Handle the error messages in this method. |

### config
Stringified JSON with all the configurations, detailed information [here](https://documentation.anyline.io/toc/view_configuration/index.html).

Keep in mind, that you have to add every permission to your project, you add in the config (vibrateOnResult -> vibration permission)
### scanMode
Available settings: 

##### Energy Meter
```
"AUTO_ANALOG_DIGITAL_METER"
"ANALOG_METER"
"DIGITAL_METER"
"DIAL_METER"
"HEAT_METER_4"
"HEAT_METER_5"
"HEAT_METER_6"
"SERIAL_NUMBER"
```
##### Other ScanModes
```
"BARCODE"
"MRZ"
"ANYLINE_OCR"
"DOCUMENT"
"LICENSE_PLATE"
```
Get more information in our [Docu](https://documentation.anyline.io/toc/platforms/react-native/getting_started.html#react-native-set-scan-mode).

### onResult Function
Callback -> Stringified JSON
```
{
    reading : 'Result of the Scan',
    imagePath : 'path to cropped image',
    fullImagePath : 'path to full image',
    barcode : 'result of the simultaneous barcode scanning',
    scanMode : 'selected scanMode',
    meterType : 'meter type'
}
```
More information about the simultaneous barcode scanning [here](https://documentation.anyline.io/toc/modules/overview.html#anyline-modules-simultaneous-barcode-scanning).

### onError Function
Callback -> String
- String errorMessage

## Additional Functions

#### getLicenseExpiryDate
Check till when the provided License is or was valid. Returns a string.
```
import AnylineOCR, { getLicenseExpiryDate } from 'anyline-ocr-react-native-module';

...

console.log(getLicenseExpiryDate(myLicenseString)); // 'YYYY-MM-DD'
...
```


## Images

Keep in mind, all the images are saved in the cache directory of the app. For performance reasons, we only provide the 
path as string, so we don't have to transfer the whole image through the bridge. Please be aware,  that you should not 
use the images in the cache directory for persistent storage, but store the images in a location of your choice for persistence. 

## License

See LICENSE file.
