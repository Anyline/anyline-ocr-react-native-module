	 _____         _ _         
	|  _  |___ _ _| |_|___ ___ 
	|     |   | | | | |   | -_|
	|__|__|_|_|_  |_|_|_|_|___|
	          |___|            
	          
# Anyline React-Native Plugin

[Anyline](https://www.anyline.io) is mobile OCR SDK, which can be configured by yourself to scan all kinds of numbers, characters, text and codes. 

The plugin lets you connect to the SDK with React-Native.
	             
## Quick Start Guide

### 1. Get the Anyline react-native plugin

Download or Clone the Repo to your node_modules.

### 2. Get the native Dependencies

##### Android
Go into the native Android folder of the Anyline React-Native Plugin and sync Gradle.

##### iOS
Go into the native iOS folder of the Anyline React-Native Plugin and call "pod install".


### 3. Import the plugin to your JavaScript file

```
    import Anyline from 'anyline-ocr-react-native-module';
```
### 4. Import the config file
```
    import config from './config.js';
```
Add and import a JSON file with the proper structure and elements. The JSON config contains: 

1.) The license key 

2.) Options field with
-	AnylineSDK config parameter
-	“segment”: which contains the scanModes for the UI Segment (e.g. switch between Analog and Digital)

If you want to get detailed information on the config JSON, go to our [`documentation`](https://documentation.anyline.io/toc/view_configuration/index.html)

Check the permissions of the native parts after adding permission-needed actions (like vibrate on result).

### 5. Add the Anyline component in your render function
```
	<Anyline config={config} scanMode={“ANALOG_METER”} onResult={this.onResult} onError={this.onError} />
```
## Props

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| config | string | \*required | config (JSON String)|
| scanMode | string |  \*required  | Will set the scanMode/Module of the Plugin. Available settings: (“ANALOG_METER”, “DIGITAL_METER”, “DOCUMENT”, “BARCODE”, “ANYLINE_OCR”, “MRZ”)|
| onResult | function | \*required | The function you pass will be the onResult callback. Use this callback to handle the found scan results. |
| onError | function |  \*required  | The onError function will be called when the AnylinePlugin encounters an error. Handle the error messages in this method. |


			
### Example ###

Go to the Example project in the[`example folder`](https://github.com/Anyline/anyline-ocr-react-native-module/tree/master/example/Anyline).

Check out the examples ResultView.js and config.json to see the implementation.
