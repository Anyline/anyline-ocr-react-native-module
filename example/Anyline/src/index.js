import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AnylineOCR from 'anyline-ocr-react-native-module';

class Anyline extends Component {
  componentWillMount() {
    console.log(AnylineOCR)
  }

  openOCR = () => {

    // AnylineOCR.setupScanViewWithConfigJson(this.props.config, this.props.scanMode, this.props.onResult, this.props.onError);
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
