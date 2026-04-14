import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import LegacyAnyline from './legacy/LegacyAnyline';
import MainScanScreen from './infinity/MainScanScreen';

class App extends Component {

  state = {
    showLegacy: false,
    showInfinity: false,
  };

  render() {
    if (this.state.showLegacy) {
      return <LegacyAnyline />;
    }

    if (this.state.showInfinity) {
      return <MainScanScreen />;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Anyline React Native</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.setState({ showInfinity: true })}
        >
          <Text style={styles.buttonText}>Infinity Plugin Examples</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => this.setState({ showLegacy: true })}
        >
          <Text style={styles.buttonText}>Legacy Plugin Examples</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#0099FF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    width: 260,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;