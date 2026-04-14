import { NativeModules, NativeEventEmitter, EmitterSubscription } from 'react-native';
import { version as pluginVersion } from './package.json';
import {
  WrapperSessionSdkInitializationRequest,
  WrapperSessionSdkInitializationResponse,
  WrapperSessionScanStartRequest,
  WrapperSessionScanResponse,
  WrapperSessionScanResultsResponse,
  WrapperSessionScanStopRequest,
  WrapperSessionUcrReportRequest,
  WrapperSessionUcrReportResponse,
  WrapperSessionExportCachedEventsResponse,
} from './types/wrapper_session_parameters';
import { UiFeedbackElementConfig } from './types/sdk_config';

export * from './types/wrapper_session_parameters';
export * from './types/sdk_config';

const MODULE_NAME = 'AnylineInfinityPlugin';
const EVENT_ON_SCAN_RESULTS = 'INFINITY_ON_SCAN_RESULTS';
const EVENT_ON_UI_ELEMENT_CLICKED = 'INFINITY_ON_UI_ELEMENT_CLICKED';

const nativeModule = NativeModules[MODULE_NAME];
const emitter = new NativeEventEmitter(nativeModule);

let _sessionReady = false;

function _setupWrapperSessionOnce(): void {
    if (_sessionReady) return;
    _sessionReady = true;
    nativeModule.setupWrapperSession(pluginVersion);
}

/// Entrypoint for the Anyline Infinity scanning API.
///
/// Exposes a typed, schema-driven interface that mirrors WrapperSessionProvider
/// directly. JSON serialization/deserialization is handled in this TypeScript
/// layer; the native bridge only passes raw JSON strings.
export class AnylineInfinityPlugin {
  /// Returns the plugin version string.
  getPluginVersion(): string {
    _setupWrapperSessionOnce();
    return pluginVersion;
  }

  /// Returns the native SDK version string.
  getSDKVersion(): Promise<string> {
    _setupWrapperSessionOnce();
    return nativeModule.getSDKVersion();
  }

  /// Initializes the Anyline SDK with the supplied request parameters.
  requestSdkInitialization(
    request: WrapperSessionSdkInitializationRequest
  ): Promise<WrapperSessionSdkInitializationResponse> {
    _setupWrapperSessionOnce();
    return nativeModule
      .requestSdkInitialization(JSON.stringify(request))
      .then((json: string) => JSON.parse(json) as WrapperSessionSdkInitializationResponse);
  }

  /// Starts a scanning session.
  ///
  /// Resolves with the lifecycle response when the session ends
  /// (success / failure / abort). Intermediate scan results and UI element
  /// click events arrive via onScanResults and onUIElementClicked.
  requestScanStart(
    request: WrapperSessionScanStartRequest
  ): Promise<WrapperSessionScanResponse> {
    return nativeModule
      .requestScanStart(JSON.stringify(request))
      .then((json: string) => JSON.parse(json) as WrapperSessionScanResponse);
  }

  /// Switches to a new scan mode using the provided scan-start request.
  requestScanSwitchWithScanStartRequestParams(
    request: WrapperSessionScanStartRequest
  ): void {
    nativeModule.requestScanSwitchWithScanStartRequestParams(JSON.stringify(request));
  }

  /// Switches to a new scan mode using a raw ScanViewConfig JSON string.
  requestScanSwitchWithScanViewConfigContentString(
    scanViewConfigContentString: string
  ): void {
    nativeModule.requestScanSwitchWithScanViewConfigContentString(
      scanViewConfigContentString
    );
  }

  /// Stops the active scanning session.
  requestScanStop(request?: WrapperSessionScanStopRequest): void {
    nativeModule.requestScanStop(request ? JSON.stringify(request) : null);
  }

  /// Submits a User Corrected Result (UCR) report.
  requestUCRReport(
    request: WrapperSessionUcrReportRequest
  ): Promise<WrapperSessionUcrReportResponse> {
    return nativeModule
      .requestUCRReport(JSON.stringify(request))
      .then((json: string) => JSON.parse(json) as WrapperSessionUcrReportResponse);
  }

  /// Exports all cached scan events as a ZIP archive.
  requestExportCachedEvents(): Promise<WrapperSessionExportCachedEventsResponse> {
    return nativeModule
      .requestExportCachedEvents()
      .then((json: string) => JSON.parse(json) as WrapperSessionExportCachedEventsResponse);
  }

  /// Subscribes to scan results emitted during the active scan session (0..N).
  onScanResults(
    callback: (scanResults: WrapperSessionScanResultsResponse) => void
  ): EmitterSubscription {
    return emitter.addListener(EVENT_ON_SCAN_RESULTS, (json: string) => {
      callback(JSON.parse(json) as WrapperSessionScanResultsResponse);
    });
  }

  /// Subscribes to UI element click events during the active scan session (0..N).
  onUIElementClicked(
    callback: (uiElementClicked: UiFeedbackElementConfig) => void
  ): EmitterSubscription {
    return emitter.addListener(EVENT_ON_UI_ELEMENT_CLICKED, (json: string) => {
      callback(JSON.parse(json) as UiFeedbackElementConfig);
    });
  }
}