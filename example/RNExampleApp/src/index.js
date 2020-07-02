import React, {Component} from 'react';
import {
  AppRegistry,
  BackHandler,
  LayoutAnimation,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AnylineOCR from 'anyline-ocr-react-native-module';

import Result from './Result';
import Overview from './Overview';

import BarcodeConfig from '../config/BarcodeConfig';
import BarcodePDF417Config from '../config/Barcode_PDF417Config';
import DocumentConfig from '../config/DocumentConfig';
import MRZConfig from '../config/MRZConfig';
import UniversalIdConfig from '../config/UniversalIdConfig';
import NFCAndMRZConfig from '../config/NFCAndMRZConfig';
import AutoEnergyConfig from '../config/AutoEnergyConfig';
import AnalogEnergyConfig from '../config/AnalogMeterConfig';
import DigitalEnergyConfig from '../config/DigitalMeterConfig';
import DotMatrixConfig from '../config/DotMatrixConfig';
import DialEnergyConfig from '../config/DialMeterConfig';
import IBANConfig from '../config/IbanConfig';
import VoucherConfig from '../config/VoucherConfig';
import DrivingLicenseConfig from '../config/DrivingLicenseConfig';
import LicensePlateConfig from '../config/LicensePlateConfig';
import SerialNumberConfig from '../config/SerialNumber';
import VinConfig from '../config/VINConfig';
import USNRConfig from '../config/USNRConfig';
import ShipConConfig from '../config/ContainerShipConfig';
import CattleTagConfig from '../config/CattleTagConfig';
import GermanIDFrontConfig from '../config/GermanIDFrontConfig';
import VerticalContainerConfig from '../config/VerticalContainerConfig';
import SerialScanningConfig from '../config/SerialScanningConfig';
import ParallelScanningConfig from '../config/ParallelScanningConfig';
import TinConfig from '../config/TINConfig';




// Disable Warnings
console.disableYellowBox = true;

class Anyline extends Component {
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
    this.setState({SDKVersion: SDKVersion});
  };

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  openAnyline = async type => {
    this.setState({buttonsDisabled: true});
    this.setState({titles: []});
    let config;
    let {titles} = this.state;

    this.setState({
      currentScanMode: type,
      hasMultipleResults: false,
    });
    switch (type) {
      case 'AUTO_ANALOG_DIGITAL_METER':
        config = AutoEnergyConfig;
        break;
      case 'DIAL_METER':
        config = DialEnergyConfig;
        break;
      case 'SERIAL_NUMBER':
        config = SerialNumberConfig;
        break;
      case 'DOT_MATRIX_METER':
        config = DotMatrixConfig;
        break;
      case 'BARCODE':
        config = BarcodeConfig;
        break;
      case 'BARCODE_PDF417':
        config = BarcodePDF417Config;
        break;
      case 'IBAN':
        type = 'ANYLINE_OCR';
        config = IBANConfig;
        break;
      case 'VOUCHER':
        type = 'ANYLINE_OCR';
        config = VoucherConfig;
        break;
      case 'DRIVING_LICENSE':
        type = 'ANYLINE_OCR';
        config = DrivingLicenseConfig;
        break;
      case 'VIN':
        type = 'ANYLINE_OCR';
        config = VinConfig;
        break;
      case 'TIN':
        type = 'ANYLINE_OCR';
        config = TinConfig;
        break;
      case 'USNR':
        type = 'ANYLINE_OCR';
        config = USNRConfig;
        break;
      case 'SHIPPING_CONTAINER':
        type = 'ANYLINE_OCR';
        config = ShipConConfig;
        break;
      case 'CATTLE_TAG':
        type = 'ANYLINE_OCR';
        config = CattleTagConfig;
        break;
      case 'MRZ':
        config = MRZConfig;
        break; 
      case 'UNIVERSAL_ID':
        config = UniversalIdConfig;
        break; 
      case 'NFC+MRZ':
        config = NFCAndMRZConfig;
        break;
      case 'GERMAN_ID_FRONT':
        config = GermanIDFrontConfig;
        break;
      case 'LICENSE_PLATE':
        config = LicensePlateConfig;
        break;
      case 'DOCUMENT':
        config = DocumentConfig;
        break;
      case 'ANALOG_METER':
        config = AnalogEnergyConfig;
        break;
      case 'DIGITAL_METER':
        config = DigitalEnergyConfig;
        break;
      case 'VERTICAL_CONTAINER':
        config = VerticalContainerConfig;
        break;
      case 'SERIAL_SCANNING':
        this.setState({hasMultipleResults: true});
        config = SerialScanningConfig;
        titles = config.options.serialViewPluginComposite.viewPlugins.map(
          viewPlug => viewPlug.viewPlugin.plugin.id,
        );
        break;
      case 'PARALLEL_SCANNING':
        this.setState({hasMultipleResults: true});
        config = ParallelScanningConfig;
        titles = config.options.parallelViewPluginComposite.viewPlugins.map(
          viewPlug => viewPlug.viewPlugin.plugin.id,
        );
        break;
    }

    // If Title is not set, set it to Type
    if (titles.length === 0) {
      titles = [type];
    }
    this.setState({titles});
    try {
      const result = await AnylineOCR.setupPromise(
        JSON.stringify(config),
        'scan',
      );

      console.log(result);

      this.setState({buttonsDisabled: false});

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
    this.setState({buttonsDisabled: false});
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
        this.openAnyline(type);
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
        this.openAnyline(type);
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
    console.log(titles);
    return (
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
            openAnyline={this.openAnyline}
            checkCameraPermissionAndOpen={this.checkCameraPermissionAndOpen}
            disabled={buttonsDisabled}
          />
        )}
        <Text style={styles.versions}>SDK Version: {SDKVersion}</Text>
        <Text style={styles.versions}>RN-Build Number: 1</Text>
      </ScrollView>
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
