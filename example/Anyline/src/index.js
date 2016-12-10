import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AnylineOCR from 'anyline-ocr-react-native-module';

import Result from './Result';

import config from '../config';

class Anyline extends Component {

  state = {
    hasScanned: false,
    result: '',
    imagePath: '',
    fullImagePath: '',
    barcode: '',
    scanMode: '',
    meterType: '',
    cutoutBase64: '',
    fullImageBase64: '',
  }

  openOCR = () => {
    AnylineOCR.setupScanViewWithConfigJson(
      JSON.stringify(config),
      'ANALOG_METER',
      this.onResult,
      this.onError,
    );
  }

  onResult = (dataString) => {
    const data = JSON.parse(dataString);

    this.setState({
      hasScanned: true,
      result: data.reading,
      imagePath: data.imagePath,
      fullImagePath: data.fullImagePath,
      scanMode: data.scanMode,
      meterType: data.meterType,
      cutoutBase64: data.cutoutBase64,
      fullImageBase64: data.fullImageBase64,
    });
  };

  onError = (error) => {
    alert(error);
  };

  render() {
    const {
      hasScanned,
      result,
      imagePath,
      fullImagePath,
      barcode,
      scanMode,
      meterType,
      cutoutBase64,
      fullImageBase64,
    } = this.state;

    return (
      <View style={styles.container}>
        {hasScanned ? (
          <Result
            result={result}
            imagePath={imagePath}
            fullImagePath={fullImagePath}
            barcode={barcode}
            scanMode={scanMode}
            meterType={meterType}
            cutoutBase64={cutoutBase64}
            fullImageBase64={fullImageBase64}
          />
        ) : (
          <Text onPress={this.openOCR}>Open OCR reader.</Text>
        )}
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
