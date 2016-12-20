package com.anyline.reactnative;

/*
 * Anyline Cordova Plugin
 * BarcodeActivity.java
 *
 * Copyright (c) 2015 9yards GmbH
 *
 * Created by martin at 2015-07-21
 */

import android.os.Bundle;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import at.nineyards.anyline.camera.AnylineViewConfig;
import at.nineyards.anyline.models.AnylineImage;
import at.nineyards.anyline.modules.barcode.BarcodeResultListener;
import at.nineyards.anyline.modules.barcode.BarcodeScanView;
import at.nineyards.anyline.util.TempFileUtil;

public class BarcodeActivity extends AnylineBaseActivity {
    private static final String TAG = BarcodeActivity.class.getSimpleName();

    private BarcodeScanView barcodeScanView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        barcodeScanView = new BarcodeScanView(this, null);
        try {
            JSONObject json = new JSONObject(configJson);
            barcodeScanView.setConfig(new AnylineViewConfig(this, json));
        } catch (Exception e) {
            //JSONException or IllegalArgumentException is possible, return it to javascript
            finishWithError("error_invalid_json_data");
            return;
        }
        setContentView(barcodeScanView);

        initAnyline();
    }

    @Override
    protected void onResume() {
        super.onResume();
        barcodeScanView.startScanning();
    }

    @Override
    protected void onPause() {
        super.onPause();
        barcodeScanView.cancelScanning();
        barcodeScanView.releaseCameraInBackground();
    }

    private void initAnyline() {
        barcodeScanView.setCameraOpenListener(this);

        barcodeScanView.initAnyline(licenseKey, new BarcodeResultListener() {
            @Override
            public void onResult(String result, BarcodeScanView.BarcodeFormat format, AnylineImage resultImage) {

                JSONObject jsonResult = new JSONObject();
                try {

                    jsonResult.put("value", result);
                    jsonResult.put("format", format.toString());

                    File imageFile = TempFileUtil.createTempFileCheckCache(BarcodeActivity.this,
                            UUID.randomUUID().toString(), ".jpg");

                    resultImage.save(imageFile, 90);
                    jsonResult.put("imagePath", imageFile.getAbsolutePath());

                } catch (IOException e) {
                    Log.e(TAG, "Image file could not be saved.", e);

                } catch (JSONException jsonException) {
                    //should not be possible
                    Log.e(TAG, "Error while putting image path to json.", jsonException);
                }

                if (barcodeScanView.getConfig().isCancelOnResult()) {
                    ResultReporter.onResult(jsonResult, true);
                    setResult(AnylineSDKPlugin.RESULT_OK);
                    finish();
                } else {
                    ResultReporter.onResult(jsonResult, false);
                }
            }
        });
        barcodeScanView.getAnylineController().setWorkerThreadUncaughtExceptionHandler(this);
    }

}
