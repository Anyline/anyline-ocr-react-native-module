/*
 * Anyline Cordova Plugin
 * MrzActivity.java
 *
 * Copyright (c) 2015 9yards GmbH
 *
 * Created by martin at 2015-07-21
 */
package com.anyline.reactnative;

import android.os.Bundle;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import at.nineyards.anyline.camera.AnylineViewConfig;
import at.nineyards.anyline.models.AnylineImage;
import at.nineyards.anyline.modules.mrz.Identification;
import at.nineyards.anyline.modules.mrz.MrzResultListener;
import at.nineyards.anyline.modules.mrz.MrzScanView;
import at.nineyards.anyline.util.TempFileUtil;

public class MrzActivity extends AnylineBaseActivity {
    private static final String TAG = MrzActivity.class.getSimpleName();

    private MrzScanView mrzScanView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mrzScanView = new MrzScanView(this, null);
        try {
            JSONObject json = new JSONObject(configJson);
            mrzScanView.setConfig(new AnylineViewConfig(this, json));
        } catch (Exception e) {
            //JSONException or IllegalArgumentException is possible, return it to javascript
            finishWithError("error_invalid_json_data \n" + e.getLocalizedMessage());
            return;
        }
        setContentView(mrzScanView);

        initAnyline();
    }

    @Override
    protected void onResume() {
        super.onResume();
        mrzScanView.startScanning();
    }

    @Override
    protected void onPause() {
        super.onPause();

        mrzScanView.cancelScanning();
        mrzScanView.releaseCameraInBackground();
    }

    private void initAnyline() {
        mrzScanView.setCameraOpenListener(this);

        mrzScanView.initAnyline(licenseKey, new MrzResultListener() {

            @Override
            public void onResult(Identification mrzResult, AnylineImage anylineImage) {

                JSONObject jsonResult = mrzResult.toJSONObject();

                try {
                    File imageFile = TempFileUtil.createTempFileCheckCache(MrzActivity.this,
                            UUID.randomUUID().toString(), ".jpg");
                    anylineImage.save(imageFile, 90);
                    jsonResult.put("imagePath", imageFile.getAbsolutePath());

                } catch (IOException e) {
                    Log.e(TAG, "Image file could not be saved.", e);

                } catch (JSONException jsonException) {
                    //should not be possible
                    Log.e(TAG, "Error while putting image path to json.", jsonException);
                }

                if (mrzScanView.getConfig().isCancelOnResult()) {
                    ResultReporter.onResult(jsonResult, true);
                    setResult(AnylineSDKPlugin.RESULT_OK);
                    finish();
                } else {
                    ResultReporter.onResult(jsonResult, false);
                }
            }
        });
        mrzScanView.getAnylineController().setWorkerThreadUncaughtExceptionHandler(this);
    }

}
