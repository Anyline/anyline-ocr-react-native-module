// WebView-based JSON editor driven by a JSON schema.
//
// Mirrors Flutter's JsonSchemaEditorWidget. Loads json-editor.html from the native
// asset bundle and communicates via the ReactNativeWebView message bridge.
// json-editor.html is patched by update_anyline-mobile-sdk-resources.sh during sync:
// {{PLACEHOLDER}} markers are replaced with <link>/<script src> references so the
// file loads adjacent CSS/JS by relative path from the native bundle.
//
// Message envelope format (from json-editor-rn.html):
//   { type: 'ready', payload: '<scrollHeight>' }  — editor finished rendering
//   { type: 'value', payload: '<jsonString>' }     — value changed (valid only)
//
// Props:
//   schemaJson       {string}   — JSON schema as a string
//   value            {string}   — initial value as a JSON string (e.g. '{"key":1}' or '"enumVal"')
//   onChanged        {function} — called with the new JSON string on every valid change
//   visible          {boolean}  — when false, defers data injection until true (default true)
//   onHeightChanged  {function} — when provided, the component auto-sizes to content height
//                                 and calls this with the new height in points

import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';

// Resolved synchronously at module load — no async needed.
//
// Android: file:///android_asset/ maps to android/app/src/main/assets/ (populated
//          by withAssetCopy.js during expo prebuild).
//
// iOS: FileSystem.bundleDirectory points to the .app bundle root. withAssetCopy.js
//      adds an Xcode build phase that copies assets/* into the bundle root, so
//      anyline_assets/ is a direct child of the bundle.
const _HTML_PATH = 'anyline_assets/json_schema_editor/json-editor.html';
const _SOURCE = Platform.OS === 'android'
  ? { uri: `file:///android_asset/${_HTML_PATH}` }
  : { uri: `${FileSystem.bundleDirectory}${_HTML_PATH}` };

export default function JsonSchemaEditorComponent({
  schemaJson,
  value,
  onChanged,
  visible = true,
  onHeightChanged,
  onError,
}) {
  const webViewRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Track state in refs to avoid stale-closure issues in callbacks.
  const pageLoadedRef = useRef(false);
  const dataInjectedRef = useRef(false);
  const visibleRef = useRef(visible);

  useEffect(() => {
    visibleRef.current = visible;
    // Inject when becoming visible for the first time.
    if (visible && pageLoadedRef.current && !dataInjectedRef.current) {
      _injectData();
    }
  }, [visible]);

  function _injectData() {
    if (!webViewRef.current) return;
    // json.encode equivalent: JSON.stringify wraps the string in quotes and escapes it,
    // so loadData() receives a JS string literal and calls JSON.parse() internally.
    const schemaArg = JSON.stringify(schemaJson);
    const valueArg = JSON.stringify(value);
    webViewRef.current.injectJavaScript(
      `loadData(${schemaArg}, ${valueArg}, true, false); true;`,
    );
    dataInjectedRef.current = true;
  }

  function _onLoadEnd() {
    pageLoadedRef.current = true;
    if (visibleRef.current && !dataInjectedRef.current) {
      _injectData();
    }
  }

  function _onMessage(event) {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      if (msg.type === 'ready') {
        const height = Number.parseFloat(msg.payload);
        if (!Number.isNaN(height)) onHeightChanged?.(height);
        setIsLoading(false);
      } else if (msg.type === 'value') {
        onChanged?.(msg.payload);
      } else if (msg.type === 'error') {
        onError?.(msg.payload);
      }
    } catch (e) {
      console.warn('Failed to parse WebView message:', e);
    }
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <WebView
        ref={webViewRef}
        source={_SOURCE}
        originWhitelist={['*']}
        javaScriptEnabled
        // Allow file:// pages to load adjacent file:// resources (Android).
        allowFileAccess
        allowFileAccessFromFileURLs
        onLoadEnd={_onLoadEnd}
        onMessage={_onMessage}
        // When parent handles scrolling (auto-size mode), disable WebView's own scroll.
        scrollEnabled={onHeightChanged == null}
        style={styles.webView}
      />
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color="#0099FF" />
        </View>
      )}
    </View>
  );
}

JsonSchemaEditorComponent.propTypes = {
  schemaJson: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChanged: PropTypes.func,
  visible: PropTypes.bool,
  onHeightChanged: PropTypes.func,
  onError: PropTypes.func,
};

const styles = StyleSheet.create({
  webView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
