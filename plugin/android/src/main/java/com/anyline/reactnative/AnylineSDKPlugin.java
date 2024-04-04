package com.anyline.reactnative;

/**
 * Created by jonesBoi on 02.12.16.
 */

import android.content.Intent;

import com.anyline.reactnative.updateAsset.AnylineUpdateDelegateImpl;
import com.anyline.reactnative.updateAsset.AssetContextJsonParser;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.HashMap;

import io.anyline2.WrapperConfig;
import io.anyline2.WrapperInfo;
import io.anyline2.core.ScanController;
import io.anyline2.legacy.products.AnylineUpdater;
import io.anyline2.legacy.trainer.AssetContext;
import io.anyline2.AnylineSdk;
import io.anyline2.CacheConfig;
import io.anyline2.CorrectedResultReporting;
import io.anyline2.core.LicenseException;

class AnylineSDKPlugin extends ReactContextBaseJavaModule implements ResultReporter.OnResultListener {

    public static final String REACT_CLASS = "AnylineSDKPlugin";
    public static final String EXTRA_LICENSE_KEY = "EXTRA_LICENSE_KEY";
    public static final String EXTRA_CONFIG_JSON = "EXTRA_CONFIG_JSON";
    public static final String EXTRA_SCAN_MODE = "EXTRA_SCAN_MODE";
    public static final String EXTRA_ERROR_MESSAGE = "EXTRA_ERROR_MESSAGE";
    public static final String EXTRA_OCR_CONFIG_JSON = "EXTRA_OCR_CONFIG_JSON";
    public static final String EXTRA_ENABLE_BARCODE_SCANNING = "EXTRA_ENABLE_BARCODE_SCANNING";

    public static final int RESULT_CANCELED = 0;
    public static final int RESULT_OK = 1;
    public static final int RESULT_ERROR = 2;
    private static final String E_ERROR = "E_ERROR";
    private JSONObject configObject;
    private ReactApplicationContext reactContext;
    private String license;
    private JSONObject options;
    private Callback onResultCallback;
    private Callback onErrorCallback;
    private Promise promise;
    private String returnMethod;
    private String config;
    private AssetContextJsonParser assetContextJsonParser;

    private static WrapperConfig wrapperConfig;

    AnylineSDKPlugin(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
        this.assetContextJsonParser = new AssetContextJsonParser();
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
    protected void setPluginVersion(final String pluginVersion) {
        wrapperConfig = new WrapperConfig.Wrapper(
            new WrapperInfo(WrapperInfo.WrapperType.ReactNative, pluginVersion)
        );
    }

    @ReactMethod
    public void licenseKeyExpiryDate(final Promise promise) {
        try {
            promise.resolve(String.valueOf(AnylineSdk.getExpiryDate()));
        } catch (LicenseException e) {
            e.printStackTrace();
            promise.reject(E_ERROR, e.getMessage());
        }
    }

    @ReactMethod
    @Deprecated
    public void setupScanViewWithConfigJson(String config, String scanMode, Callback onResultReact, Callback onErrorReact) {
        onResultCallback = onResultReact;
        onErrorCallback = onErrorReact;
        this.returnMethod = "callback";
        this.config = config;

        routeScanMode(scanMode);
    }

    @ReactMethod
    public void update(
            String assetContextJson,
            Callback onUpdateError,
            Callback onUpdateFinished
    ) {
        try {
            AssetContext assetContext = assetContextJsonParser.parseJson(reactContext, assetContextJson);

            if (assetContext != null) {
                AnylineUpdater.update(
                    reactContext,
                    assetContext,
                    new AnylineUpdateDelegateImpl(reactContext, onUpdateError, onUpdateFinished),
                    ScanController.PluginType.OCR
                );
            }
        } catch (JSONException e) {
            e.printStackTrace();
            returnError(e.getMessage());
        }
    }

    @ReactMethod
    public void setupAnylineSDK(String license, final Promise promise) {
        setupAnylineSDKWithCacheConfig(license, false, promise);
    }

    @ReactMethod
    public void setupAnylineSDKWithCacheConfig(String license, boolean enableOfflineCache, final Promise promise) {
        CacheConfig.Preset cacheConfig = CacheConfig.Preset.Default.INSTANCE;
        if (enableOfflineCache) {
            cacheConfig = CacheConfig.Preset.OfflineLicenseEventCachingEnabled.INSTANCE;
        }
        try {
            AnylineSdk.init(license, reactContext, "", cacheConfig, wrapperConfig);
            this.license = license;
            if (promise != null) {
                promise.resolve(true);
            }
        } catch (LicenseException e) {
            e.printStackTrace();
            if (promise != null) {
                promise.reject(E_ERROR, e.getMessage());
            }
        }
    }

    @ReactMethod
    public void initSdk(String license) {
        initSdk(license, false);
    }

    @ReactMethod
    public void initSdk(String license, boolean enableOfflineCache) {
        CacheConfig.Preset cacheConfig = CacheConfig.Preset.Default.INSTANCE;
        if (enableOfflineCache) {
            cacheConfig = CacheConfig.Preset.OfflineLicenseEventCachingEnabled.INSTANCE;
        }
        try {
            AnylineSdk.init(license, reactContext, "", cacheConfig, wrapperConfig);
        } catch (LicenseException e) {
            e.printStackTrace();
            returnError(e.getMessage());
        }
    }

    @ReactMethod
    public void resetUpdate() {
        // TODO
    }

    @ReactMethod
    public void setup(String config, String scanMode, Callback onResultReact, Callback onErrorReact) {
        onResultCallback = onResultReact;
        onErrorCallback = onErrorReact;
        this.returnMethod = "callback";
        this.config = config;

        routeScanMode(scanMode);
    }

    @ReactMethod
    public void reportCorrectedResult(String blobKey, String correctedResult, Callback onResponseCallback) {
        HashMap<String, String> hashMap = new HashMap<>();
        hashMap.put("result", correctedResult);

        try {
            CorrectedResultReporting
                    .Factory
                    .getInstance()
                    .reportCorrectedResult(
                            blobKey,
                            hashMap
                    );
            onResponseCallback.invoke("Success");
        }
        catch (IllegalArgumentException e) {
            onResponseCallback.invoke("Error: " + e.getMessage());
        }
    }

    @ReactMethod
    public void exportCachedEvents(final Promise promise) {
        try {
            String exportedFile = AnylineSdk.exportCachedEvents();
            if (exportedFile != null) {
                if (promise != null) {
                    promise.resolve(String.valueOf(exportedFile));
                }
            }
            else {
                if (promise != null) {
                    promise.reject(E_ERROR, "Event cache is empty.");
                }
            }
        } catch (IOException e) {
            if (promise != null) {
                promise.reject(E_ERROR, e.getMessage());
            }
        }
    }

    @ReactMethod
    public void setupPromise(String config, String scanMode, final Promise promise) {
        this.promise = promise;
        this.returnMethod = "promise";
        this.config = config;

        routeScanMode(scanMode);
    }

    private void routeScanMode(String scanMode) {
        switch (scanMode) {
            case "scan": // > Anyline 4
                scanAnyline4();
                break;
            default:
                returnError("Wrong ScanMode");
        }
    }

    private void scanAnyline4() {
        try {
            configObject = new JSONObject(this.config);
            if (configObject != null) {
                scan();
            } else {
                returnError("No ViewPlugin in config. Please check your configuration.");
            }
        } catch (LicenseException e) {
            e.printStackTrace();
            returnError("LICENSE ERROR: " + e.getMessage());
        } catch (JSONException e) {
            e.printStackTrace();
            returnError("JSON ERROR: " + e.getMessage());
        }
    }

    private void scan() throws LicenseException, JSONException {

        Intent intent = new Intent(getCurrentActivity(), ScanActivity.class);

        configObject = new JSONObject(this.config);

        if (this.license == null || this.license.isEmpty()) {
            if (configObject.has("license")) {
                //if there is a license on JSON config then this license will be
                //used to init or re-init the SDK
                AnylineSdk.init(configObject.getString("license"), reactContext, "", CacheConfig.Preset.Default.INSTANCE, wrapperConfig);
                license = configObject.get("license").toString();
            } else {
                throw new JSONException("No License in config. Please check your configuration.");
            }
        }

        JSONObject optionsJSONObject = configObject.optJSONObject("options");

        if (optionsJSONObject != null) {
            intent.putExtra(
                    EXTRA_ENABLE_BARCODE_SCANNING,
                    optionsJSONObject.optBoolean("nativeBarcodeEnabled", false)
            );
        }

        intent.putExtra(EXTRA_LICENSE_KEY, license);
        intent.putExtra(EXTRA_CONFIG_JSON, configObject.toString());

        ResultReporter.setListener(this);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        reactContext.startActivityForResult(intent, 1111, intent.getExtras());
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
                if (onErrorCallback != null) {
                    onErrorCallback.invoke(error);
                    onErrorCallback = null;
                }
                break;
            case "promise":
                promise.reject(E_ERROR, error);
                break;
            default:
                break;
        }
    }

    private void returnSuccess(String result) {
        switch (this.returnMethod) {
            case "callback":
                if (onResultCallback != null) {
                    onResultCallback.invoke(result);
                    onResultCallback = null;
                }
                break;
            case "promise":
                promise.resolve(result);
                break;
            default:
                break;
        }
    }
}