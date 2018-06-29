package com.anyline.reactnative;

/**
 * Created by jonesBoi on 02.12.16.
 */

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;


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

    public static final int DIGITAL_METER = 3;
    public static final int ANALOG_METER = 4;
    public static final int AUTO_ANALOG_DIGITAL_METER = 5;
    public static final int ANYLINE_OCR = 6;
    public static final int BARCODE = 7;
    public static final int ANYLINE_MRZ = 8;
    public static final int ANYLINE_DOCUMENT = 9;
    public static final int DIAL_METER = 10;
    public static final int LICENSE_PLATE = 11;
    public static final int SERIAL_NUMBER = 12;
    public static final int DOT_MATRIX_METER = 13;


    private JSONObject configObject;
    private ReactApplicationContext reactContext;
    private String license;
    private JSONObject options;
    private Callback onResultCallback;
    private Callback onErrorCallback;
    private Promise promise;
    private ReactInstanceManager mReactInstanceManager;
    private String returnMethod;
    private String config;

    AnylineSDKPlugin(ReactApplicationContext context) {
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

    // Deprecated
    @ReactMethod
    public void setupScanViewWithConfigJson(String config, String scanMode, Callback onResultReact, Callback onErrorReact) {
        onResultCallback = onResultReact;
        onErrorCallback = onErrorReact;
        this.returnMethod = "callback";
        this.config = config;

        routeScanMode(scanMode);
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
    public void setupPromise(String config, String scanMode, final Promise promise) {
        this.promise = promise;
        this.returnMethod = "promise";
        this.config = config;

        routeScanMode(scanMode);
    }

    private void routeScanMode(String scanMode){
        switch (scanMode) {
            case "AUTO_ANALOG_DIGITAL_METER":
                scan(EnergyActivity.class, scanMode, AUTO_ANALOG_DIGITAL_METER);
                break;
            case "DIGITAL_METER":
                scan(EnergyActivity.class, scanMode, DIGITAL_METER);
                break;
            case "SERIAL_NUMBER":
                scan(EnergyActivity.class, scanMode, SERIAL_NUMBER);
                break;
            case "DIAL_METER":
                scan(EnergyActivity.class, scanMode, DIAL_METER);
                break;
            case "ANALOG_METER":
                scan(EnergyActivity.class, scanMode, ANALOG_METER);
                break;
            case "DOT_MATRIX_METER":
                scan(EnergyActivity.class, scanMode, DOT_MATRIX_METER);
                break;
            case "ANYLINE_OCR":
                scan(AnylineOcrActivity.class, scanMode, ANYLINE_OCR);
                break;
            case "BARCODE":
                scan(BarcodeActivity.class, scanMode, BARCODE);
                break;
            case "MRZ":
                scan(MrzActivity.class, scanMode, ANYLINE_MRZ);
                break;
            case "DOCUMENT":
                scan(DocumentActivity.class, scanMode, ANYLINE_DOCUMENT);
                break;
            case "LICENSE_PLATE":
                scan(LicensePlateActivity.class, scanMode, LICENSE_PLATE);
                break;
            default:
                returnError("Wrong ScanMode");
        }
    }

    private void scan(Class<?> activityToStart, String scanMode, int requestCode) {

        Intent intent = new Intent(getCurrentActivity(), activityToStart);

        try {
            configObject = new JSONObject(this.config);

            //Hacky -> force cancelOnResult = true
            options = configObject.getJSONObject("options");
            options.put("cancelOnResult", true);

            license = configObject.get("license").toString();
            if (configObject.has("nativeBarcodeEnabled")) {
                intent.putExtra(EXTRA_ENABLE_BARCODE_SCANNING, configObject.getBoolean("nativeBarcodeEnabled"));
            }

        } catch (JSONException e) {
            returnError("JSON ERROR: " + e.getMessage());
        }

        intent.putExtra(EXTRA_LICENSE_KEY, license);
        intent.putExtra(EXTRA_CONFIG_JSON, options.toString());

        //Check if OCR
        if (configObject.has("ocr")) {
            try {
                intent.putExtra(EXTRA_OCR_CONFIG_JSON, configObject.get("ocr").toString());
            } catch (JSONException e) {
                returnError(e.getMessage());
            }
        }

        if (scanMode != null) {
            intent.putExtra(EXTRA_SCAN_MODE, scanMode);
        }
        ResultReporter.setListener(this);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        reactContext.startActivityForResult(intent, requestCode, intent.getExtras());

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
                onErrorCallback.invoke(error);
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
                onResultCallback.invoke(result);
                break;
            case "promise":
                promise.resolve(result);
                break;
            default:
                break;
        }
    }
}