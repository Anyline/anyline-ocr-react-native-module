import React, { Component } from 'react';
import {
  AppRegistry,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AnylineOCR from 'anyline-ocr-react-native-module';

import config from '../config';

class Anyline extends Component {

  openOCR = () => {
    AnylineOCR.setupScanViewWithConfigJson(JSON.stringify(config), 'ANALOG_METER', () => {}, () => {});
  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestPermission(
        PermissionsAndroid.PERMISSIONS.CAMERA
      )
      if (granted) {
        console.log('Camera permission allowed');
        this.openOCR();
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  hasCameraPermission = async () => {
    try {
      const result = await PermissionsAndroid.checkPermission(
        PermissionsAndroid.PERMISSIONS.CAMERA);
      return result;
    } catch (err) {
      console.warn(err);
    }
  }

  checkCameraPermissionAndOpen = () => {
    this.hasCameraPermission().then((hasCameraPermission) => {
      console.log('hasCameraPermission result is ' + hasCameraPermission);
      if (hasCameraPermission) {
        console.log('Opening OCR directly');
        this.openOCR();
      } else {
        this.requestCameraPermission();
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this.checkCameraPermissionAndOpen}>Open OCR reader.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('Anyline', () => Anyline);
