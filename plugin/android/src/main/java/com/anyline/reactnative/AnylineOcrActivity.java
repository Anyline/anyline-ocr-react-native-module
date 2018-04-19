/*
 * Anyline React-Native Plugin
 * AnylineOcrActivity.java
 *
 * Copyright (c) 2016 Anyline GmbH
 *
 * Created by martin at 2016-03-07
 */
package com.anyline.reactnative;

import android.os.Bundle;
import android.util.Log;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.graphics.Rect;
import android.view.View;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import at.nineyards.anyline.camera.CameraConfig;
import at.nineyards.anyline.camera.CameraFeatures;
import at.nineyards.anyline.modules.ocr.AnylineOcrResultListener;
import at.nineyards.anyline.camera.CameraController;
import at.nineyards.anyline.camera.AnylineViewConfig;
import at.nineyards.anyline.modules.ocr.AnylineOcrConfig;
import at.nineyards.anyline.modules.ocr.AnylineOcrResult;
import at.nineyards.anyline.modules.ocr.AnylineOcrScanView;
import at.nineyards.anyline.util.AssetUtil;
import at.nineyards.anyline.util.TempFileUtil;

public class AnylineOcrActivity extends AnylineBaseActivity {
    private static final String TAG = AnylineOcrActivity.class.getSimpleName();

    private AnylineOcrScanView anylineOcrScanView;
    private TextView labelView;
    private JSONObject viewConfig;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        String ocrConfigString = getIntent().getExtras().getString(AnylineSDKPlugin.EXTRA_OCR_CONFIG_JSON, "");

        anylineOcrScanView = new AnylineOcrScanView(this, null);
        RelativeLayout relativeLayout = new RelativeLayout(this);


        try {
            this.viewConfig = new JSONObject(configJson);
            anylineOcrScanView.setConfig(new AnylineViewConfig(this, this.viewConfig));

            if (this.viewConfig.has("reportingEnabled")) {
                anylineOcrScanView.setReportingEnabled(this.viewConfig.optBoolean("reportingEnabled", true));
            }

            JSONObject json = new JSONObject(ocrConfigString);

            AnylineOcrConfig ocrConfig = new AnylineOcrConfig(json);
            if (ocrConfig.getCustomCmdFile() != null) {
                ocrConfig.setCustomCmdFile(ocrConfig.getCustomCmdFile());
            }

            // set custom Ale File
            if (json.has("aleFile")) {
                String customCmdFile = json.getString("aleFile");
                ocrConfig.setCustomCmdFile(customCmdFile);
                if (ocrConfig.getCustomCmdFile() != null) {
                    ocrConfig.setCustomCmdFile(ocrConfig.getCustomCmdFile());
                }
            }

            // set traineddata
            JSONArray languageArray = json.optJSONArray("traineddataFiles");
            if (languageArray != null) {
                String[] languages = new String[languageArray.length()];
                for (int i = 0; i < languages.length; i++) {
                    languages[i] = languageArray.getString(i);
                    Log.d("languages", languages[i]);
                }
                ocrConfig.setLanguages(languages);
            }

            // set individual camera settings for this example by getting the current preferred settings and adapting them
            CameraConfig camConfig = anylineOcrScanView.getPreferredCameraConfig();
            setFocusConfig(this.viewConfig, camConfig);

            anylineOcrScanView.setAnylineOcrConfig(ocrConfig);

        } catch (Exception e) {
            // JSONException or IllegalArgumentException is possible for errors in json
            // IOException is possible for errors during asset copying
            finishWithError("error_invalid_json_data \n" + e.getLocalizedMessage());
            return;
        }

        relativeLayout.addView(anylineOcrScanView, getTextLayoutParams());

        //add custom Label
        if (this.viewConfig.has("label")) {
            this.labelView = getLabelView(getApplicationContext());
            RelativeLayout.LayoutParams lp = getWrapContentLayoutParams();
            relativeLayout.addView(this.labelView, lp);
        }
        setContentView(relativeLayout, getWrapContentLayoutParams());

        initAnyline();
    }

    @Override
    protected void onResume() {
        super.onResume();
        anylineOcrScanView.startScanning();
    }

    @Override
    protected void onPause() {
        super.onPause();

        anylineOcrScanView.cancelScanning();
        anylineOcrScanView.releaseCameraInBackground();
    }

    @Override
    public void onCameraOpened(CameraController cameraController, int width, int height) {
        super.onCameraOpened(cameraController, width, height);
        anylineOcrScanView.post(new Runnable() {
            @Override
            public void run() {
                if (labelView != null) {
                    try {
                        Rect rect = anylineOcrScanView.getCutoutRect();
                        JSONObject offsetJson = new JSONObject(configJson).getJSONObject("label").getJSONObject("offset");


                        RelativeLayout.LayoutParams lp = (RelativeLayout.LayoutParams) labelView.getLayoutParams();
                        lp.setMargins(rect.left + Integer.parseInt(offsetJson.getString("x")), rect.top + Integer.parseInt(offsetJson.getString("y")), 0, 0);
                        labelView.setLayoutParams(lp);

                        labelView.setVisibility(View.VISIBLE);
                    } catch (JSONException e) {
                        finishWithError(e.toString());
                    }
                }
            }
        });
    }

    private void initAnyline() {
        anylineOcrScanView.setCameraOpenListener(this);

        anylineOcrScanView.initAnyline(licenseKey, new AnylineOcrResultListener() {

            @Override
            public void onResult(AnylineOcrResult result) {

                JSONObject jsonResult = new JSONObject();

                try {
                    jsonResult.put("text", result.getResult().trim());

                    File imageFile = TempFileUtil.createTempFileCheckCache(AnylineOcrActivity.this,
                            UUID.randomUUID().toString(), ".jpg");
                    result.getCutoutImage().save(imageFile, 90);
                    jsonResult.put("imagePath", imageFile.getAbsolutePath());

                } catch (IOException e) {
                    Log.e(TAG, "Image file could not be saved.", e);

                } catch (JSONException jsonException) {
                    //should not be possible
                    Log.e(TAG, "Error while puting result data to json.", jsonException);
                }

                if (anylineOcrScanView.getConfig().isCancelOnResult()) {
                    ResultReporter.onResult(jsonResult, true);
                    setResult(AnylineSDKPlugin.RESULT_OK);
                    finish();
                } else {
                    ResultReporter.onResult(jsonResult, false);
                }
            }

        });

        anylineOcrScanView.getAnylineController().setWorkerThreadUncaughtExceptionHandler(this);
    }

}
