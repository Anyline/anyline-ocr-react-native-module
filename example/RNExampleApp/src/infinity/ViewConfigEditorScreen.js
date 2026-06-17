// Full-screen JSON editor for creating or customising a ScanView config.
// Schemas are fetched remotely via AJAX. A network connection is required.
// Returns to the caller by calling onSaved(true) when the user saves.

import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';

import { UserConfigStorage } from './userConfigStorage';
import JsonSchemaEditorComponent from './JsonSchemaEditorComponent';

// ─── Remote schema URL ────────────────────────────────────────────────────────

function _schemaBase(pluginVersion) {
  return `https://documentation.anyline.com/react-native-plugin-component/${pluginVersion}/mobile-sdk-common/_attachments/json-schemas`;
}

function _sdkSchema(pluginVersion) {
  return JSON.stringify({ $ref: `${_schemaBase(pluginVersion)}/sdk_config.schema.json` });
}

// ─── ViewConfigEditorScreen ───────────────────────────────────────────────────

export default function ViewConfigEditorScreen({ visible, config, pluginVersion, onSaved, onDismiss }) {
  const [filename, setFilename] = useState(config?.filename?.replace(/\.json$/, '') ?? '');
  const [saveError, setSaveError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const errorShownRef = useRef(false);
  const _onSchemaError = useCallback((message) => {
    if (errorShownRef.current) return;
    errorShownRef.current = true;
    Alert.alert('Network Required', message, [
      { text: 'OK', onPress: () => onDismiss?.() },
    ]);
  }, [onDismiss]);

  // Current JSON value — owned by the WebView editor; we just track the latest.
  const currentJsonRef = useRef(config?.configJson ?? '{}');

  // Keep track of which config was last shown so we can reinitialise when it changes.
  const shownConfigRef = useRef(null);

  function _onShow() {
    setFilename(config?.filename?.replace(/\.json$/, '') ?? '');
    setSaveError(null);
    currentJsonRef.current = config?.configJson ?? '{}';
    shownConfigRef.current = config;
  }

  async function _save() {
    const name = filename.trim();
    if (!name) {
      setSaveError('Please enter a filename.');
      return;
    }

    try {
      JSON.parse(currentJsonRef.current);
    } catch {
      setSaveError('Invalid JSON — please fix syntax errors before saving.');
      return;
    }

    setIsSaving(true);
    setSaveError(null);
    try {
      await UserConfigStorage.save(name, currentJsonRef.current);
      onSaved?.(true);
    } catch (e) {
      setSaveError(`Save failed: ${e?.message ?? e}`);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onDismiss}
      onShow={_onShow}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onDismiss} style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit / Save as</Text>
          <TouchableOpacity
            onPress={_save}
            style={styles.headerButton}
            disabled={isSaving}
          >
            <Text style={[styles.headerButtonText, styles.headerButtonSave]}>
              {isSaving ? 'Saving…' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filename field */}
        <View style={styles.filenameRow}>
          <TextInput
            style={styles.filenameInput}
            value={filename}
            onChangeText={setFilename}
            placeholder="e.g. my_barcode_config"
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.filenameSuffix}>.json</Text>
        </View>

        {saveError != null && (
          <Text style={styles.errorText}>{saveError}</Text>
        )}

        {/* JSON editor — WebView backed by sdk_config.schema.json */}
        <View style={styles.editorContainer}>
          <JsonSchemaEditorComponent
            schemaJson={_sdkSchema(pluginVersion)}
            value={config?.configJson ?? '{}'}
            onChanged={(v) => { currentJsonRef.current = v; }}
            visible={visible}
            onError={_onSchemaError}
          />
        </View>
      </View>
    </Modal>
  );
}

ViewConfigEditorScreen.propTypes = {
  visible: PropTypes.bool.isRequired,
  config: PropTypes.object,
  pluginVersion: PropTypes.string.isRequired,
  onSaved: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
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
  filenameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  filenameInput: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  filenameSuffix: {
    color: '#aaa',
    fontSize: 14,
  },
  errorText: {
    color: '#ef9a9a',
    fontSize: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#2a2a2a',
  },
  editorContainer: {
    flex: 1,
  },
});
