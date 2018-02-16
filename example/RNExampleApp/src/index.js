import React, {Component} from 'react';
import {
  AppRegistry,
  BackHandler,
  LayoutAnimation,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  Platform
} from 'react-native';

import AnylineOCR from 'anyline-ocr-react-native-module';

import Result from './Result';
import Overview from './Overview';

import BarcodeConfig from '../config/BarcodeConfig';
import DocumentConfig from '../config/DocumentConfig';
import EnergyConfig from '../config/EnergyConfig';
import MRZConfig from '../config/MRZConfig';
import AutoEnergyConfig from '../config/AutoEnergyConfig';
import IBANConfig from '../config/IbanConfig';
import VoucherConfig from '../config/VoucherConfig';
import DrivingLicenseConfig from '../config/DrivingLicenseConfig';
import LicensePlateConfig from '../config/LicensePlateConfig';
import SerialNumberConfig from '../config/SerialNumber';


class Anyline extends Component {

  state = {
    hasScanned: false,
    result: '',
    imagePath: '',
    fullImagePath: '',
    currentScanMode: '',
    buttonsDisabled: false,
  };

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  openAnyline = async (type) => {

    this.setState({buttonsDisabled: true});
    let config;

    this.setState({
      currentScanMode: type
    });
    switch (type) {
      case 'AUTO_ANALOG_DIGITAL_METER':
        config = AutoEnergyConfig;
        break;
      case 'DIAL_METER':
        config = AutoEnergyConfig;
        break;
      case 'SERIAL_NUMBER':
        config = SerialNumberConfig;
        break;
      case 'DOT_MATRIX_METER':
        config = AutoEnergyConfig;
        break;
      case 'BARCODE':
        config = BarcodeConfig;
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
      case 'MRZ':
        config = MRZConfig;
        break;
      case 'LICENSE_PLATE':
        config = LicensePlateConfig;
        break;
      case 'DOCUMENT':
        config = DocumentConfig;
        break;
      case 'ANALOG_METER':
        config = EnergyConfig;
        break;
      case 'DIGITAL_METER':
      default:
        config = EnergyConfig;
        break;
    }

    // Force set captureResolution to 1080 on iOS @TODO remove, if fixed
    if(Platform.OS === 'ios') {
      config.options.captureResolution = '1080p';
    }


    try {
      const result = await AnylineOCR.setupPromise(JSON.stringify(config), type);

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
        imagePath: imagePath,
        fullImagePath: fullImagePath,
      });
    } catch (error) {
      if (error !== 'Canceled') {
        console.log(error);
      }
    }
    this.setState({buttonsDisabled: false});
  };

  requestCameraPermission = async (type) => {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          'title': 'Anyline Camera Permissions',
          'message': 'Allow Anyline to access you camera?'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission allowed');
        this.openAnyline(type);
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  hasCameraPermission = async () => {
    try {
      return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
    } catch (err) {
      console.warn(err, 'PERMISSION CHECK');
    }
  };

  checkCameraPermissionAndOpen = (type) => {
    this.hasCameraPermission().then((hasCameraPermission) => {
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
      result: '',
      imagePath: '',
      fullImagePath: ''
    });
  };


  render() {

    const {
      hasScanned,
      result,
      imagePath,
      fullImagePath,
      currentScanMode,
      buttonsDisabled
    } = this.state;

    console.log(this.state.buttonsDisabled);

    BackHandler.addEventListener('hardwareBackPress', () => {
      if (hasScanned) {
        this.emptyResult();
        return true;
      } else {
        BackHandler.exitApp();
      }
    });

    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.ContainerContent}>
        <Text style={styles.headline}>Anyline React-Native Example</Text>
        {hasScanned ? (
          <Result
            key="ResultView"
            currentScanMode={currentScanMode}
            result={result}
            imagePath={imagePath}
            fullImagePath={fullImagePath}
            data={result}
            emptyResult={this.emptyResult}
          />
        ) : <Overview key="OverView" openAnyline={this.openAnyline}
                      checkCameraPermissionAndOpen={this.checkCameraPermissionAndOpen}
                      disabled={buttonsDisabled}/>}
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: '#303030'
  },
  ContainerContent: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  headline: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "white",
    marginTop: 50
  }
});

AppRegistry.registerComponent('RNExampleApp', () => Anyline);
