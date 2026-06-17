import React, { useEffect, useRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Alert,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';

import {
  AnylineInfinityPlugin,
  WrapperSessionScanResponseStatus,
} from 'anyline-ocr-react-native-module/AnylineInfinityPlugin';
const { license } = require('../license.js');

import AnylineNativeView from '../AnylineNativeView';
import ConfigBrowser from './ConfigBrowser';
import ResultList from './ResultList';
import ScanOptionsScreen from './ScanOptionsScreen';
import ViewConfigEditorScreen from './ViewConfigEditorScreen';
import ALL_CONFIGS from './configRegistry';
import { GROUP_ORDER } from './pluginTypeHelper';
import { defaultScanOptions, buildScanStartRequest, resolveImageSavePath } from './scanOptions';
import { UserConfigStorage } from './userConfigStorage';
import RNExitApp from 'react-native-exit-app';

// Asset path prefix for custom ML scripts (passed to requestSdkInitialization).
const ASSET_PATH_PREFIX = 'anyline_assets';

// Exits the app on both platforms via react-native-exit-app.
function _exitApp() {
  RNExitApp.exitApp();
}

// ─── MainScanScreen ───────────────────────────────────────────────────────────

export default function MainScanScreen({ onClose }) {
  const plugin = useRef(new AnylineInfinityPlugin()).current;

  const [isInitializing, setIsInitializing] = useState(false);
  const [initError, setInitError] = useState(null);
  const [sdkInitSucceedInfo, setSdkInitSucceedInfo] = useState(null);
  const [pluginVersion, setPluginVersion] = useState('');
  const [sdkVersion, setSdkVersion] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const [useNativeView, setUseNativeView] = useState(false);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [userConfigs, setUserConfigs] = useState([]);

  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState(defaultScanOptions());
  const [modeToast, setModeToast] = useState(null);
  const modeToastTimer = useRef(null);

  const [editConfig, setEditConfig] = useState(null); // config being edited in ViewConfigEditorScreen

  // Build configsByGroup from bundled assets + in-memory user configs.
  const configsByGroup = useMemo(() => {
    const map = {};
    GROUP_ORDER.forEach((g) => { map[g] = []; });
    ALL_CONFIGS.forEach((c) => map[c.group].push(c));
    userConfigs.forEach((c) => map[c.group]?.push({ ...c, source: 'user' }));
    return map;
  }, [userConfigs]);

  useEffect(() => {
    // Version info is independent of SDK init — load immediately.
    setPluginVersion(plugin.getPluginVersion());
    plugin.getSDKVersion().then(setSdkVersion).catch(() => {});

    // --- Anyline: onScanResults ---
    // Subscribe once for the screen lifetime; accumulate results across scans.
    const scanResultsSub = plugin.onScanResults((batch) => {
      setResults((prev) => [...batch.exportedScanResults.toReversed(), ...prev]);
    });

    // --- Anyline: onUIElementClicked ---
    // Fires when the user taps a UI element inside the scan view (e.g. a button).
    // Handle UI element interactions here if needed.
    const uiClickedSub = plugin.onUIElementClicked((_event) => {});

    const backHandler = BackHandler.addEventListener('hardwareBackPress', _onBackPress);

    return () => {
      scanResultsSub.remove();
      uiClickedSub.remove();
      backHandler.remove();
      if (modeToastTimer.current) clearTimeout(modeToastTimer.current);
    };
  }, []);

  useEffect(() => {
    _initializeSdk();
    _loadUserConfigs();
  }, []);

  // ─── Anyline: requestSdkInitialization ───────────────────────────────────────

  async function _initializeSdk() {
    setIsInitializing(true);
    setInitError(null);
    try {
      const response = await plugin.requestSdkInitialization({
        licenseKey: license,
        assetPathPrefix: ASSET_PATH_PREFIX,
      });
      if (response.initialized && response.succeedInfo) {
        setSdkInitSucceedInfo(response.succeedInfo ?? null);
      } else {
        setInitError(response.failInfo?.lastError ?? 'SDK initialization failed.');
      }
    } catch (e) {
      setInitError(e instanceof Error ? e.message : String(e));
    } finally {
      setIsInitializing(false);
    }
  }

  // ─── Anyline: requestScanStart ────────────────────────────────────────────────

  async function _startScanning(config) {
    setIsScanning(true);
    try {
      const request = buildScanStartRequest(options, config.configJson);
      const response = await plugin.requestScanStart(request);
      if (response.status === WrapperSessionScanResponseStatus.ScanFailed && response.failInfo) {
        Alert.alert('Scan Failed', response.failInfo.lastError ?? 'Unknown error');
      }
    } catch (e) {
      Alert.alert('Scan Error', String(e?.message ?? e));
    } finally {
      setIsScanning(false);
    }
  }

  // ─── Anyline: requestScanStop ─────────────────────────────────────────────────

  function _stopScanning() {
    plugin.requestScanStop();
  }

  // ─── Anyline: requestScanSwitchWithScanStartRequestParams ────────────────────

  function _switchScanning(config) {
    plugin.requestScanSwitchWithScanStartRequestParams(buildScanStartRequest(options, config.configJson));
  }

  function _onConfigTap(config) {
    if (isScanning) {
      _switchScanning(config);
    } else {
      _startScanning(config);
    }
  }

  function _onBackPress() {
    if (isScanning) { _stopScanning(); }
    else if (showOptions) { setShowOptions(false); }
    else if (editConfig) { setEditConfig(null); }
    else if (onClose) { onClose(); }
    else { _exitApp(); }
    return true;
  }

  function _toggleMode() {
    if (isScanning) return;
    const next = !useNativeView;
    setUseNativeView(next);
    const message = next
      ? 'Native View: camera renders inside the app'
      : 'New Screen: SDK opens its own fullscreen UI';
    if (modeToastTimer.current) clearTimeout(modeToastTimer.current);
    setModeToast(message);
    modeToastTimer.current = setTimeout(() => setModeToast(null), 2000);
  }

  function _showInfo() {
    const initInfo = JSON.stringify(sdkInitSucceedInfo ?? {}, null, 2);
    Alert.alert(
      'Info',
      `Plugin version: ${pluginVersion || '…'}\nSDK version: ${sdkVersion || '…'}\n\nSDK init info:\n${initInfo}`,
    );
  }

  async function _loadUserConfigs() {
    const configs = await UserConfigStorage.list();
    setUserConfigs(configs);
  }

  function _onSaveOptions(updatedOptions) {
    const savedPath = updatedOptions.scanResultConfig?.imageContainer?.saved?.path;
    if (savedPath !== null && savedPath !== undefined && savedPath === '') {
      const defaultPath = resolveImageSavePath();
      if (defaultPath) { updatedOptions.scanResultConfig.imageContainer.saved.path = defaultPath; }
    }
    setOptions(updatedOptions);
    setShowOptions(false);
  }

  function _onEditSaveAs(config) {
    setEditConfig(config);
  }

  function _onDeleteUserConfig(config) {
    Alert.alert(
      'Delete config',
      `Delete "${config.label}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            UserConfigStorage.delete(config.filename).then(_loadUserConfigs).catch(() => {});
          },
        },
      ],
    );
  }

  function _onConfigSaved() {
    setEditConfig(null);
    _loadUserConfigs().catch(() => {});
  }

  // ─── Render ──────────────────────────────────────────────────────────────────

  const content = (
    <View style={styles.container}>
      {/* ── Toolbar ─────────────────────────────────────────────────── */}
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.backButton} onPress={() => { if (!isScanning) { if (onClose) { onClose(); } else { _exitApp(); } } }}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <Text style={styles.toolbarTitle}>Infinity Examples</Text>

        <View style={styles.toolbarActions}>
          <TouchableOpacity
            style={[styles.toolbarIconButton, isScanning && styles.toolbarIconButtonDisabled]}
            onPress={_toggleMode}
          >
            <Text style={styles.toolbarIconText}>{useNativeView ? '⧉' : '⤢'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toolbarIconButton, isScanning && styles.toolbarIconButtonDisabled]}
            onPress={() => { if (!isScanning) setShowOptions(true); }}
          >
            <Text style={styles.toolbarIconText}>⚙</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolbarIconButton} onPress={_showInfo}>
            <Text style={styles.toolbarIconText}>ⓘ</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Config browser (group tabs + animated chip row) ─────────── */}
      <ConfigBrowser
        configsByGroup={configsByGroup}
        activeGroupIndex={activeGroupIndex}
        onGroupChange={setActiveGroupIndex}
        onConfigTap={_onConfigTap}
        onEditSaveAs={_onEditSaveAs}
        onDelete={_onDeleteUserConfig}
        isScanning={isScanning}
      />

      {/* ── Content area (NativeView + Result list) ──────────────────── */}
      {useNativeView ? (
        <View style={styles.content}>
          {/* AnylineNativeView always in tree — flex adjusts with scanning state */}
          <View style={[styles.nativeViewWrapper, { flex: isScanning ? 2 : 1 }]}>
            <AnylineNativeView style={styles.nativeView} viewId="infinity-scan-view" />
          </View>
          <View style={styles.resultListWrapper}>
            <ResultList
              results={results}
              isScanning={isScanning}
              plugin={plugin}
              onStop={_stopScanning}
            />
          </View>
        </View>
      ) : (
        <View style={styles.resultListFull}>
          <ResultList
            results={results}
            isScanning={isScanning}
            plugin={plugin}
            onStop={_stopScanning}
          />
        </View>
      )}

      {/* ── SDK loading overlay ──────────────────────────────────────── */}
      {isInitializing && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Initializing SDK…</Text>
        </View>
      )}

      {/* ── SDK error overlay ────────────────────────────────────────── */}
      {!isInitializing && initError && (
        <View style={styles.overlay}>
          <Text style={styles.overlayTitle}>SDK Initialization Failed</Text>
          <Text style={styles.overlayError}>{initError}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={_initializeSdk}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ── Modals ──────────────────────────────────────────────────── */}
      {/* Conditional rendering remounts each screen on every open (fresh state + WebView). */}
      {showOptions && (
        <ScanOptionsScreen
          visible
          options={options}
          pluginVersion={pluginVersion}
          onSave={_onSaveOptions}
          onDismiss={() => setShowOptions(false)}
        />
      )}

      {editConfig != null && (
        <ViewConfigEditorScreen
          visible
          config={editConfig}
          pluginVersion={pluginVersion}
          onSaved={_onConfigSaved}
          onDismiss={() => setEditConfig(null)}
        />
      )}

      {/* ── Mode toast (auto-dismisses after 2s) ── */}
      {modeToast && (
        <View style={styles.toast} pointerEvents="none">
          <Text style={styles.toastText}>{modeToast}</Text>
        </View>
      )}
    </View>
  );

  return content;
}

MainScanScreen.propTypes = {
  onClose: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
  },

  // Toolbar
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 8,
    paddingVertical: 8,
    paddingTop: Platform.OS === 'ios' ? 52 : (StatusBar.currentHeight || 0) + 8,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  toolbarTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  toolbarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  toolbarIconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#0099FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbarIconButtonDisabled: {
    opacity: 0.4,
  },
  toolbarIconText: {
    color: '#0099FF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Content area
  content: {
    flex: 1,
  },
  nativeViewWrapper: {
    overflow: 'hidden',
  },
  nativeView: {
    flex: 1,
  },
  resultListWrapper: {
    flex: 1,
  },
  resultListFull: {
    flex: 1,
  },

  // SDK overlay (init + error)
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  overlayText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  overlayTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  overlayError: {
    color: '#ef9a9a',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#0099FF',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 6,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  toast: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: '#323232',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  toastText: {
    color: '#fff',
    fontSize: 14,
  },
});