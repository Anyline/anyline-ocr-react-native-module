/*
 * Anyline Cordova Plugin
 * EnergyActivity.java
 *
 * Copyright (c) 2015 9yards GmbH
 *
 * Created by martin at 2015-07-21
 */
package com.anyline.reactnative;

import android.content.res.ColorStateList;
import android.graphics.Rect;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.util.SparseArray;
import android.view.View;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.RelativeLayout;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.UUID;

import at.nineyards.anyline.camera.AnylineViewConfig;
import at.nineyards.anyline.camera.CameraController;
import at.nineyards.anyline.models.AnylineImage;
import at.nineyards.anyline.modules.barcode.NativeBarcodeResultListener;
import at.nineyards.anyline.modules.energy.EnergyResultListener;
import at.nineyards.anyline.modules.energy.EnergyScanView;
import at.nineyards.anyline.util.TempFileUtil;

public class EnergyActivity extends AnylineBaseActivity {
    private static final String TAG = EnergyActivity.class.getSimpleName();

    private EnergyScanView energyScanView;
    private RadioGroup radioGroup;
    private AnylineUIConfig anylineUIConfig;
    private String lastDetectedBarcodeValue;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        String scanModeString = getIntent().getStringExtra(AnylineSDKPlugin.EXTRA_SCAN_MODE);

        energyScanView = new EnergyScanView(this, null);

        JSONObject jsonObject;
        try {
            jsonObject = new JSONObject(configJson);
        } catch (Exception e) {
            //JSONException or IllegalArgumentException is possible, return it to javascript
            finishWithError("error_invalid_json_data");
            return;
        }

        energyScanView.setConfig(new AnylineViewConfig(this, jsonObject));
        if (jsonObject.has("reportingEnabled")) {
            energyScanView.setReportingEnabled(jsonObject.optBoolean("reportingEnabled", true));
        }
        energyScanView.setScanMode(EnergyScanView.ScanMode.valueOf(scanModeString));

        anylineUIConfig = new AnylineUIConfig(this, jsonObject);

        energyScanView.enableBarcodeDetection(true, new NativeBarcodeResultListener() {
            @Override
            public void onBarcodesReceived(SparseArray<com.google.android.gms.vision.barcode.Barcode> sparseArray) {

                if (sparseArray.size() > 0) {
                    lastDetectedBarcodeValue = sparseArray.valueAt(0).displayValue;
                }
            }
        });
        // Creating a new RelativeLayout
        final RelativeLayout relativeLayout = new RelativeLayout(this);

        // Defining the RelativeLayout layout parameters.
        // In this case I want to fill its parent
        RelativeLayout.LayoutParams matchParentParams = new RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.MATCH_PARENT,
                RelativeLayout.LayoutParams.MATCH_PARENT);

        relativeLayout.addView(energyScanView, matchParentParams);

        ArrayList<String> titles = anylineUIConfig.getTitles();
        final ArrayList<String> modes = anylineUIConfig.getModes();

        if (titles != null && titles.size() > 0) {

            if (titles.size() != modes.size()) {
                finishWithError("error_invalid_segment_config");
            }

            RadioButton[] radioButtons = new RadioButton[titles.size()];
            radioGroup = new RadioGroup(this);
            radioGroup.setOrientation(RadioGroup.VERTICAL);

            int currentApiVersion = android.os.Build.VERSION.SDK_INT;
            for (int i = 0; i < titles.size(); i++) {
                radioButtons[i] = new RadioButton(this);
                radioButtons[i].setText(titles.get(i));

                if (currentApiVersion >= Build.VERSION_CODES.LOLLIPOP) {
                    radioButtons[i].setButtonTintList(ColorStateList.valueOf(anylineUIConfig.getTintColor()));
                }

                radioGroup.addView(radioButtons[i]);
            }

            Integer modeIndex = modes.indexOf(scanModeString);
            RadioButton button = radioButtons[modeIndex];
            button.setChecked(true);

            radioGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
                @Override
                public void onCheckedChanged(RadioGroup group, int checkedId) {
                    View button = group.findViewById(checkedId);
                    String mode = modes.get(group.indexOfChild(button));
                    energyScanView.setScanMode(EnergyScanView.ScanMode.valueOf(mode));
                    energyScanView.startScanning();
                }
            });

            RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams(
                    RelativeLayout.LayoutParams.WRAP_CONTENT,
                    RelativeLayout.LayoutParams.WRAP_CONTENT);
            lp.addRule(RelativeLayout.ALIGN_PARENT_TOP);

            radioGroup.setVisibility(View.INVISIBLE);

            relativeLayout.addView(radioGroup, lp);
        }

        setContentView(relativeLayout, matchParentParams);

        initAnyline();
    }

    @Override
    protected void onResume() {
        super.onResume();

        energyScanView.startScanning();
    }

    @Override
    protected void onPause() {
        super.onPause();
        energyScanView.cancelScanning();
        energyScanView.releaseCameraInBackground();
    }

    @Override
    public void onCameraOpened(CameraController cameraController, int width, int height) {
        super.onCameraOpened(cameraController, width, height);
        energyScanView.post(new Runnable() {
            @Override
            public void run() {
                if (radioGroup != null) {
                    Rect rect = energyScanView.getCutoutRect();

                    RelativeLayout.LayoutParams lp = (RelativeLayout.LayoutParams) radioGroup.getLayoutParams();
                    lp.setMargins(rect.left + anylineUIConfig.getOffsetX(), rect.top + anylineUIConfig.getOffsetY(), 0, 0);
                    radioGroup.setLayoutParams(lp);

                    radioGroup.setVisibility(View.VISIBLE);
                }
            }
        });
    }

    private void initAnyline() {
        energyScanView.setCameraOpenListener(this);

        energyScanView.initAnyline(licenseKey, new EnergyResultListener() {

            @Override
            public void onResult(EnergyScanView.ScanMode scanMode, String result,
                                 AnylineImage resultImage, AnylineImage fullImage) {


                JSONObject jsonResult = new JSONObject();

                try {
                    switch (scanMode) {
                        case GAS_METER:
                            jsonResult.put("meterType", "Gas Meter");
                            break;
                        case WATER_METER_WHITE:
                        case WATER_METER_BLACK:
                            jsonResult.put("meterType", "Water Meter");
                            break;
                        case DIGITAL_METER:
                            jsonResult.put("meterType", "Digital Meter");
                            break;
                        case HEAT_METER_4:
                        case HEAT_METER_5:
                        case HEAT_METER_6:
                            jsonResult.put("meterType", "Heat Meter");
                            break;
                        case SERIAL_NUMBER:
                            jsonResult.put("meterType", "Serial Number");
                            break;
                        default:
                            jsonResult.put("meterType", "Electric Meter");
                            break;
                    }

                    jsonResult.put("scanMode", scanMode.toString());
                    jsonResult.put("reading", result);
                    jsonResult.put("barcodeResult", lastDetectedBarcodeValue);
                    File imageFile = TempFileUtil.createTempFileCheckCache(EnergyActivity.this,
                            UUID.randomUUID().toString(), ".jpg");

                    resultImage.save(imageFile, 90);
                    jsonResult.put("imagePath", imageFile.getAbsolutePath());

                    if (fullImage != null) {
                        imageFile = TempFileUtil.createTempFileCheckCache(EnergyActivity.this,
                                UUID.randomUUID().toString(), ".jpg");
                        fullImage.save(imageFile, 90);
                        jsonResult.put("fullImagePath", imageFile.getAbsolutePath());
                    }

                } catch (IOException e) {
                    Log.e(TAG, "Image file could not be saved.", e);

                } catch (JSONException jsonException) {
                    //should not be possible
                    Log.e(TAG, "Error while putting image path to json.", jsonException);
                }


                if (energyScanView.getConfig().isCancelOnResult()) {
                    ResultReporter.onResult(jsonResult, true);
                    setResult(AnylineSDKPlugin.RESULT_OK);
                    finish();
                } else {
                    ResultReporter.onResult(jsonResult, false);
                }
            }
        });

        energyScanView.getAnylineController().setWorkerThreadUncaughtExceptionHandler(this);
    }

}
