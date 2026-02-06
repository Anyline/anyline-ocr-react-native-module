import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    Platform,
    requireNativeComponent, NativeEventEmitter, NativeModules, DeviceEventEmitter, BackHandler,
} from 'react-native';

import AnylineOCR from 'anyline-ocr-react-native-module';

import NativeViewBarcodeConfig from '../assets/config/NativeViewBarcodeConfig.json';
import NativeViewDrivingLicenseConfig from '../assets/config/NativeViewDrivingLicenseConfig.json';
import NativeViewVINConfig from '../assets/config/NativeViewVINConfig.json';

// Register the native view component once at module level
const AnylineNativeView = requireNativeComponent('AnylineNativeView');

const platformEventEmitter = Platform.select({
    ios: new NativeEventEmitter(NativeModules),
    android: DeviceEventEmitter,
});

class Result {
    title;
    data;
    imagePath;
    fullImagePath;
}

class NativeViewScan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isScanning: false,
      selectedScanMode: null,
      scanResults: [],
    };

    // Available scan modes for the segmented buttons
    this.availableScanModes = [
      { id: 'NativeViewBarcode', label: 'Barcode', content: NativeViewBarcodeConfig },
      { id: 'NativeViewDrivingLicense', label: 'Driving License', content: NativeViewDrivingLicenseConfig },
      { id: 'NativeViewVIN', label: 'VIN', content: NativeViewVINConfig },
    ];

    // Native event constants
    this.NATIVE_METHOD_ON_RESULT_EVENT = 'NATIVE_METHOD_ON_RESULT_EVENT';
    this.NATIVE_METHOD_ON_UI_ELEMENT_CLICKED = 'NATIVE_METHOD_ON_UI_ELEMENT_CLICKED';
  }

  componentDidMount() {
    this._onClose = this.props.onClose

    this._setupNativeEventListeners();
  }

  componentWillUnmount() {
    // Clean up: stop scanning if active
    if (this.state.isScanning) {
      this._stopScanning();
    }

    this._removeNativeEventListeners();
  }

  _setupNativeEventListeners() {
    platformEventEmitter.addListener(this.NATIVE_METHOD_ON_RESULT_EVENT, this._handleScanResult);
    platformEventEmitter.addListener(this.NATIVE_METHOD_ON_UI_ELEMENT_CLICKED, this._handleUIElementClick);

    BackHandler.addEventListener('hardwareBackPress', this._onBackPress);
  }

  _removeNativeEventListeners() {
    platformEventEmitter.removeAllListeners(this._handleScanResult);
    platformEventEmitter.removeAllListeners(this._handleUIElementClick);

    BackHandler.removeEventListener('hardwareBackPress', this._onBackPress);
  }

  _onScanModeSelected = async (scanMode) => {
    this.setState({ selectedScanMode: scanMode });

    if (this.state.isScanning) {
      console.log('Switching scan mode to:', scanMode.label);
      AnylineOCR.trySwitchScan(JSON.stringify(scanMode.content))
    } else {
      console.log('Starting scan mode:', scanMode.label);
      await this._startScanning(scanMode.content)
    }
  };

  _startScanning = async (configJson) => {
    this.setState({ isScanning: true });

      try {
        let promiseResult = await AnylineOCR.setupPromiseWithScanCallbackConfig(
          JSON.stringify(configJson),
          'scan',
          '{ "onResultEventName": "' + this.NATIVE_METHOD_ON_RESULT_EVENT + '" }'
        );
        console.log('promiseResult', promiseResult);
      } catch (error) {
        if (error.message !== 'Canceled') {
          console.log(error.message);
          alert(error);
        }
      } finally {
        this.setState({
          isScanning: false,
          selectedScanMode: null,
        });
      }
  };

  _stopScanning = () => {
    AnylineOCR.tryStopScan(null);

    this.setState({
      isScanning: false,
      selectedScanMode: null,
    });

    console.log('Stopped scanning');
  };

  _handleScanResult = (result) => {
    console.log('_handleScanResult: ', result);
    const data = JSON.parse(result);

    const newResults = [];
    const newResult = new Result();
    newResult.title = this.state.selectedScanMode?.label;
    newResult.data = data;
    newResult.imagePath = data.imagePath;
    newResult.fullImagePath = data.fullImagePath;

    newResults.push(newResult);

    this.setState(prevState => ({
      scanResults: [...newResults, ...prevState.scanResults]
    }));
  };

  _handleUIElementClick = (element) => {
    console.log('UI Element clicked:', element);
  };

  _clearResults = () => {
    this.setState({ scanResults: [] });
  };

  _onBackPress = () => {
    if (this.state.isScanning) {
      // If currently scanning, stop scanning first
      this._stopScanning();
      return true; // Prevent back navigation
    }
    return false; // Allow back navigation
  };

  _renderScanModeSelector = () => {
    return (
      <View style={styles.scanModeContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scanModeScrollContent}
        >
          {this.availableScanModes.map((scanMode, index) => {
            const isSelected = this.state.selectedScanMode?.id === scanMode.id;

            return (
              <TouchableOpacity
                key={scanMode.id}
                style={[
                  styles.scanModeChip,
                  isSelected && styles.scanModeChipSelected,
                ]}
                onPress={() => this._onScanModeSelected(scanMode)}
              >
                <Text
                  style={[
                    styles.scanModeLabel,
                    isSelected && styles.scanModeLabelSelected,
                  ]}
                >
                  {scanMode.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  _renderNativeView = () => {
    return (
      <View style={styles.nativeViewContainer}>
        <AnylineNativeView
          style={styles.nativeView}
          viewId="scan-view-container-id"
        />
      </View>
    );
  };

  _renderScanResultsSheet = () => {
    const { isScanning, scanResults } = this.state;

    if (scanResults.length === 0) {
      return (
        <View style={[
          styles.resultsContainer,
          isScanning ? styles.resultsContainerScanning : styles.resultsContainerExpanded,
        ]}>
          <View style={styles.emptyResultsContainer}>
            <Text style={styles.emptyResultsText}>No scan results yet</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={[
        styles.resultsContainer,
        isScanning ? styles.resultsContainerScanning : styles.resultsContainerExpanded,
      ]}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsHeaderTitle}>
            Scan Results ({scanResults.length})
          </Text>
          <TouchableOpacity onPress={this._clearResults}>
            <Text style={styles.clearButton}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.resultsScrollContent}
        >
          {scanResults.map((result, index) => this._renderResultCard(result, index))}
        </ScrollView>
      </View>
    );
  };

  _renderResultCard = (result, index) => {
    const { isScanning } = this.state;

    // Use larger card when not scanning (expanded view)
    const cardWidth = isScanning ? 150 : 200;
    const imageHeight = isScanning ? 40 : 150;
    const labelFontSize = isScanning ? 10 : 14;
    const resultFontSize = isScanning ? 9 : 12;

    return (
      <View key={index} style={[styles.resultCard, { width: cardWidth }]}>
        {/* Image preview */}
        <View style={[styles.resultImageContainer, { height: imageHeight }]}>
          <Image
            source={{ uri: `file://${result.imagePath}` }}
            style={styles.resultImage}
            resizeMode="contain"
            onError={() => console.log('Image load error')}
          />
        </View>

        {/* Result info */}
        <Text
          style={[styles.resultLabel, { fontSize: labelFontSize }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {result.title}
        </Text>

        <ScrollView style={styles.resultTextContainer}>
          <Text style={[styles.resultText, { fontSize: resultFontSize }]}>
              { JSON.stringify(result.data, ' ', 2) }
          </Text>
        </ScrollView>
      </View>
    );
  };

  render() {
    const { isScanning } = this.state;

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              if (!this._onBackPress()) {
                // Navigate back
                this._onClose()
              }
            }}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>NativeView Scan</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Top segmented button bar (horizontally scrollable) */}
        {this._renderScanModeSelector()}

        {/* Native view area */}
        <View style={[
          styles.nativeViewWrapper,
          { flex: isScanning ? 5 : 1 },
        ]}>
          {this._renderNativeView()}
        </View>

        {/* Bottom sheet for scan results (horizontally scrollable) */}
        <View style={[
          styles.resultsWrapper,
          isScanning ? {} : { flex: 4 },
        ]}>
          {this._renderScanResultsSheet()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Header styles
  header: {
    height: 60,
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        paddingTop: 44,
        height: 104,
      },
    }),
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: 44, // Same as back button to center the title
  },

  // Scan mode selector styles
  scanModeContainer: {
    height: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  scanModeScrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  scanModeChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  scanModeChipSelected: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  scanModeLabel: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'normal',
  },
  scanModeLabelSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Native view styles
  nativeViewWrapper: {
    overflow: 'hidden',
  },
  nativeViewContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  nativeView: {
    flex: 1,
  },
  nativeViewPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  nativeViewPlaceholderText: {
    color: '#fff',
    fontSize: 16,
  },

  // Results container styles
  resultsWrapper: {
    overflow: 'hidden',
  },
  resultsContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#bdbdbd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  resultsContainerScanning: {
    height: 120,
  },
  resultsContainerExpanded: {
    flex: 1,
  },
  emptyResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  emptyResultsText: {
    color: '#9e9e9e',
    fontSize: 14,
  },

  // Results header styles
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    color: '#2196F3',
    fontSize: 14,
  },

  // Results scroll styles
  resultsScrollContent: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },

  // Result card styles
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resultImageContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  resultImage: {
    flex: 1,
    width: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 32,
  },
  resultLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  resultTextContainer: {
    flex: 1,
  },
  resultText: {
    color: '#757575',
  },
});

NativeViewScan.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default NativeViewScan;