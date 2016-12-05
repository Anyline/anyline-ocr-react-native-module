
### React Native SETUP ###

- install react native (maybe with sudo depending on your setup) (see https://facebook.github.io/react-native/docs/getting-started.html)
```
npm install -g react-native-cli
```

- open the android folder in android-studio

- start the development server manually (specify the port if default port 8081 is not free):
```
react-native start --port=8088
adb reverse tcp:8088 tcp:8088
```

- configure your firewall that the phone can connect to that port via tcp

- start the app via studio or
```
react-native run-android
```

- shake the phone (press menu button if phone has one, or "adb shell input keyevent 82"), go to dev settings -> debug server host -> type in the pc ip and port (e.g. 192.168.8.102:8088)
- shake and reload


### Anyline Setup ###

Disclaimer: Check out the examples ResultView.js and config.json 

In order to implement the AnylineSDKPlugin into react native you have to complete the following steps:

1.) add and import a JSON file with the proper structure and elements.
	the json config contains:
		- The license key 
		- Options field with
			-  AnylineSDK config parameter (see https://documentation.anyline.io/toc/view_configuration/index.html)
			- “segment”: which contains the scanModes for the UI Segment (e.g. switch between Analog and Digital)

2.) import the config.json file in your JavaScript file.

3.) Import Anyline.js
	import Anyline from './Anyline';

4.) Add the Anyline component to your JavaScript file
	<Anyline config={config} scanMode={this.scanMode} onResult={this.onResult} onError={this.onError} />
		@param config (JSON String)
		 
		@param scanMode (String)
			Will set the scanMode/Module of the Plugin. 
			Available settings:
				“ANALOG_METER”
				“DIGITAL_METER”
				“DOCUMENT”
				“BARCODE”
				“ANYLINE_OCR”
				“MRZ”

		@param onResult (func)
			The function you pass will be the onResult callback.
			Use this callback to handle the found scan results.

		@param onError (func)
			The onError function will be called when the AnylinePlugin 			encounters an error.
			Handle the error messages in this method.