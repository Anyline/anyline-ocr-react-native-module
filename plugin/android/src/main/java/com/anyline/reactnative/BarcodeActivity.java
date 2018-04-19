package com.anyline.reactnative;

/*
 * Anyline React-Native Plugin
 * BarcodeActivity.java
 *
 * Copyright (c) 2018 Anyline GmbH
 *
 * Created by martin at 2015-07-21
 */

import android.graphics.Rect;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.RelativeLayout;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import at.nineyards.anyline.camera.AnylineViewConfig;
import at.nineyards.anyline.camera.CameraConfig;
import at.nineyards.anyline.camera.CameraController;
import at.nineyards.anyline.models.AnylineImage;
import at.nineyards.anyline.modules.barcode.BarcodeResult;
import at.nineyards.anyline.modules.barcode.BarcodeResultListener;
import at.nineyards.anyline.modules.barcode.BarcodeScanView;
import at.nineyards.anyline.util.TempFileUtil;

public class BarcodeActivity extends AnylineBaseActivity {
    private static final String TAG = BarcodeActivity.class.getSimpleName();

    private BarcodeScanView barcodeScanView;
    private TextView labelView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        barcodeScanView = new BarcodeScanView(this, null);
        RelativeLayout relativeLayout = new RelativeLayout(this);


        JSONObject viewConfig;
        try {
            viewConfig = new JSONObject(configJson);
            barcodeScanView.setConfig(new AnylineViewConfig(this, viewConfig));

            // set individual camera settings for this example by getting the current preferred settings and adapting them
            CameraConfig camConfig = barcodeScanView.getPreferredCameraConfig();
            setFocusConfig(viewConfig, camConfig);

        } catch (Exception e) {
            //JSONException or IllegalArgumentException is possible, return it to javascript
            finishWithError("error_invalid_json_data");
            return;
        }

        relativeLayout.addView(barcodeScanView, getTextLayoutParams());

        //add custom Label
        if(viewConfig.has("label")){
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
            public void onResult(BarcodeResult result) {


                JSONObject jsonResult = new JSONObject();
                try {

                    jsonResult.put("value", result.getResult());
                    jsonResult.put("format", result.getBarcodeFormat());
                    jsonResult.put("outline", jsonForOutline(result.getOutline()));
                    jsonResult.put("confidence", result.getConfidence());


                    File imageFile = TempFileUtil.createTempFileCheckCache(BarcodeActivity.this,
                            UUID.randomUUID().toString(), ".jpg");

                    result.getCutoutImage().save(imageFile, 90);
                    jsonResult.put("imagePath", imageFile.getAbsolutePath());

                    imageFile = TempFileUtil.createTempFileCheckCache(BarcodeActivity.this,
                            UUID.randomUUID().toString(), ".jpg");
                    result.getFullImage().save(imageFile, 90);
                    jsonResult.put("fullImagePath", imageFile.getAbsolutePath());


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


    @Override
    public void onCameraOpened(CameraController cameraController, int width, int height) {
        super.onCameraOpened(cameraController, width, height);
        barcodeScanView.post(new Runnable() {
            @Override
            public void run() {
                if (labelView != null) {
                    try {
                        Rect rect = barcodeScanView.getCutoutRect();
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

}
