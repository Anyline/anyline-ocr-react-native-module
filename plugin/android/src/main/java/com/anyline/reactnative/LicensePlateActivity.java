/*
 * Anyline React-Native Plugin
 * LicensePlateActivity.java
 *
 * Copyright (c) 2017 Anyline GmbH
 *
 * Created by jonas at 2017-10-10
 */

package com.anyline.reactnative;

import android.os.Bundle;
import android.util.Log;
import android.view.WindowManager;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import at.nineyards.anyline.AnylineDebugListener;
import at.nineyards.anyline.camera.AnylineViewConfig;
import at.nineyards.anyline.camera.CameraConfig;
import at.nineyards.anyline.core.RunFailure;
import at.nineyards.anyline.core.Vector_Contour;
import at.nineyards.anyline.modules.licenseplate.LicensePlateResult;
import at.nineyards.anyline.modules.licenseplate.LicensePlateResultListener;
import at.nineyards.anyline.modules.licenseplate.LicensePlateScanView;
import at.nineyards.anyline.util.TempFileUtil;

public class LicensePlateActivity extends AnylineBaseActivity {

    private static final String TAG = LicensePlateActivity.class.getSimpleName();
    protected LicensePlateScanView anylineLicensePlateScanView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        //Set the flag to keep the screen on (otherwise the screen may go dark during scanning)
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        anylineLicensePlateScanView = new LicensePlateScanView(this, null);
        try {
            JSONObject json = new JSONObject(configJson);

            // Configure the view (cutout, the camera resolution, etc.) via json
            anylineLicensePlateScanView.setConfig(new AnylineViewConfig(this, json));

            // set individual camera settings for this example by getting the current preferred settings and adapting them
            CameraConfig camConfig = anylineLicensePlateScanView.getPreferredCameraConfig();
            setFocusConfig(json, camConfig);

            //disable or enable reporting by config
            if (json.has("reportingEnabled")) {
                anylineLicensePlateScanView.setReportingEnabled(json.optBoolean("reportingEnabled", true));
            }

        } catch (Exception e) {

            // JSONException or IllegalArgumentException is possible for errors in json
            // IOException is possible for errors during asset copying
            finishWithError(getString(getResources().getIdentifier("error_invalid_json_data", "string", getPackageName())) + "\n" + e.getLocalizedMessage());
            return;
        }

        setContentView(anylineLicensePlateScanView);

        setDebugListener();
        initAnyline();
    }

    @Override
    protected void onResume() {
        super.onResume();
        anylineLicensePlateScanView.startScanning();
    }

    @Override
    protected void onPause() {
        super.onPause();

        anylineLicensePlateScanView.cancelScanning();
        anylineLicensePlateScanView.releaseCameraInBackground();
    }


    private void setDebugListener() {
        anylineLicensePlateScanView.setDebugListener(new AnylineDebugListener() {
            @Override
            public void onDebug(String name, Object value) {

                if (name.equals(AnylineDebugListener.BRIGHTNESS_VARIABLE_NAME) && value.getClass().equals
                        (AnylineDebugListener.BRIGHTNESS_VARIABLE_CLASS)) {
                    Double val = AnylineDebugListener.BRIGHTNESS_VARIABLE_CLASS.cast(value);

                    Log.d(TAG, name + ": " + val.doubleValue());
                }
                if (name.equals(CONTOURS_VARIABLE_NAME) && value.getClass().equals(CONTOURS_VARIABLE_CLASS)) {
                    Vector_Contour contour = CONTOURS_VARIABLE_CLASS.cast(value);
                    Log.d(TAG, name + ": " + contour.toString());
                }

            }

            @Override
            public void onRunSkipped(RunFailure runFailure) {
                Log.w(TAG, "run skipped: " + runFailure);
            }
        });
    }


    private void initAnyline() {
        anylineLicensePlateScanView.setCameraOpenListener(this);

        anylineLicensePlateScanView.initAnyline(licenseKey, new LicensePlateResultListener() {

            @Override
            public void onResult(LicensePlateResult licensePlateResult) {

                JSONObject jsonResult = new JSONObject();

                try {
                    jsonResult.put("country", licensePlateResult.getCountry());
                    jsonResult.put("licensePlate", licensePlateResult.getResult());
                    jsonResult.put("outline", jsonForOutline(licensePlateResult.getOutline()));
                    jsonResult.put("confidence", licensePlateResult.getConfidence());

                    File imageFile = TempFileUtil.createTempFileCheckCache(LicensePlateActivity.this,
                            UUID.randomUUID().toString(), ".jpg");
                    licensePlateResult.getCutoutImage().save(imageFile, 90);
                    jsonResult.put("imagePath", imageFile.getAbsolutePath());

                } catch (IOException e) {
                    Log.e(TAG, "Image file could not be saved.", e);

                } catch (JSONException jsonException) {
                    //should not be possible
                    Log.e(TAG, "Error while puting result data to json.", jsonException);
                }

                if (anylineLicensePlateScanView.getConfig().isCancelOnResult()) {
                    ResultReporter.onResult(jsonResult, true);
                    setResult(AnylineSDKPlugin.RESULT_OK);
                    finish();
                } else {
                    ResultReporter.onResult(jsonResult, false);
                }
            }

        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}
