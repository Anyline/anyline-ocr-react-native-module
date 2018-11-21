	 _____         _ _         
	|  _  |___ _ _| |_|___ ___ 
	|     |   | | | | |   | -_|
	|__|__|_|_|_  |_|_|_|_|___|
	          |___|            
	          
# Anyline React-Native Plugin

[Anyline](https://www.anyline.io) is mobile OCR SDK, which can be configured by yourself to scan all kinds of numbers, characters, text and codes. 

The plugin enables the connection to the SDK via React-Native.
	  

## Update to >= 5.0

If you use this plugin with an equal or greater version then 5.0, you can use our new Anyline structure, which will provide the whole
configuration of every SDK feature through the config file. If you use the the `scan` call in your Javascript files, you have to 
use a new config style.
The old calls with the old configurations will still work.


## Requirements:

### iOS

Platform >= 10


### Android 

minSDK >= 19

## Example

Take a look into  [example/RNExampleApp/src/Result.js](https://github.com/Anyline/anyline-ocr-react-native-module/tree/master/example/RNExampleApp/src/Result.js) to see the implementation.
	                
## Quick Start Guide

### 1. Get a License
Go to [our pricing page](https://www.anyline.io/pricing/) and get your license or sign up for your expiring test license.

### 2. Get the Anyline react-native plugin

Via npm:

```bash
 npm i anyline-ocr-react-native-module
``` 

or download / clone this repository and copy the content of the `plugin` folder into `node_modules` inside a new folder named `anyline-ocr-react-native-module`:

```bash
project   
│    android
│    ios
└─── node_modules
     │    ...
     └─── anyline-ocr-react-native-module
```

Install react-native-cli

 ```bash
npm i -g react-native-cli
 ```

Link the project. Run as root inside your project root:

 ```bash
react-native link
 ```

### 3. Get the native Dependencies

#### Android

##### Setup Packages

The package name must match with the bundleID from your Anyline license. 

##### Add the Anyline package

Open `MainApplication.java` inside your native Android folder of your project:

Import `AnylinePackage`

```Java
import com.anyline.reactnative.AnylinePackage;
```
and add the package to your `getPackages` method

```Java
@Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new AnylinePackage()
      );
    }
```

##### Add repositories to your app

You need to add the Anyline and the google repository to your `build.gradle`, so gradle does know, where to find these.

To do this open `yourApp/android/build.gradle` and add this to allprojects:

```
allprojects {
    repositories {
    	...
        google()
        maven {
            url 'https://anylinesdk.blob.core.windows.net/maven/'
        }
    }
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
from our example Project into your native iOS root folder.
- Change the target and project of the Podfile to your project name.
- ```pod update```
  - if you get an error about `node_modules` dependencies initialize your project with `npm install` first.

##### Permissions
Add camera permissions to `Info.plist`
```
Privacy - Camera Usage Description
```
Add also every other permission you want to configure in your `config.js` (vibrate, sound).

##### Anyline License
Your BundleIdentifier of your app has to match with your bundleID from your Anyline License.

### 4. Import the plugin into your JavaScript file
```JavaScript
import AnylineOCR from 'anyline-ocr-react-native-module';
```
### 5. Import the config file
```JavaScript
import config from './config.js';
```
Add and import a JSON file with the proper structure and elements. The JSON config contains: 

1. The license key 

2. Options field with
-	AnylineSDK config parameter
-	“segment”: which contains the scanModes for the UI Segment (e.g. switch between Analog and Digital) - optional
3. OCR field with (Only if you want to use the OCR module)
-   your custom training data
-   RegEx validation

If you want to get detailed information about the config JSON, check out the official [documentation](https://documentation.anyline.io/toc/view_configuration/index.html).

### 6. Call the Anyline component 

#### Callbacks

```JavaScript
AnylineOCR.setup(
        JSON.stringify(config),
        'scan',
        this.onResult,
        this.onError
    );
```

#### Promise
```JavaScript
const openAnyline = async () => {
    ...
    
    try {
        const result = await AnylineOCR.setupPromise(JSON.stringify(config), 'scan');
    } catch(error) {
        console.error(error);
    }
    
    ...
}
```

##### Deprecated
```JavaScript
AnylineOCR.setupScanViewWithConfigJson(
        JSON.stringify(config),
        'scan',
        this.onResult,
        this.onError
    );
```



### 7. Add TrainData to the OCR Module
If you are using the `ANYLINE_OCR` module, you'll have to add some `traineddata`. There are some predefined `traineddata` which
you can find in the example app. Also the OCR Config has to reflect the path. Check the VoucherConfig.js in the [example/RNExampleApp/config](https://github.com/Anyline/anyline-ocr-react-native-module/tree/master/example/RNExampleApp/config) folder.

> __IMPORTANT:__ The trainedFiles have to be directly in the Asset folder in Android.

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
| scanMode | string |  \*required  | In the new Version, this is always 'scan', and the scanMode is declared through the configuration |
| onResult | function | \*required | The function you pass will be the onResult callback. Use this callback to handle the found scan results. |
| onError | function |  \*required  | The onError function will be called when the AnylinePlugin encounters an error. Handle the error messages in this method. |

### config
Stringified JSON with all the configurations, detailed information [here](https://documentation.anyline.io/toc/view_configuration/index.html).

Keep in mind, that you have to add every permission to your project, you add in the config (vibrateOnResult -> vibration permission)

### onResult Function
Callback -> Stringified JSON
```JavaScript
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
Get the exparation date of the provided license. Returns a string.
```JavaScript
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
