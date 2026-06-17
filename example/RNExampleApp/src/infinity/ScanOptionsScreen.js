// Scan Options screen — lets users configure scan request parameters via schema-driven
// JSON editors backed by the WebView json-editor library.
// Schemas are fetched remotely via AJAX. A network connection is required.
//
// Each tab corresponds to one top-level field of WrapperSessionScanStartRequest:
//   Tab 0 — Scan Result Config (image container mode, parameters, clean strategy)
//   Tab 1 — Platform Options
//   Tab 2 — Initialization Parameters

import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';

import { WrapperSessionScanResultCleanStrategyConfig } from 'anyline-ocr-react-native-module/AnylineInfinityPlugin';
import JsonSchemaEditorComponent from './JsonSchemaEditorComponent';

// ─── Remote schema URLs ──────────────────────────────────────────────────────

function _schemaBase(pluginVersion) {
  return `https://documentation.anyline.com/react-native-plugin-component/${pluginVersion}/mobile-sdk-common/_attachments/json-schemas`;
}

function _remoteRef(base, schemaFile, fragment) {
  const ref = fragment ? `${base}/${schemaFile}${fragment}` : `${base}/${schemaFile}`;
  return JSON.stringify({ $ref: ref });
}

function _buildSchemas(pluginVersion) {
  const base = _schemaBase(pluginVersion);
  return {
    encodedContainer: _remoteRef(base, 'exported_scan_result.schema.json', '#/definitions/exportedScanResultImageContainerEncoded'),
    savedContainer: _remoteRef(base, 'exported_scan_result.schema.json', '#/definitions/exportedScanResultImageContainerSaved'),
    imageParameters: _remoteRef(base, 'exported_scan_result.schema.json', '#/definitions/exportedScanResultImageParameters'),
    cleanStrategy: _remoteRef(base, 'wrapper_session_parameters.schema.json', '#/definitions/wrapperSessionScanResultCleanStrategyConfig'),
    platformOptions: _remoteRef(base, 'wrapper_session_parameters.schema.json', '#/definitions/wrapperSessionScanStartRequest/properties/platformOptions'),
    initParams: _remoteRef(base, 'scanview_initialization_parameters.schema.json'),
  };
}

// ─── ScanOptionsScreen ────────────────────────────────────────────────────────

export default function ScanOptionsScreen({ visible, options, pluginVersion, onSave, onDismiss }) {
  const SCHEMAS = _buildSchemas(pluginVersion);
  // Derive initial state from options prop.
  const initial = options || {};
  const initSrc = initial.scanResultConfig || {};
  const initContainer = initSrc.imageContainer || {};

  const [activeTab, setActiveTab] = useState(0);
  // Lazy-mount: only activate a tab's WebView on first visit to avoid 3 simultaneous loads.
  const [tabActivated, setTabActivated] = useState([true, false, false]);

  const errorShownRef = useRef(false);
  const _onSchemaError = useCallback((message) => {
    if (errorShownRef.current) return;
    errorShownRef.current = true;
    Alert.alert('Network Required', message, [
      { text: 'OK', onPress: () => onDismiss?.() },
    ]);
  }, [onDismiss]);
  const [containerMode, setContainerMode] = useState(
    initContainer.saved !== null && initContainer.saved !== undefined ? 'saved' : 'encoded',
  );

  // All option values stored as JSON strings (matching what the editors emit).
  const [encodedContainerJson, setEncodedContainerJson] = useState(
    JSON.stringify(initContainer.encoded ?? {}),
  );
  const [savedContainerJson, setSavedContainerJson] = useState(
    JSON.stringify(initContainer.saved ?? {}),
  );
  const [imageParametersJson, setImageParametersJson] = useState(
    JSON.stringify(initSrc.imageParameters ?? {}),
  );
  // Clean strategy is a string enum — value must be a JSON string literal (double-encoded).
  const [cleanStrategyJson, setCleanStrategyJson] = useState(
    JSON.stringify(initSrc.cleanStrategy ?? WrapperSessionScanResultCleanStrategyConfig.CleanFolderOnStartScanning),
  );
  const [platformOptionsJson, setPlatformOptionsJson] = useState(
    JSON.stringify(initial.platformOptions ?? {}),
  );
  const [initParamsJson, setInitParamsJson] = useState(
    JSON.stringify(initial.initializationParameters ?? {}),
  );

  // Heights for auto-sized sub-editors in Tab 0.
  const [containerEditorHeight, setContainerEditorHeight] = useState(120);
  const [parametersEditorHeight, setParametersEditorHeight] = useState(120);
  const [cleanStrategyEditorHeight, setCleanStrategyEditorHeight] = useState(80);

  function _handleSave() {
    try {
      const imageContainer =
        containerMode === 'encoded'
          ? { encoded: JSON.parse(encodedContainerJson) }
          : { saved: JSON.parse(savedContainerJson) };
      const imageParameters = JSON.parse(imageParametersJson);
      const cleanStrategy = JSON.parse(cleanStrategyJson); // plain string
      const platformOptions = JSON.parse(platformOptionsJson);
      const initializationParameters = JSON.parse(initParamsJson);

      onSave({
        scanResultConfig: {
          imageContainer,
          imageParameters: Object.keys(imageParameters).length ? imageParameters : undefined,
          cleanStrategy,
        },
        platformOptions: Object.keys(platformOptions).length ? platformOptions : null,
        initializationParameters: Object.keys(initializationParameters).length
          ? initializationParameters
          : null,
      });
    } catch (e) {
      console.warn('Failed to parse scan options, returning unchanged:', e);
      onSave(options); // fallback: return unchanged options
    }
  }

  // ─── Tab 0: Scan Result Config ─────────────────────────────────────────────

  function _renderScanResultConfigTab() {
    return (
      <ScrollView style={styles.tabScrollView} contentContainerStyle={styles.tabScrollContent}>
        {/* Image Container */}
        <Text style={styles.sectionHeader}>Image Container</Text>
        <View style={styles.radioRow}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setContainerMode('encoded')}
          >
            <View style={[styles.radioCircle, containerMode === 'encoded' && styles.radioCircleActive]} />
            <Text style={styles.radioLabel}>Encoded (base64)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setContainerMode('saved')}
          >
            <View style={[styles.radioCircle, containerMode === 'saved' && styles.radioCircleActive]} />
            <Text style={styles.radioLabel}>Saved (to path)</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: containerEditorHeight }}>
          {/* key=containerMode causes editor to remount (new schema + value) on mode change */}
          <JsonSchemaEditorComponent
            key={containerMode}
            schemaJson={containerMode === 'encoded' ? SCHEMAS.encodedContainer : SCHEMAS.savedContainer}
            value={containerMode === 'encoded' ? encodedContainerJson : savedContainerJson}
            onChanged={containerMode === 'encoded' ? setEncodedContainerJson : setSavedContainerJson}
            onHeightChanged={setContainerEditorHeight}
            visible={activeTab === 0}
            onError={_onSchemaError}
          />
        </View>

        {/* Image Parameters */}
        <Text style={styles.sectionHeader}>Image Parameters</Text>
        <View style={{ height: parametersEditorHeight }}>
          <JsonSchemaEditorComponent
            schemaJson={SCHEMAS.imageParameters}
            value={imageParametersJson}
            onChanged={setImageParametersJson}
            onHeightChanged={setParametersEditorHeight}
            visible={activeTab === 0}
            onError={_onSchemaError}
          />
        </View>

        {/* Clean Strategy */}
        <Text style={styles.sectionHeader}>Clean Strategy</Text>
        <View style={{ height: cleanStrategyEditorHeight }}>
          <JsonSchemaEditorComponent
            schemaJson={SCHEMAS.cleanStrategy}
            value={cleanStrategyJson}
            onChanged={setCleanStrategyJson}
            onHeightChanged={setCleanStrategyEditorHeight}
            visible={activeTab === 0}
            onError={_onSchemaError}
          />
        </View>

        <View style={{ height: 16 }} />
      </ScrollView>
    );
  }

  // ─── Tab 1: Platform Options ───────────────────────────────────────────────

  function _renderPlatformOptionsTab() {
    return (
      <JsonSchemaEditorComponent
        schemaJson={SCHEMAS.platformOptions}
        value={platformOptionsJson}
        onChanged={setPlatformOptionsJson}
        visible={activeTab === 1}
        onError={_onSchemaError}
      />
    );
  }

  // ─── Tab 2: Initialization Parameters ─────────────────────────────────────

  function _renderInitParamsTab() {
    return (
      <JsonSchemaEditorComponent
        schemaJson={SCHEMAS.initParams}
        value={initParamsJson}
        onChanged={setInitParamsJson}
        visible={activeTab === 2}
        onError={_onSchemaError}
      />
    );
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  const TAB_LABELS = ['Scan Result Config', 'Platform Options', 'Init Parameters'];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onDismiss}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onDismiss} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Scan Options</Text>
          <TouchableOpacity onPress={_handleSave} style={styles.headerButton}>
            <Text style={[styles.headerButtonText, styles.headerButtonSave]}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Tab bar */}
        <View style={styles.tabBar}>
          {TAB_LABELS.map((label, i) => (
            <TouchableOpacity
              key={label}
              style={[styles.tabItem, activeTab === i && styles.tabItemActive]}
              onPress={() => {
                setActiveTab(i);
                if (!tabActivated[i]) setTabActivated((prev) => { const a = [...prev]; a[i] = true; return a; });
              }}
            >
              <Text
                style={[styles.tabItemText, activeTab === i && styles.tabItemTextActive]}
                numberOfLines={2}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab content — lazy-mount on first visit; keep mounted after to preserve WebView state */}
        <View style={styles.tabContentArea}>
          <View style={[StyleSheet.absoluteFill, activeTab === 0 ? null : styles.tabHidden]} pointerEvents={activeTab === 0 ? 'auto' : 'none'}>
            {tabActivated[0] && _renderScanResultConfigTab()}
          </View>
          <View style={[StyleSheet.absoluteFill, activeTab === 1 ? null : styles.tabHidden]} pointerEvents={activeTab === 1 ? 'auto' : 'none'}>
            {tabActivated[1] && _renderPlatformOptionsTab()}
          </View>
          <View style={[StyleSheet.absoluteFill, activeTab === 2 ? null : styles.tabHidden]} pointerEvents={activeTab === 2 ? 'auto' : 'none'}>
            {tabActivated[2] && _renderInitParamsTab()}
          </View>
        </View>
      </View>
    </Modal>
  );
}

ScanOptionsScreen.propTypes = {
  visible: PropTypes.bool.isRequired,
  options: PropTypes.object.isRequired,
  pluginVersion: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'ios' ? 52 : (StatusBar.currentHeight || 0) + 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  headerButton: {
    minWidth: 60,
  },
  headerButtonText: {
    color: '#90CAF9',
    fontSize: 15,
  },
  headerButtonSave: {
    color: '#0099FF',
    fontWeight: 'bold',
    textAlign: 'right',
  },

  // Tab bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabItemActive: {
    borderBottomColor: '#0099FF',
  },
  tabItemText: {
    fontSize: 11,
    color: '#888',
    textAlign: 'center',
    fontWeight: '500',
  },
  tabItemTextActive: {
    color: '#0099FF',
    fontWeight: '700',
  },

  // Tab content
  tabContentArea: {
    flex: 1,
    position: 'relative',
  },
  // Hidden tabs: moved off-screen but kept mounted to preserve WebView state.
  tabHidden: {
    opacity: 0,
    top: -10000,
  },

  // Tab 0 scroll
  tabScrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabScrollContent: {
    paddingBottom: 16,
  },

  // Section headers (Tab 0)
  sectionHeader: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 4,
    fontSize: 13,
    fontWeight: '700',
    color: '#0099FF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Radio buttons (Tab 0, Image Container mode)
  radioRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#aaa',
    backgroundColor: '#fff',
  },
  radioCircleActive: {
    borderColor: '#0099FF',
    backgroundColor: '#0099FF',
  },
  radioLabel: {
    fontSize: 14,
    color: '#333',
  },
});
