package com.anyline.reactnative;

import android.content.Context;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.anyline.reactnative.nativeview.NativeViewRegistry;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.jetbrains.annotations.NotNull;

import io.anyline.plugin.config.UIFeedbackElementConfig;
import io.anyline.wrapper.config.WrapperSessionExportCachedEventsResponse;
import io.anyline.wrapper.config.WrapperSessionScanResponse;
import io.anyline.wrapper.config.WrapperSessionScanResultConfig;
import io.anyline.wrapper.config.WrapperSessionScanResultsResponse;
import io.anyline.wrapper.config.WrapperSessionSdkInitializationResponse;
import io.anyline.wrapper.config.WrapperSessionUCRReportResponse;
import io.anyline2.WrapperInfo;
import io.anyline2.sdk.extension.UIFeedbackElementConfigExtensionKt;
import io.anyline2.wrapper.WrapperSessionClientInterface;
import io.anyline2.wrapper.WrapperSessionProvider;
import io.anyline2.wrapper.extensions.WrapperSessionExportCachedEventsResponseExtensionKt;
import io.anyline2.wrapper.extensions.WrapperSessionScanResponseExtensionKt;
import io.anyline2.wrapper.extensions.WrapperSessionScanResultsResponseExtensionKt;
import io.anyline2.wrapper.extensions.WrapperSessionSdkInitializationResponseExtensionKt;
import io.anyline2.wrapper.extensions.WrapperSessionUCRReportResponseExtensionKt;

class AnylineInfinityPlugin extends ReactContextBaseJavaModule
        implements WrapperSessionClientInterface {

    // Retain the WrapperSessionProvider instance to prevent GC-related crashes.
    protected static final WrapperSessionProvider wrapperSessionProvider = WrapperSessionProvider.INSTANCE;

    static final String REACT_CLASS = "AnylineInfinityPlugin";
    private static final String EVENT_ON_SCAN_RESULTS = "INFINITY_ON_SCAN_RESULTS";
    private static final String EVENT_ON_UI_ELEMENT_CLICKED = "INFINITY_ON_UI_ELEMENT_CLICKED";

    private final ReactApplicationContext reactContext;

    private Promise sdkInitializationPromise = null;
    private Promise scanResponsePromise = null;
    private Promise ucrReportPromise = null;
    private Promise exportCachedEventsPromise = null;

    AnylineInfinityPlugin(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
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
        WrapperInfo wrapperInfo = new WrapperInfo(
                WrapperInfo.WrapperType.ReactNative,
                pluginVersion,
                WrapperInfo.WrapperCodename.Infinity);
        WrapperSessionProvider.setupWrapperSession(wrapperInfo, this);
    }

    @ReactMethod
    public void requestSdkInitialization(String request, Promise promise) {
        sdkInitializationPromise = promise;
        WrapperSessionProvider.requestSdkInitialization(request);
    }

    @ReactMethod
    public void requestScanStart(String request, Promise promise) {
        scanResponsePromise = promise;
        UiThreadUtil.runOnUiThread(() -> {
            try {
                WrapperSessionProvider.requestScanStart(request);
            } catch (Exception e) {
                promise.reject(e);
            }
        });
    }

    @ReactMethod
    public void requestScanSwitchWithScanStartRequestParams(String request) {
        WrapperSessionProvider.requestScanSwitchWithScanStartRequestParams(request);
    }

    @ReactMethod
    public void requestScanSwitchWithScanViewConfigContentString(String request) {
        WrapperSessionProvider.requestScanSwitchWithScanViewConfigContentString(request);
    }

    @ReactMethod
    public void requestScanStop(@Nullable String request) {
        WrapperSessionProvider.requestScanStop(request);
    }

    @ReactMethod
    public void requestUCRReport(String request, Promise promise) {
        ucrReportPromise = promise;
        WrapperSessionProvider.requestUCRReport(request);
    }

    @ReactMethod
    public void requestExportCachedEvents(Promise promise) {
        exportCachedEventsPromise = promise;
        WrapperSessionProvider.requestExportCachedEvents();
    }

    private void sendEvent(String eventName, String params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @Override
    public @NotNull Context getContext() {
        return reactContext;
    }

    @Override
    public @Nullable ViewGroup getContainerView() {
        return (ViewGroup) NativeViewRegistry.getLastOrNull();
    }

    @Override
    public void onSdkInitializationResponse(
            @NotNull WrapperSessionSdkInitializationResponse initializationResponse) {
        if (sdkInitializationPromise != null) {
            sdkInitializationPromise.resolve(
                    WrapperSessionSdkInitializationResponseExtensionKt
                            .toJsonObject(initializationResponse).toString());
            sdkInitializationPromise = null;
        }
    }

    @Override
    public void onScanResults(@NotNull WrapperSessionScanResultsResponse scanResultsResponse) {
        sendEvent(EVENT_ON_SCAN_RESULTS,
                WrapperSessionScanResultsResponseExtensionKt
                        .toJsonObject(scanResultsResponse).toString());
    }

    @Override
    public void onScanResponse(@NotNull WrapperSessionScanResponse scanResponse) {
        if (scanResponsePromise != null) {
            scanResponsePromise.resolve(
                    WrapperSessionScanResponseExtensionKt
                            .toJsonObject(scanResponse).toString());
            scanResponsePromise = null;
        }
    }

    @Override
    public void onUIElementClicked(
            @NonNull WrapperSessionScanResultConfig scanResultConfig,
            @NonNull UIFeedbackElementConfig uiFeedbackElementConfig) {
        sendEvent(EVENT_ON_UI_ELEMENT_CLICKED,
                UIFeedbackElementConfigExtensionKt.toJsonObject(uiFeedbackElementConfig).toString());
    }

    @Override
    public void onUCRReportResponse(@NotNull WrapperSessionUCRReportResponse ucrReportResponse) {
        if (ucrReportPromise != null) {
            ucrReportPromise.resolve(
                    WrapperSessionUCRReportResponseExtensionKt
                            .toJsonObject(ucrReportResponse).toString());
            ucrReportPromise = null;
        }
    }

    @Override
    public void onExportCachedEventsResponse(
            @NotNull WrapperSessionExportCachedEventsResponse exportCachedEventsResponse) {
        if (exportCachedEventsPromise != null) {
            exportCachedEventsPromise.resolve(
                    WrapperSessionExportCachedEventsResponseExtensionKt
                            .toJsonObject(exportCachedEventsResponse).toString());
            exportCachedEventsPromise = null;
        }
    }
}