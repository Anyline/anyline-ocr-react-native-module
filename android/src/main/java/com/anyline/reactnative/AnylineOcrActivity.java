/*
 * Anyline Cordova Plugin
 * AnylineOcrActivity.java
 *
 * Copyright (c) 2016 9yards GmbH
 *
 * Created by martin at 2016-03-07
 */
package com.anyline.reactnative;

import android.graphics.PointF;
import android.os.Bundle;
import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import at.nineyards.anyline.camera.AnylineViewConfig;
import at.nineyards.anyline.modules.ocr.AnylineOcrConfig;
import at.nineyards.anyline.modules.ocr.AnylineOcrError;
import at.nineyards.anyline.modules.ocr.AnylineOcrListener;
import at.nineyards.anyline.modules.ocr.AnylineOcrResult;
import at.nineyards.anyline.modules.ocr.AnylineOcrScanView;
import at.nineyards.anyline.util.AssetUtil;
import at.nineyards.anyline.util.TempFileUtil;

public class AnylineOcrActivity extends AnylineBaseActivity {
    private static final String TAG = AnylineOcrActivity.class.getSimpleName();

    private AnylineOcrScanView anylineOcrScanView;
    private boolean drawTextOutline;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        String ocrConfigString = getIntent().getExtras().getString(AnylineSDKPlugin.EXTRA_OCR_CONFIG_JSON, "");

        anylineOcrScanView = new AnylineOcrScanView(this, null);
        try {
            JSONObject json = new JSONObject(configJson);
            anylineOcrScanView.setConfig(new AnylineViewConfig(this, json));

            if (json.has("reportingEnabled")) {
                anylineOcrScanView.setReportingEnabled(json.optBoolean("reportingEnabled", true));
            }

            json = new JSONObject(ocrConfigString);
            AnylineOcrConfig ocrConfig = new AnylineOcrConfig(json);
            if (ocrConfig.getCustomCmdFile() != null) {
                //custom cmd file in cordova is relative to www, so add www
                ocrConfig.setCustomCmdFile("www/" + ocrConfig.getCustomCmdFile());
            }

            JSONArray tesseractArray = json.optJSONArray("traineddataFiles");
            if (tesseractArray != null) {
                String[] languages = new String[tesseractArray.length()];
                for (int i = 0; i < languages.length; i++) {
                    long start = System.currentTimeMillis();
                    File dirToCopyTo = new File(this.getFilesDir(), "anyline/module_anyline_ocr/tessdata/");
                    String traineddataFilePath = tesseractArray.getString(i);

                    int lastFileSeparatorIndex = traineddataFilePath.lastIndexOf(File.separator);
                    int lastDotIndex = traineddataFilePath.lastIndexOf(".");
                    if (lastDotIndex > lastFileSeparatorIndex) {
                        //start after the "/" or with 0 if no fileseperator was found
                        languages[i] = traineddataFilePath.substring(lastFileSeparatorIndex + 1, lastDotIndex);
                    } else {
                        //maybe it should just fail here, case propably not useful
                        languages[i] = traineddataFilePath.substring(lastFileSeparatorIndex + 1);
                    }
                    AssetUtil.copyAssetFileWithoutPath(this, "www/" + traineddataFilePath, dirToCopyTo, false);
                    Log.v(TAG, "Copy traineddata duration: " + (System.currentTimeMillis() - start));
                }
                ocrConfig.setTesseractLanguages(languages);
            }

            drawTextOutline = json.optBoolean("drawTextOutline", true);

            anylineOcrScanView.setAnylineOcrConfig(ocrConfig);

        } catch (Exception e) {
            // JSONException or IllegalArgumentException is possible for errors in json
            // IOException is possible for errors during asset copying
            finishWithError("error_invalid_json_data \n" + e.getLocalizedMessage());
            return;
        }

        setContentView(anylineOcrScanView);

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

    private void initAnyline() {
        anylineOcrScanView.setCameraOpenListener(this);

        anylineOcrScanView.initAnyline(licenseKey, new AnylineOcrListener() {
            @Override
            public void onReport(String identifier, Object value) {
            }

            @Override
            public boolean onTextOutlineDetected(List<PointF> list) {
                return !drawTextOutline;
            }

            @Override
            public void onResult(AnylineOcrResult result) {

                JSONObject jsonResult = new JSONObject();

                try {
                    jsonResult.put("text", result.getText().trim());

                    File imageFile = TempFileUtil.createTempFileCheckCache(AnylineOcrActivity.this,
                            UUID.randomUUID().toString(), ".jpg");
                    result.getImage().save(imageFile, 90);
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

            @Override
            public void onAbortRun(AnylineOcrError code, String message) {
            }
        });

        anylineOcrScanView.getAnylineController().setWorkerThreadUncaughtExceptionHandler(this);
    }

}
