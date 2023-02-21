import React, { Component } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import {
  BackHandler,
  LayoutAnimation,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import AnylineOCR from 'anyline-ocr-react-native-module';

import Result from './Result';
import Overview from './Overview';

import BarcodeConfig from '../config/BarcodeConfig';
import BarcodePDF417Config from '../config/Barcode_PDF417Config';
import MRZConfig from '../config/MRZConfig';
import NFCMRZConfig from '../config/NFCMRZConfig';
import UniversalIdConfig from '../config/UniversalIdConfig';
import ArabicIdConfig from '../config/ArabicIdConfig';
import CyrillicIdConfig from '../config/CyrillicIdConfig';
import AnalogDigitalMeterConfig from '../config/AnalogDigitalMeterConfig';
import LicensePlateConfig from '../config/LicensePlateConfig';
import SerialNumberConfig from '../config/SerialNumber';
import VinConfig from '../config/VINConfig';
import USNRConfig from '../config/USNRConfig';
import ShipConConfig from '../config/ContainerShipConfig';
import VerticalContainerConfig from '../config/VerticalContainerConfig';
import SerialScanningConfig from '../config/SerialScanningConfig';
import ParallelScanningConfig from '../config/ParallelScanningConfig';
import TinConfig from '../config/TINConfig';
import TireSizeConfig from '../config/TireSizeConfig';
import CommercialTireIdConfig from '../config/CommercialTireIdConfig';
import OtaConfig from '../config/OtaConfig';
import { DeviceEventEmitter } from 'react-native';
import { Platform } from 'react-native';
import VRCConfig from '../config/VRCConfig';

// Disable Warnings
console.disableYellowBox = true;

class Anyline extends Component {
  overTheAirUpdateIsEnabled = false;

  state = {
    hasScanned: false,
    result: '',
    imagePath: '',
    fullImagePath: '',
    currentScanMode: '',
    buttonsDisabled: false,
    SDKVersion: '',
    hasMultipleResults: false,
    titles: [],
  };
  componentDidMount = async () => {
    const SDKVersion = await AnylineOCR.getSDKVersion();
    this.setState({ SDKVersion: SDKVersion });
  };

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  updateAnyline = async type => {
    if (Platform.OS === 'android' && this.overTheAirUpdateIsEnabled == true) {
      let otaConfig = OtaConfig;

      AnylineOCR.initSdk(otaConfig.license);
      const onSessionConnect = (event) => {
        console.log(event.progress);
      };
      DeviceEventEmitter.addListener('ota_progress_update_event', onSessionConnect);
      AnylineOCR.update(
        JSON.stringify(otaConfig),
        (message) => {
          console.log(`Error: ${message}`);
        },
        () => {
          console.log(`DONE`);
          this.openAnyline(type)
        }
      )
    } else {
      this.openAnyline(type);
    }
  };

  openAnyline = async type => {
    this.setState({ buttonsDisabled: true });
    this.setState({ titles: [] });
    let config;
    let { titles } = this.state;

    this.setState({
      currentScanMode: type,
      hasMultipleResults: false,
    });

    switch (type) {
      case 'AUTO_ANALOG_DIGITAL_METER':
        config = AnalogDigitalMeterConfig;
        break;
      case 'SERIAL_NUMBER':
        config = SerialNumberConfig;
        break;
      case 'BARCODE':
        config = BarcodeConfig;
        break;
      case 'BARCODE_PDF417':
        config = BarcodePDF417Config;
        break;
      case 'VIN':
        type = 'ANYLINE_OCR';
        config = VinConfig;
        break;
      case 'TIN':
        type = 'TIRE';
        config = TinConfig;
        break;
      case 'TIRE_SIZE':
        type = 'TIRE';
        config = TireSizeConfig;
        break;
      case 'COMMERCIAL_TIRE_ID':
        type = 'TIRE';
        config = CommercialTireIdConfig;
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
      case 'NFC+MRZ':
        config = NFCMRZConfig;
        break;
      case 'VRC':
        config = VRCConfig;
        break;
      case 'LICENSE_PLATE':
        config = LicensePlateConfig;
        break;
      case 'VERTICAL_CONTAINER':
        config = VerticalContainerConfig;
        break;
      case 'SERIAL_SCANNING':
        this.setState({ hasMultipleResults: true });
        config = SerialScanningConfig;
        titles = config.viewPluginCompositeConfig.viewPlugins.map(
          viewPlug => viewPlug.viewPluginConfig.pluginConfig.id,
        );
        break;
      case 'PARALLEL_SCANNING':
        this.setState({ hasMultipleResults: true });
        config = ParallelScanningConfig;
        titles = config.viewPluginCompositeConfig.viewPlugins.map(
          viewPlug => viewPlug.viewPluginConfig.pluginConfig.id,
        );
        break;
    }

    // If Title is not set, set it to Type
    if (titles.length === 0) {
      titles = [type];
    }
    this.setState({ titles });
    try {
      console.log(`AnylineOCR.setupPromise`);
      const result = await AnylineOCR.setupPromise(
        JSON.stringify(config),
        'scan',
      );

      console.log(result);

      this.setState({ buttonsDisabled: false });

      const data = JSON.parse(result);
      LayoutAnimation.easeInEaseOut();
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
        alert(error)
      }
    }
    this.setState({ buttonsDisabled: false });
  };

  requestCameraPermission = async type => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Anyline Camera Permissions',
          message: 'Allow Anyline to access your camera?',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission allowed');
        this.updateAnyline(type);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  hasCameraPermission = async () => {
    try {
      return await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
    } catch (err) {
      console.warn(err, 'PERMISSION CHECK');
    }
  };

  checkCameraPermissionAndOpen = type => {
    this.hasCameraPermission().then(hasCameraPermission => {
      console.log('hasCameraPermission result is ' + hasCameraPermission);
      if (hasCameraPermission) {
        console.log('Opening OCR directly');
        this.updateAnyline(type);
      } else {
        this.requestCameraPermission(type);
      }
    });
  };

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
      hasMultipleResults,
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
      // <SafeAreaProvider>
      //   <SafeAreaView style={{ flex: 1, backgroundColor: styles.container.backgroundColor }}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.ContainerContent}>
            <Text style={styles.headline}>Anyline React-Native Example</Text>
            {hasScanned ? (
              hasMultipleResults ? (
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
                checkCameraPermissionAndOpen={this.checkCameraPermissionAndOpen}
                disabled={buttonsDisabled}
              />
            )}
            <Text style={styles.versions}>SDK Version: {SDKVersion}</Text>
            <Text style={styles.versions}>RN-Build Number: 1</Text>
          </ScrollView>
      //   </SafeAreaView>
      // </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  versions: {
    color: 'white',
    marginTop: 10,
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
    marginTop: 50,
  },
});

export default Anyline;