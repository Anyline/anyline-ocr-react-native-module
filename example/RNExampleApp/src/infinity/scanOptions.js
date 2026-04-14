import * as FileSystem from 'expo-file-system';
import {
  WrapperSessionScanResultCleanStrategyConfig,
  ExportedScanResultImageFormat,
} from 'anyline-ocr-react-native-module/AnylineInfinityPlugin';

// The asset path prefix under which all infinity ScanView configs are stored.
// Passed as scanViewConfigPath so the native SDK can resolve relative JSON refs
// (e.g. "dial_meter_config.json" inside a segmentConfig).
export const SCAN_VIEW_CONFIG_PATH = 'anyline_assets/config/infinity';

export const imageContainerEncoded = { encoded: {} };

export function imageContainerSaved(path) {
  return { saved: { path } };
}

// Resolves the platform documents directory to a raw file path (no 'file://' prefix).
// FileSystem.documentDirectory is a synchronous constant.
export function resolveImageSavePath() {
  const dir = FileSystem.documentDirectory;
  if (!dir) return null;
  return dir.replace(/^file:\/\//, '').replace(/\/$/, '') + '/results/';
}

export function defaultScanResultConfig(imageSavePath) {
  return {
    cleanStrategy: WrapperSessionScanResultCleanStrategyConfig.CleanFolderOnStartScanning,
    imageContainer: imageSavePath !== null && imageSavePath !== undefined
      ? imageContainerSaved(imageSavePath)
      : imageContainerEncoded,
    imageParameters: {
      format: ExportedScanResultImageFormat.Png,
      quality: 50,
    },
  };
}

// imageSavePath is resolved synchronously (FileSystem.documentDirectory is a constant).
export function defaultScanOptions() {
  const imageSavePath = resolveImageSavePath();
  return {
    imageSavePath,
    scanResultConfig: defaultScanResultConfig(imageSavePath),
    initializationParameters: null,
    platformOptions: null,
  };
}

// Builds a WrapperSessionScanStartRequest from options + configJson.
export function buildScanStartRequest(options, configJson) {
  return {
    scanViewConfigContentString: configJson,
    scanViewConfigPath: SCAN_VIEW_CONFIG_PATH,
    scanResultConfig: options.scanResultConfig,
    ...(options.initializationParameters
      ? { scanViewInitializationParameters: options.initializationParameters }
      : {}),
    ...(options.platformOptions
      ? { platformOptions: options.platformOptions }
      : {}),
  };
}