package com.anyline.reactnative;

/**
 * Created by jonesBoi on 02.12.16.
 */

import android.content.Context;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.jetbrains.annotations.NotNull;
import org.json.JSONObject;

import java.util.List;

import io.anyline.plugin.config.UIFeedbackElementConfig;
import io.anyline.plugin.result.ExportedScanResult;
import io.anyline.wrapper.config.WrapperSessionExportCachedEventsResponse;
import io.anyline.wrapper.config.WrapperSessionExportCachedEventsResponseSucceed;
import io.anyline.wrapper.config.WrapperSessionExportCachedEventsResponseFail;
import io.anyline.wrapper.config.WrapperSessionScanResultExtraInfo;
import io.anyline.wrapper.config.WrapperSessionScanResultsResponse;
import io.anyline.wrapper.config.WrapperSessionScanStartRequest;
import io.anyline.wrapper.config.WrapperSessionScanResponse;
import io.anyline.wrapper.config.WrapperSessionScanResultConfig;
import io.anyline.wrapper.config.WrapperSessionSdkInitializationResponse;
import io.anyline.wrapper.config.WrapperSessionSdkInitializationResponseInitialized;
import io.anyline.wrapper.config.WrapperSessionUCRReportRequest;
import io.anyline.wrapper.config.WrapperSessionUCRReportResponse;
import io.anyline2.WrapperInfo;
import io.anyline2.di.context.ContextProvider;
import io.anyline2.sdk.extension.UIFeedbackElementConfigExtensionKt;
import io.anyline2.wrapper.WrapperSessionClientInterface;
import io.anyline2.wrapper.WrapperSessionProvider;
import io.anyline2.wrapper.extensions.WrapperSessionScanStartRequestExtensionKt;
import io.anyline2.wrapper.extensions.WrapperSessionSdkInitializationResponseExtensionKt;
import io.anyline2.wrapper.extensions.WrapperSessionUCRReportRequestExtensionKt;
import io.anyline2.wrapper.legacy.LegacyPluginHelper;

class AnylineSDKPlugin extends ReactContextBaseJavaModule
        implements WrapperSessionClientInterface, ResultReporter.OnResultListener {

    // We're creating a static variable to retain the WrapperSessionProvider instance in order to prevent crashes due to garbage collection cleaning up the SDK.
    protected static final WrapperSessionProvider wrapperSessionProvider = WrapperSessionProvider.INSTANCE;
    // We're creating a static variable to store the last license used to initialize the SDK
    private static String license;

    private static boolean isInitializedWithLicenseKey(String requestedLicense) {
        return (license != null
                && WrapperSessionProvider.getCurrentSdkInitializationResponse().getInitialized() == Boolean.TRUE
                && license.equals(requestedLicense));
    }

    public static final String REACT_CLASS = "AnylineSDKPlugin";
    private static final String E_ERROR = "E_ERROR";

    private final ReactApplicationContext reactContext;

    private String returnMethod;

    private Promise wrapperSessionSdkInitializationResponsePromise = null;

    private Promise wrapperSessionScanResponsePromise = null;
    private Callback scanResponseResultCallback = null;
    private Callback scanResponseErrorCallback = null;

    private Promise wrapperSessionExportCachedEventsPromise = null;

    private Callback reportCorrectedResultResponseCallback = null;
    private Callback reportCorrectedResultErrorCallback = null;

    AnylineSDKPlugin(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
        ContextProvider.setInstance(context);
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void getSDKVersion(final Promise promise) {
        promise.resolve(at.nineyards.anyline.BuildConfig.VERSION_NAME);
    }

    @ReactMethod
    protected void setupWrapperSession(final String pluginVersion) {
        WrapperInfo wrapperInfo = new WrapperInfo(WrapperInfo.WrapperType.ReactNative, pluginVersion);
        WrapperSessionProvider.setupWrapperSession(wrapperInfo,this);
    }

    @ReactMethod
    public void licenseKeyExpiryDate(final Promise promise) {
        if (WrapperSessionProvider.getCurrentSdkInitializationResponse().getInitialized() == Boolean.TRUE) {
            WrapperSessionSdkInitializationResponseInitialized sdkInitializationResponseInitialized
                    = WrapperSessionProvider.getCurrentSdkInitializationResponse().getSucceedInfo();
            if (sdkInitializationResponseInitialized != null) {
                promise.resolve(sdkInitializationResponseInitialized.getExpiryDate());
                return;
            }
        }
        promise.reject(E_ERROR, "Anyline SDK was not initialized");
    }

    @ReactMethod
    public void isInitialized(final Promise promise) {
        promise.resolve(WrapperSessionProvider.getCurrentSdkInitializationResponse().getInitialized());
    }

    @ReactMethod
    @Deprecated
    public void setupScanViewWithConfigJson(String config, String scanMode, Callback onResultReact, Callback onErrorReact) {
        scanResponseResultCallback = onResultReact;
        scanResponseErrorCallback = onErrorReact;
        this.returnMethod = "callback";

        routeScanMode(config, null, null, null);
    }

    @ReactMethod
    public void setupAnylineSDK(String license, final Promise promise) {
        setupAnylineSDKWithCacheConfig(license, false, promise);
    }

    @ReactMethod
    public void setupAnylineSDKWithCacheConfig(String license, boolean enableOfflineCache, final Promise promise) {
        if (isInitializedWithLicenseKey(license)) {
            promise.resolve(true);
            return;
        }
        wrapperSessionSdkInitializationResponsePromise = promise;
        initSdkWithCacheConfig(license, enableOfflineCache);
    }

    @ReactMethod
    public void initSdk(String license) {
        initSdkWithCacheConfig(license, false);
    }

    @ReactMethod
    public void initSdkWithCacheConfig(String license, boolean enableOfflineCache) {
        if (isInitializedWithLicenseKey(license)) {
            return;
        }
        AnylineSDKPlugin.license = license;

        JSONObject wrapperSessionSdkInitializationRequestJson =
                LegacyPluginHelper.getWrapperSessionSdkInitializationRequestJson(license, enableOfflineCache, null);

        WrapperSessionProvider.requestSdkInitialization(
                wrapperSessionSdkInitializationRequestJson.toString());
    }

    @ReactMethod
    public void setup(String config, String scanMode, Callback onResultReact, Callback onErrorReact) {
        setupWithInitializationParameters(null, config, scanMode, onResultReact, onErrorReact);
    }
    @ReactMethod
    public void setupWithInitializationParameters(String scanViewInitializationParametersString, String config, String scanMode, Callback onResultReact, Callback onErrorReact) {
        scanResponseResultCallback = onResultReact;
        scanResponseErrorCallback = onErrorReact;
        this.returnMethod = "callback";

        routeScanMode(config, scanViewInitializationParametersString, null, null);
    }
    @ReactMethod
    public void setupPromise(String config, String scanMode, final Promise promise) {
        setupPromiseWithInitializationParameters(null, config, scanMode, promise);
    }
    @ReactMethod
    public void setupPromiseWithScanCallbackConfig(String config, String scanMode, String scanCallbackConfigString, final Promise promise) {
        setupPromiseWithInitializationParametersAndScanCallbackConfig(null, config, scanMode, scanCallbackConfigString, promise);
    }
    @ReactMethod
    public void setupPromiseWithInitializationParameters(String initializationParametersString, String config, String scanMode, final Promise promise) {
        setupPromiseWithInitializationParametersAndScanCallbackConfig(initializationParametersString, config, scanMode, null, promise);
    }
    @ReactMethod
    public void setupPromiseWithInitializationParametersAndScanCallbackConfig(String initializationParametersString, String config, String scanMode, String scanCallbackConfigString, final Promise promise) {
        this.wrapperSessionScanResponsePromise = promise;
        this.returnMethod = "promise";

        routeScanMode(config, initializationParametersString, null, scanCallbackConfigString);
    }

    private void routeScanMode(
            String scanViewConfigContent,
            String scanViewInitializationParametersString,
            String scanViewConfigPath,
            String scanCallbackConfigString) {
        boolean shouldReturnImages = true;

        WrapperSessionScanStartRequest wrapperSessionScanRequest;
        try {
            wrapperSessionScanRequest = LegacyPluginHelper.getWrapperSessionScanStartRequest(
                    this.reactContext,
                    scanViewConfigContent,
                    scanViewInitializationParametersString,
                    scanViewConfigPath,
                    scanCallbackConfigString,
                    shouldReturnImages);
        } catch (Exception e) {
            returnError("Could not parse parameters: " + e.getMessage());
            return;
        }

        JSONObject wrapperSessionScanStartRequestJson
                = WrapperSessionScanStartRequestExtensionKt.toJsonObject(wrapperSessionScanRequest);

        WrapperSessionProvider.requestScanStart(wrapperSessionScanStartRequestJson.toString());

        ResultReporter.setListener(this);
    }

    @ReactMethod
    public void reportCorrectedResult(String blobKey, String correctedResult, Callback onResponseCallback, Callback onErrorCallback) {
        reportCorrectedResultResponseCallback = onResponseCallback;
        reportCorrectedResultErrorCallback = onErrorCallback;
        WrapperSessionUCRReportRequest wrapperSessionUCRReportRequest = LegacyPluginHelper
                .getWrapperSessionUCRReportRequest(blobKey, correctedResult);

        JSONObject wrapperSessionUCRReportRequestJson = WrapperSessionUCRReportRequestExtensionKt
                .toJsonObject(wrapperSessionUCRReportRequest);

        WrapperSessionProvider.requestUCRReport(wrapperSessionUCRReportRequestJson.toString());
    }

    @ReactMethod
    public void exportCachedEvents(final Promise promise) {
        wrapperSessionExportCachedEventsPromise = promise;
        WrapperSessionProvider.requestExportCachedEvents();
    }

    @ReactMethod
    public void tryStopScan(String scanStopRequestParams) {
        WrapperSessionProvider.requestScanStop(scanStopRequestParams);
    }

    @Override
    public void onResult(Object result, boolean isFinalResult) {
        returnSuccess(result.toString());
    }

    @Override
    public void onError(String error) {
        returnError(error);
    }

    @Override
    public void onCancel() {
        returnError("Canceled");
    }

    private void returnError(String error) {
        switch (this.returnMethod) {
            case "callback":
                if (scanResponseErrorCallback != null) {
                    scanResponseErrorCallback.invoke(error);
                    scanResponseErrorCallback = null;
                }
                break;
            case "promise":
                if (wrapperSessionScanResponsePromise != null) {
                    wrapperSessionScanResponsePromise.reject(E_ERROR, error);
                }
                break;
            default:
                break;
        }
    }

    private void returnSuccess(String result) {
        switch (this.returnMethod) {
            case "callback":
                if (scanResponseResultCallback != null) {
                    scanResponseResultCallback.invoke(result);
                    scanResponseResultCallback = null;
                }
                break;
            case "promise":
                if (wrapperSessionScanResponsePromise != null) {
                    wrapperSessionScanResponsePromise.resolve(result);
                }
                break;
            default:
                break;
        }
    }

    private void sendEvent(String eventName, Object params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @Override
    public @NotNull Context getContext() {
        return this.reactContext;
    }

    @Override
    public void onSdkInitializationResponse(@NotNull WrapperSessionSdkInitializationResponse initializationResponse) {
        JSONObject json =
                WrapperSessionSdkInitializationResponseExtensionKt.toJsonObject(initializationResponse);

        if (wrapperSessionSdkInitializationResponsePromise != null) {
            if (initializationResponse.getInitialized() == Boolean.TRUE) {
                wrapperSessionSdkInitializationResponsePromise.resolve(true);
            } else {
                wrapperSessionSdkInitializationResponsePromise.reject(E_ERROR, json.toString());
            }
        }
    }

    @Override
    public void onScanResults(@NotNull WrapperSessionScanResultsResponse scanResultsResponse) {
        WrapperSessionScanResultConfig scanResultConfig = scanResultsResponse.getScanResultConfig();
        List<ExportedScanResult> scanResultList = scanResultsResponse.getExportedScanResults();
        WrapperSessionScanResultExtraInfo scanResultExtraInfo = scanResultsResponse.getScanResultExtraInfo();
        try {
            String resultsWithImagePathString = LegacyPluginHelper
                    .getScanResultsWithImagePath(scanResultList, scanResultExtraInfo.getViewPluginType());

            if (scanResultConfig.getCallbackConfig() != null
                    &&  scanResultConfig.getCallbackConfig().getOnResultEventName() != null) {
                sendEvent(
                        scanResultConfig.getCallbackConfig().getOnResultEventName(),
                        resultsWithImagePathString);
            } else {
                ResultReporter.onResult(resultsWithImagePathString, true);
            }
        } catch (Exception e) {
            //exception will not be handled here
        }
    }

    @Override
    public void onUIElementClicked(@NonNull WrapperSessionScanResultConfig scanResultConfig,
                                   @NonNull UIFeedbackElementConfig uiFeedbackElementConfig) {
        if (scanResultConfig.getCallbackConfig() != null
                &&  scanResultConfig.getCallbackConfig().getOnUIElementClickedEventName() != null) {
            sendEvent(
                    scanResultConfig.getCallbackConfig().getOnUIElementClickedEventName(),
                    UIFeedbackElementConfigExtensionKt.toJsonObject(uiFeedbackElementConfig).toString());
        }
    }

    @Override
    public void onScanResponse(@NotNull WrapperSessionScanResponse scanResponse) {
        if (scanResponse.getStatus() != null) {
            switch (scanResponse.getStatus()) {
                case SCAN_SUCCEEDED:
                    WrapperSessionScanResultConfig scanResultConfig = scanResponse.getScanResultConfig();
                    if (scanResultConfig.getCallbackConfig() != null
                            &&  scanResultConfig.getCallbackConfig().getOnResultEventName() != null) {
                        ResultReporter.onResult("", true);
                    }
                    break;
                case SCAN_FAILED:
                    ResultReporter.onError(scanResponse.getFailInfo().getLastError());
                    break;
                case SCAN_ABORTED:
                    ResultReporter.onCancel();
                    break;
            }
        }
    }

    @Override
    public void onUCRReportResponse(@NotNull WrapperSessionUCRReportResponse ucrReportResponse) {
        if (ucrReportResponse.getStatus() == WrapperSessionUCRReportResponse.WrapperSessionUCRReportResponseStatus.UCR_REPORT_SUCCEEDED) {
            reportCorrectedResultResponseCallback.invoke(ucrReportResponse.getSucceedInfo().getMessage());
        } else {
            reportCorrectedResultErrorCallback.invoke(LegacyPluginHelper
                    .getWrapperSessionUCRReportResponseFailMessage(ucrReportResponse.getFailInfo()));
        }
        reportCorrectedResultResponseCallback = null;
        reportCorrectedResultErrorCallback = null;
    }

    @Override
    public void onExportCachedEventsResponse(@NotNull WrapperSessionExportCachedEventsResponse exportCachedEventsResponse) {
        if (exportCachedEventsResponse.getStatus() == WrapperSessionExportCachedEventsResponse.WrapperSessionExportCachedEventsResponseStatus.EXPORT_SUCCEEDED) {
            WrapperSessionExportCachedEventsResponseSucceed exportCachedEventsSucceed = exportCachedEventsResponse.getSucceedInfo();
            wrapperSessionExportCachedEventsPromise.resolve(exportCachedEventsSucceed.getExportedFile());
        } else {
            WrapperSessionExportCachedEventsResponseFail exportCachedEventsFail = exportCachedEventsResponse.getFailInfo();
            wrapperSessionExportCachedEventsPromise.reject(E_ERROR, exportCachedEventsFail.getLastError());
        }
        wrapperSessionExportCachedEventsPromise = null;
    }
}