package com.anyline.reactnative;

/**
 * Created by jonesBoi on 02.12.16.
 */

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;

class AnylineSDKPlugin extends ReactContextBaseJavaModule implements ResultReporter.OnResultListener {

    public static final String REACT_CLASS = "AnylineSDKPlugin";
    public static final String EXTRA_LICENSE_KEY = "EXTRA_LICENSE_KEY";
    public static final String EXTRA_CONFIG_JSON = "EXTRA_CONFIG_JSON";
    public static final String EXTRA_SCAN_MODE = "EXTRA_SCAN_MODE";
    public static final String EXTRA_ERROR_MESSAGE = "EXTRA_ERROR_MESSAGE";
    public static final String EXTRA_OCR_CONFIG_JSON = "EXTRA_OCR_CONFIG_JSON";

    public static final int RESULT_CANCELED = 0;
    public static final int RESULT_OK = 1;
    public static final int RESULT_ERROR = 2;


    public static final int DIGITAL_METER = 3;
    public static final int ANALOG_METER = 4;
    public static final int ANYLINE_OCR = 5;
    public static final int BARCODE = 6;
    public static final int ANYLINE_MRZ = 7;
    public static final int ANYLINE_DOCUMENT = 8;


    private JSONObject configObject;
    private ReactApplicationContext reactContext;
    private String license;
    private JSONObject options;
    private Callback onResultCallback;
    private Callback onErrorCallback;
    private ReactInstanceManager mReactInstanceManager;

    AnylineSDKPlugin(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactMethod
    public void setupScanViewWithConfigJson(String config, String scanMode, Callback onResultReact, Callback onErrorReact) {
        onResultCallback = onResultReact;
        onErrorCallback = onErrorReact;


        switch (scanMode) {
            case "DIGITAL_METER":
                scan(EnergyActivity.class, config, scanMode, DIGITAL_METER);
                break;
            case "ANALOG_METER":
                scan(EnergyActivity.class, config, scanMode, ANALOG_METER);
                break;
            case "ANYLINE_OCR":
                scan(AnylineOcrActivity.class, config, scanMode, ANYLINE_OCR);
                break;
            case "BARCODE":
                scan(BarcodeActivity.class, config, scanMode, BARCODE);
                break;
            case "MRZ":
                scan(MrzActivity.class, config, scanMode, ANYLINE_MRZ);
                break;
            case "DOCUMENT":
                scan(DocumentActivity.class, config, scanMode, ANYLINE_DOCUMENT);
                break;
            default:
                onErrorCallback.invoke("Wrong ScanMode");
        }
    }


    private void scan(Class<?> activityToStart, String config, String scanMode, int requestCode) {

        Intent intent = new Intent(getCurrentActivity(), activityToStart);
        Activity currentActivity = getCurrentActivity();


        try {
            configObject = new JSONObject(config);

            //Hacky -> force cancelOnResult = true
            options =  configObject.getJSONObject("options");
            options.put("cancelOnResult", true);

            license = configObject.get("license").toString();

        } catch (JSONException e) {
            onErrorCallback.invoke("JSON ERROR: " + e);
        }

        intent.putExtra(EXTRA_LICENSE_KEY, license);
        intent.putExtra(EXTRA_CONFIG_JSON, options.toString());

        //Check if OCR
        try {
            intent.putExtra(EXTRA_OCR_CONFIG_JSON, configObject.get("ocr").toString());
        } catch (JSONException e) {

        }

        if (scanMode != null) {
            intent.putExtra(EXTRA_SCAN_MODE, scanMode);
        }
        ResultReporter.setListener(this);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        currentActivity.startActivityForResult(intent, requestCode);

    }

    @Override
    public void onResult(Object result, boolean isFinalResult) {
        if (result instanceof JSONObject) {
            onResultCallback.invoke(result.toString());
        } else if (result instanceof JSONArray) {
            onResultCallback.invoke(result.toString());
        } else {
            onResultCallback.invoke(result.toString());
        }
    }


    @Override
    public void onError(String error) {
        onErrorCallback.invoke(error);
    }

    @Override
    public void onCancel() {
        onErrorCallback.invoke("Canceled");
    }
}