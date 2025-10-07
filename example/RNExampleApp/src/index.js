import React, { Component, useRef } from 'react';

import {
  BackHandler,
  LayoutAnimation,
  LogBox,
  ScrollView,
  StyleSheet,
  Text,
  View,
  NativeModules,
  Platform,
  NativeEventEmitter,
  DeviceEventEmitter,
} from 'react-native';

import AnylineOCR from 'anyline-ocr-react-native-module';

import Result from './Result';
import Overview from './Overview';

import BarcodeConfig from '../assets/config/BarcodeConfig.json';
import BarcodePDF417Config from '../assets/config/Barcode_PDF417Config.json';
import MRZConfig from '../assets/config/MRZConfig.json';
import UniversalIdConfig from '../assets/config/UniversalIdConfig.json';
import ArabicIdConfig from '../assets/config/ArabicIdConfig.json';
import CyrillicIdConfig from '../assets/config/CyrillicIdConfig.json';
import AnalogDigitalMeterConfig from '../assets/config/AnalogDigitalMeterConfig.json';
import SerialNumberConfig from '../assets/config/SerialNumber.json';
import VinConfig from '../assets/config/VINConfig.json';
import USNRConfig from '../assets/config/USNRConfig.json';
import ShipConConfig from '../assets/config/ContainerShipConfig.json';
import VerticalContainerConfig from '../assets/config/VerticalContainerConfig.json';
import SerialScanningConfig from '../assets/config/SerialScanningConfig.json';
import ParallelScanningConfig from '../assets/config/ParallelScanningConfig.json';
import ParallelFirstScanningConfig from '../assets/config/ParallelFirstScanningConfig.json';
import TireMakeConfig from '../assets/config/TireMakeConfig.json';
import TireSizeConfig from '../assets/config/TireSizeConfig.json';
import CommercialTireIdConfig from '../assets/config/CommercialTireIdConfig.json';
import OdometerConfig from '../assets/config/OdometerConfig.json';
import VRCConfig from '../assets/config/VRCConfig.json';
import DialMeterConfig from '../assets/config/DialMeterConfig.json';
import LicensePlateConfigEU from '../assets/config/LicensePlateConfigEU.json';
import LicensePlateConfigUS from '../assets/config/LicensePlateConfigUS.json';
import LicensePlateConfigAF from '../assets/config/LicensePlateConfigAF.json';
import TINUniversalConfig from '../assets/config/TINUniversalConfig.json';
import TINDOTConfig from '../assets/config/TINDOTConfig.json';
import BarcodeContinuousConfig from "../assets/config/BarcodeContinuousConfig.json";
const { license } = require('./license.js');

// Disable Warnings
LogBox.ignoreAllLogs(true);

const scrollRef = React.createRef();

const demoAppLicenseKey = license;

function getPlatformEventEmitter() {
  return Platform.select({
    ios: new NativeEventEmitter(NativeModules),
    android: DeviceEventEmitter,
  });
}

class Anyline extends Component {

  state = {
    hasScanned: false,
    result: '',
    imagePath: '',
    fullImagePath: '',
    currentScanMode: '',
    buttonsDisabled: false,
    SDKVersion: '',
    pluginVersion: '',
    hasMultipleResults: false,
    hasContinuousResults: false,
    licenseMessage: '',
    titles: [],
  };

  componentDidMount = async () => {
        
    console.log(`AnylineOCR.setupAnylineSDK`);
    var licenseMessage = ``;
    var licenseInitSuccess = false;
    try {
      await AnylineOCR.setupAnylineSDK(demoAppLicenseKey);
      console.log(`AnylineOCR.initialized`);
      var expiry = await AnylineOCR.licenseKeyExpiryDate();
      console.log('expiry: ' + expiry);
      licenseMessage = 'License expires on: ' + expiry;
      licenseInitSuccess = true;
    } catch (error) {
      licenseMessage = 'Error: ' + error.message;
      console.log('error initializing Anyline SDK: ' + error);
      alert(licenseMessage);
    }

    const SDKVersion = await AnylineOCR.getSDKVersion();
    const pluginVersion = AnylineOCR.getPluginVersion();

    this.setState({ SDKVersion: SDKVersion, pluginVersion: pluginVersion, licenseMessage: licenseMessage, buttonsDisabled: !licenseInitSuccess });
  };

  componentDidUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  updateAnyline = async type => {
    this.openAnyline(type);
  };

  _openAnyline = async (type) => {
    this.setState({ buttonsDisabled: true });
    this.setState({ titles: [] });
    let config;
    let { titles } = this.state;

    this.setState({
      currentScanMode: type,
      hasMultipleResults: false,
      hasContinuousResults: false,
    });

    switch (type) {
      case 'AUTO_ANALOG_DIGITAL_METER':
        config = AnalogDigitalMeterConfig;
        break;
      case 'DIAL_METER':
        config = DialMeterConfig;
        break;
      case 'SERIAL_NUMBER':
        config = SerialNumberConfig;
        break;
      case 'BARCODE':
        config = BarcodeConfig;
        break;
      case 'BARCODE_CONTINUOUS':
        this.setState({ hasContinuousResults: true });
        config = BarcodeContinuousConfig;
        break;
      case 'BARCODE_PDF417':
        config = BarcodePDF417Config;
        break;
      case 'VIN':
        type = 'ANYLINE_OCR';
        config = VinConfig;
        break;
      case 'TIN_UNIVERSAL':
        type = 'TIRE';
        config = TINUniversalConfig;
        break;
      case 'TIN_DOT':
        type = 'TIRE';
        config = TINDOTConfig;
        break;
      case 'TIRE_MAKE':
        type = 'TIRE';
        config = TireMakeConfig;
        break;
      case 'TIRE_SIZE':
        type = 'TIRE';
        config = TireSizeConfig;
        break;
      case 'COMMERCIAL_TIRE_ID':
        type = 'TIRE';
        config = CommercialTireIdConfig;
        break;
      case 'ODOMETER':
        type = 'ODOMETER';
        config = OdometerConfig;
        break;
      case 'USNR':
        type = 'ANYLINE_OCR';
        config = USNRConfig;
        break;
      case 'SHIPPING_CONTAINER':
        type = 'ANYLINE_OCR';
        config = ShipConConfig;
        break;
      case 'MRZ':
        config = MRZConfig;
        break;
      case 'UNIVERSAL_ID':
        config = UniversalIdConfig;
        break;
      case 'ARABIC_ID':
        config = ArabicIdConfig;
        break;
      case 'CYRILLIC_ID':
        config = CyrillicIdConfig;
        break;
      case 'VRC':
        config = VRCConfig;
        break;
      case 'LICENSE_PLATE_EU':
        config = LicensePlateConfigEU;
        break;
      case 'LICENSE_PLATE_US':
        config = LicensePlateConfigUS;
        break;
      case 'LICENSE_PLATE_AF':
        config = LicensePlateConfigAF;
        break;
      case 'VERTICAL_CONTAINER':
        config = VerticalContainerConfig;
        break;
      case 'SERIAL_SCANNING':
        this.setState({ hasMultipleResults: true });
        config = SerialScanningConfig;
        titles = config.viewPluginCompositeConfig.viewPlugins.map(
          viewPlug => viewPlug.viewPluginConfig.pluginConfig.id
        );
        break;
      case 'PARALLEL_SCANNING':
        this.setState({ hasMultipleResults: true });
        config = ParallelScanningConfig;
        titles = config.viewPluginCompositeConfig.viewPlugins.map(
          viewPlug => viewPlug.viewPluginConfig.pluginConfig.id
        );
        break;
      case 'PARALLEL_FIRST_SCANNING':
        this.setState({ hasMultipleResults: true });
        config = ParallelFirstScanningConfig;
        titles = config.viewPluginCompositeConfig.viewPlugins.map(
          viewPlug => viewPlug.viewPluginConfig.pluginConfig.id
        );
        break;
    }

    // If Title is not set, set it to Type
    if (titles.length === 0) {
      titles = [type];
    }
    this.setState({ titles });
    try {
      const anylineOCRResultEventName = 'onResultCallback';
      const maxContinuousResultCount = 10;
      const continuousResultListener = (response) => {
        console.log(`AnylineOCR.onResult: ` + response);
        if (continuousResults !== "") {
          continuousResults = continuousResults + ", ";
        }
        continuousResults = continuousResults + response;
        continuousCount++;
        if (continuousCount > maxContinuousResultCount) {
          AnylineOCR.tryStopScan(null);
        }
    }

      let continuousResults = "";
      let continuousCount = 0;

      const isInitialized = await AnylineOCR.isInitialized();
      console.log(`AnylineOCR.initialized: ` + isInitialized);
      if (!isInitialized) {
        await AnylineOCR.setupAnylineSDK(demoAppLicenseKey);
      }

      // Set the path to the config folder (relative to the assets' folder)
      AnylineOCR.setViewConfigsPath('config');

      console.log(`AnylineOCR.setupPromise`);
      let result = "";
      if (!this.state.hasContinuousResults) {
        result = await AnylineOCR.setupPromise(
          JSON.stringify(config),
          'scan'
        );
      } else {
        continuousResults = "";
        continuousCount = 0;
        getPlatformEventEmitter().addListener(anylineOCRResultEventName, continuousResultListener);
        result = await AnylineOCR.setupPromiseWithScanCallbackConfig(
            JSON.stringify(config),
            'scan',
            '{ "onResultEventName": "' + anylineOCRResultEventName + '" }'
        );
        result = "[" + continuousResults + "]";
        getPlatformEventEmitter().removeAllListeners(anylineOCRResultEventName)
      }

      console.log('scan result: ' + result);

      this.setState({ buttonsDisabled: false });

      const data = JSON.parse(result);

      LayoutAnimation.easeInEaseOut();

      // If `hasMultipleResults` is not true, data.fullImagePath and data.imagePath
      // will be null. But it's OK - the image results for these will be shown through
      // a different way
      const fullImagePath = data.fullImagePath;
      const imagePath = data.imagePath;

      delete data.fullImagePath;
      delete data.imagePath;

      this.setState({
        hasScanned: true,
        result: data,
        imagePath,
        fullImagePath,
      });
    } catch (error) {
      if (error.message !== 'Canceled') {
        console.log(error.message);
        alert(error);
      }
    }
    this.setState({ buttonsDisabled: false });

    // scroll the page to top.
    scrollRef.current.scrollTo({
      y: 0, animated: false
    });
  };

  get openAnyline() {
    return this._openAnyline;
  }

  set openAnyline(value) {
    this._openAnyline = value;
  }

  emptyResult = () => {
    this.setState({
      hasScanned: false,
      result: {},
      imagePath: '',
      fullImagePath: '',
      titles: [],
    });
  };

  render() {
    const {
      hasScanned,
      result,
      imagePath,
      fullImagePath,
      currentScanMode,
      buttonsDisabled,
      SDKVersion,
      pluginVersion,
      licenseMessage,
      hasMultipleResults,
      hasContinuousResults,
      titles,
    } = this.state;

    BackHandler.addEventListener('hardwareBackPress', () => {
      if (hasScanned) {
        this.emptyResult();
        return true;
      } else {
        BackHandler.exitApp();
      }
    });
    return (
      <ScrollView
        ref={scrollRef}
        style={styles.container}
        contentContainerStyle={styles.ContainerContent}>
        <Text style={styles.headline}>Anyline React-Native Example</Text>
        {hasScanned ? (
          hasMultipleResults || hasContinuousResults ? (
            Object.keys(result).map((key, index) => {
              return (
                <Result
                  key={`ResultView_${index}`}
                  currentScanMode={currentScanMode}
                  result={result[key]}
                  imagePath={result[key].imagePath}
                  fullImagePath={result[key].fullImagePath}
                  data={result}
                  emptyResult={this.emptyResult}
                  hasBackButton={Object.keys(result).length - 1 === index}
                  title={key}
                />
              );
            })

          ) : (
            <Result
              key="ResultView"
              currentScanMode={currentScanMode}
              result={result}
              imagePath={imagePath}
              fullImagePath={fullImagePath}
              data={result}
              emptyResult={this.emptyResult}
              hasBackButton
              title={titles[0]}
            />
          )
        ) : (
          <Overview
            key="OverView"
            updateAnyline={this.updateAnyline}
            disabled={buttonsDisabled}
          />
        )}

        <View style={styles.footer}>
          <Text style={styles.versions}>SDK: {SDKVersion}</Text>
          <Text style={styles.versions}>Plugin: {pluginVersion}</Text>
          {
            (licenseMessage && licenseMessage.length > 0) ?
              <Text key='licenseMessage' style={styles.versions}>
                {licenseMessage}
              </Text>
              : <Text key='licenseMessage' style={styles.versions}>
              </Text>
          }

        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  versions: {
    color: 'white',
    marginVertical: 5,
    marginHorizontal: 40,
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#303030',
  },
  ContainerContent: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headline: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 80,
  },
  footer: {
    marginBottom: 40,
    alignItems: 'center'
  }
});

export default Anyline;
