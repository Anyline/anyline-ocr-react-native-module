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


    private JSONObject configObject;
    private ReactApplicationContext reactContext;
    private String license;
    private String options;
    private Callback onResultCallback;
    private Callback onErrorCallback;
    private Callback onCancelCallback;
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
    public void setupScanViewWithConfigJson(String config, String scanMode, Callback onResultReact, Callback onErrorReact, Callback onCancelReact) {
        onResultCallback = onResultReact;
        onErrorCallback = onErrorReact;
        onCancelCallback = onCancelReact;


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
                onErrorCallback.invoke("Not implemented yet");
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
            license = configObject.get("license").toString();
            options = configObject.get("options").toString();

        } catch (JSONException e) {
            onErrorCallback.invoke("JSON ERROR: " + e);
        }

        intent.putExtra(EXTRA_LICENSE_KEY, license);
        intent.putExtra(EXTRA_CONFIG_JSON, options);

        //Check if OCR
        try {
            intent.putExtra(EXTRA_OCR_CONFIG_JSON, configObject.get("license").toString());
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
            try {
                //ImagePath as Base64
                String imagePath = ((JSONObject) result).getString("imagePath");
                Bitmap bm = BitmapFactory.decodeFile(imagePath);
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                bm.compress(Bitmap.CompressFormat.JPEG, 100, baos); //bm is the bitmap object
                byte[] b = baos.toByteArray();
                String encodedImage = Base64.encodeToString(b, Base64.DEFAULT);
                ((JSONObject) result).put("cutoutBase64", encodedImage);

                //FullImagePath as Base64
                String fullImagePath = ((JSONObject) result).getString("fullImagePath");
                Bitmap bmFull = BitmapFactory.decodeFile(fullImagePath);
                ByteArrayOutputStream baosFull = new ByteArrayOutputStream();
                bmFull.compress(Bitmap.CompressFormat.JPEG, 100, baosFull); //bm is the bitmap object
                byte[] bFull = baosFull.toByteArray();
                String encodedImageFull = Base64.encodeToString(bFull, Base64.DEFAULT);
                ((JSONObject) result).put("fullImageBase64", encodedImageFull);
            } catch (JSONException e) {

            }
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
    public void onCancel(){
        onCancelCallback.invoke();
    }
}