import React, { Component } from 'react';
import {
  AppRegistry,
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

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this.openOCR}>Open OCR reader.</Text>
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
