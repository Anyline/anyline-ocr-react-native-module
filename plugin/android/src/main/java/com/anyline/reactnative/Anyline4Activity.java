package com.anyline.reactnative;

import android.content.res.ColorStateList;
import android.graphics.Rect;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.RelativeLayout;

import com.google.android.gms.vision.barcode.Barcode;
import com.google.firebase.ml.vision.barcode.FirebaseVisionBarcode;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import at.nineyards.anyline.AnylineDebugListener;
import at.nineyards.anyline.camera.CameraController;
import at.nineyards.anyline.core.RunFailure;
import at.nineyards.anyline.core.Vector_Contour;
import at.nineyards.anyline.core.exception_error_codes;
import at.nineyards.anyline.modules.mrz.Identification;
import io.anyline.plugin.ScanResult;
import io.anyline.plugin.ScanResultListener;
import io.anyline.plugin.barcode.BarcodeScanResult;
import io.anyline.plugin.barcode.BarcodeScanViewPlugin;
import io.anyline.plugin.id.DrivingLicenseConfig;
import io.anyline.plugin.id.DrivingLicenseIdentification;
import io.anyline.plugin.id.GermanIdFrontConfig;
import io.anyline.plugin.id.GermanIdFrontIdentification;
import io.anyline.plugin.id.ID;
import io.anyline.plugin.id.IdScanPlugin;
import io.anyline.plugin.id.IdScanViewPlugin;
import io.anyline.plugin.id.MrzConfig;
import io.anyline.plugin.licenseplate.LicensePlateScanResult;
import io.anyline.plugin.licenseplate.LicensePlateScanViewPlugin;
import io.anyline.plugin.meter.MeterScanMode;
import io.anyline.plugin.meter.MeterScanResult;
import io.anyline.plugin.meter.MeterScanViewPlugin;
import io.anyline.plugin.ocr.OcrScanResult;
import io.anyline.plugin.ocr.OcrScanViewPlugin;
import io.anyline.view.ScanView;
import io.anyline.view.ScanViewPlugin;

public class Anyline4Activity extends AnylineBaseActivity {
    private static final String TAG = Anyline4Activity.class.getSimpleName();

    private ScanView anylineScanView;
    private ScanViewPlugin scanViewPlugin;
    private RadioGroup radioGroup;
    private AnylineUIConfig anylineUIConfig;
    private String cropAndTransformError;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // init the scan view
        anylineScanView = new ScanView(this, null);

        try {
            // start initialize anyline
            initAnyline();
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        setDebugListener();
    }

    @Override
    protected void onResume() {
        super.onResume();
        // start scanning
        anylineScanView.start();
    }

    @Override
    protected void onPause() {
        super.onPause();

        // stop scanning
        anylineScanView.stop();
        anylineScanView.releaseCameraInBackground();
    }

    private void setDebugListener() {
        if (scanViewPlugin != null) {
            scanViewPlugin.setDebugListener(new AnylineDebugListener() {
                @Override
                public void onDebug(String name, Object value) {

                    if (name.equals(AnylineDebugListener.BRIGHTNESS_VARIABLE_NAME)
                            && value.getClass().equals(AnylineDebugListener.BRIGHTNESS_VARIABLE_CLASS)) {
                        Double val = AnylineDebugListener.BRIGHTNESS_VARIABLE_CLASS.cast(value);

                        Log.d(TAG, name + ": " + val);
                    }
                    if (name.equals(CONTOURS_VARIABLE_NAME) && value.getClass().equals(CONTOURS_VARIABLE_CLASS)) {
                        Vector_Contour contour = CONTOURS_VARIABLE_CLASS.cast(value);
                        Log.d(TAG, name + ": " + contour.toString());
                    }

                }

                @Override
                public void onRunSkipped(RunFailure runFailure) {
                    // Show Toast, if cropAndTransform is on true, but not all corners are detected
                    if (runFailure != null
                            && runFailure.errorCode() == exception_error_codes.PointsOutOfCutout.swigValue()) {
                        AnylinePluginHelper.showToast(cropAndTransformError, getApplicationContext());
                    }
                    Log.w(TAG, "run skipped: " + runFailure);
                }
            });
        }
    }

    private void initAnyline() {
        try {
            JSONObject json = new JSONObject(configJson);
            // this is used for the OCR Plugin, when languages has to be added
            json = AnylinePluginHelper.setLanguages(json, getApplicationContext());
            anylineScanView.setScanConfig(json, licenseKey);
            if (anylineScanView != null) {
                scanViewPlugin = anylineScanView.getScanViewPlugin();
            }

            if (scanViewPlugin != null) {

                if (!(scanViewPlugin instanceof MeterScanViewPlugin)) {
                    setContentView(anylineScanView);
                }
                if (scanViewPlugin instanceof LicensePlateScanViewPlugin) {
                    if (json.has("reportingEnabled")) {
                        scanViewPlugin.setReportingEnabled(json.optBoolean("reportingEnabled", true));
                    }
                    scanViewPlugin.addScanResultListener(new ScanResultListener<LicensePlateScanResult>() {
                        @Override
                        public void onResult(LicensePlateScanResult licensePlateResult) {
                            JSONObject jsonResult = new JSONObject();
                            try {
                                jsonResult.put("country", licensePlateResult.getCountry());
                                jsonResult.put("licensePlate", licensePlateResult.getResult());

                                jsonResult = AnylinePluginHelper.jsonHelper(Anyline4Activity.this, licensePlateResult,
                                        jsonResult);
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }

                            setResult(scanViewPlugin, jsonResult);
                        }

                    });
                } else if (scanViewPlugin instanceof IdScanViewPlugin) {
                    if (((IdScanPlugin) scanViewPlugin.getScanPlugin()).getIdConfig() instanceof MrzConfig) {

                        if (json.has("cropAndTransformErrorMessage")) {
                            setDebugListener();
                            cropAndTransformError = json.getString("cropAndTransformErrorMessage");
                        }

                        scanViewPlugin.addScanResultListener(new ScanResultListener<ScanResult<ID>>() {
                            @Override
                            public void onResult(ScanResult<ID> idScanResult) {
                                JSONObject jsonResult = ((Identification) idScanResult.getResult()).toJSONObject();
                                try {
                                    if (jsonResult.get("issuingCountryCode").equals("D")
                                            && jsonResult.get("documentType").equals("ID")) {
                                        if (jsonResult.get("issuingCountryCode").equals("D")) {
                                            jsonResult.put("address", jsonResult.get("address"));
                                        } else {
                                            jsonResult.remove("address");
                                        }

                                    }
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }

                                try {
                                    jsonResult = AnylinePluginHelper.jsonHelper(Anyline4Activity.this, idScanResult,
                                            jsonResult);
                                } catch (Exception e) {
                                    Log.e(TAG, "Exception is: ", e);

                                }

                                setResult(scanViewPlugin, jsonResult);

                            }

                        });
                    } else if (((IdScanPlugin) scanViewPlugin.getScanPlugin())
                            .getIdConfig() instanceof DrivingLicenseConfig) {
                        scanViewPlugin.addScanResultListener(new ScanResultListener<ScanResult<ID>>() {
                            @Override
                            public void onResult(ScanResult<ID> idScanResult) {
                                JSONObject jsonResult = ((DrivingLicenseIdentification) idScanResult.getResult())
                                        .toJSONObject();

                                try {
                                    jsonResult = AnylinePluginHelper.jsonHelper(Anyline4Activity.this, idScanResult,
                                            jsonResult);
                                } catch (Exception e) {
                                    Log.e(TAG, "Exception is: ", e);

                                }

                                setResult(scanViewPlugin, jsonResult);

                            }

                        });
                    } else if (((IdScanPlugin) scanViewPlugin.getScanPlugin()).getIdConfig() instanceof GermanIdFrontConfig) {
                        scanViewPlugin.addScanResultListener(new ScanResultListener<ScanResult<ID>>() {
                            @Override
                            public void onResult(ScanResult<ID> idScanResult) {
                                JSONObject jsonResult = ((GermanIdFrontIdentification) idScanResult.getResult()).toJSONObject();

                                try {
                                    jsonResult = AnylinePluginHelper.jsonHelper(Anyline4Activity.this, idScanResult,
                                            jsonResult);
                                } catch (Exception e) {
                                    Log.e(TAG, "Exception is: ", e);

                                }
                                setResult(scanViewPlugin, jsonResult);
                            }
                        });
                    }

                } else if (scanViewPlugin instanceof OcrScanViewPlugin) {
                    if (json.has("reportingEnabled")) {
                        scanViewPlugin.setReportingEnabled(json.optBoolean("reportingEnabled", true));
                    }

                    scanViewPlugin.addScanResultListener(new ScanResultListener<OcrScanResult>() {
                        @Override
                        public void onResult(OcrScanResult ocrScanResult) {
                            JSONObject jsonResult = new JSONObject();
                            try {
                                jsonResult.put("text", ocrScanResult.getResult().trim());
                                jsonResult = AnylinePluginHelper.jsonHelper(Anyline4Activity.this, ocrScanResult,
                                        jsonResult);
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }
                            setResult(scanViewPlugin, jsonResult);

                        }

                    });

                } else if (scanViewPlugin instanceof BarcodeScanViewPlugin) {

                    scanViewPlugin.addScanResultListener(new ScanResultListener<BarcodeScanResult>() {
                        @Override
                        public void onResult(BarcodeScanResult barcodeScanResult) {
                            JSONObject jsonResult = new JSONObject();
                            try {

                                jsonResult.put("value", barcodeScanResult.getResult());
                                jsonResult.put("format", barcodeScanResult.getBarcodeFormat());
                                jsonResult = AnylinePluginHelper.jsonHelper(Anyline4Activity.this, barcodeScanResult,
                                        jsonResult);
                            } catch (JSONException e) {
                                e.printStackTrace();
                            }

                            setResult(scanViewPlugin, jsonResult);

                        }

                    });

                } else if (scanViewPlugin instanceof MeterScanViewPlugin) {
                    final JSONArray jsonArray = new JSONArray();
                    boolean nativeBarcodeEnabled = false;
                    if (json.has("reportingEnabled")) {
                        scanViewPlugin.setReportingEnabled(json.optBoolean("reportingEnabled", true));
                    }
                    if (json.has("nativeBarcodeEnabled")) {
                        nativeBarcodeEnabled = json.getBoolean("nativeBarcodeEnabled");
                    }
                    // create the radio button for the UI
                    createSegmentRadioButtonUI(json);

                    anylineScanView.setCameraOpenListener(this);
                    if (nativeBarcodeEnabled) {
                        List<FirebaseVisionBarcode> barcodeList = AnylinePluginHelper.nativeBarcodeList(anylineScanView, null);
                        for(int i=0; i< barcodeList.size(); i++) {
                            jsonArray.put(AnylinePluginHelper.wrapBarcodeInJson(barcodeList.get(i)));
                        }
                    }

                    scanViewPlugin.addScanResultListener(new ScanResultListener<MeterScanResult>() {
                        @Override
                        public void onResult(MeterScanResult meterScanResult) {
                            JSONObject jsonResult = new JSONObject();
                            try {
                                jsonResult = AnylinePluginHelper.setMeterScanMode(meterScanResult.getScanMode(),
                                        jsonResult);
                                jsonResult.put("reading", meterScanResult.getResult());

                                jsonResult = AnylinePluginHelper.jsonHelper(Anyline4Activity.this, meterScanResult,
                                        jsonResult);

                                if (jsonArray.length() > 0) {
                                    jsonResult.put("detectedBarcodes", jsonArray);
                                }

                            } catch (Exception e) {
                                Log.e(TAG, "EXCEPTION", e);

                            }

                            setResult(scanViewPlugin, jsonResult);
                        }
                    });
                }
            }

        } catch (Exception e) {
            // JSONException or IllegalArgumentException is possible for errors in json
            // IOException is possible for errors during asset copying
            finishWithError(
                    getString(getResources().getIdentifier("error_invalid_json_data", "string", getPackageName()))
                            + "\n" + e.getLocalizedMessage());
        }

    }

    // this method is used only for the meter scanning which contains radio buttons
    @Override
    public void onCameraOpened(CameraController cameraController, int width, int height) {
        super.onCameraOpened(cameraController, width, height);
        anylineScanView.post(new Runnable() {
            @Override
            public void run() {
                if (radioGroup != null) {
                    Rect rect = anylineScanView.getScanViewPlugin().getCutoutImageOnSurface();

                    RelativeLayout.LayoutParams lp = (RelativeLayout.LayoutParams) radioGroup.getLayoutParams();
                    lp.setMargins(rect.left + anylineUIConfig.getOffsetX(), rect.top + anylineUIConfig.getOffsetY(), 0,
                            0);
                    radioGroup.setLayoutParams(lp);

                    radioGroup.setVisibility(View.VISIBLE);
                }
            }
        });
    }

    private void createSegmentRadioButtonUI(JSONObject json) {

        final String scanModeString = ((MeterScanViewPlugin) scanViewPlugin).getScanMode().toString();
        anylineUIConfig = new AnylineUIConfig(this, json);

        // Creating a new RelativeLayout
        final RelativeLayout relativeLayout = new RelativeLayout(this);

        // Defining the RelativeLayout layout parameters.
        // In this case I want to fill its parent
        RelativeLayout.LayoutParams matchParentParams = new RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.MATCH_PARENT, RelativeLayout.LayoutParams.MATCH_PARENT);
        relativeLayout.addView(anylineScanView, matchParentParams);

        ArrayList<String> titles = anylineUIConfig.getTitles();
        final ArrayList<String> modes = anylineUIConfig.getModes();

        if (titles != null && titles.size() > 0) {

            if (titles.size() != modes.size()) {
                finishWithError(getString(getResources().getIdentifier("error_invalid_segment_config", "string",
                        getPackageName() + "Titles not mathcing with modes")));
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
                    ((MeterScanViewPlugin) scanViewPlugin).setScanMode(MeterScanMode.valueOf(mode));
                    anylineScanView.start();
                }
            });

            RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams(RelativeLayout.LayoutParams.WRAP_CONTENT,
                    RelativeLayout.LayoutParams.WRAP_CONTENT);
            lp.addRule(RelativeLayout.ALIGN_PARENT_TOP);

            radioGroup.setVisibility(View.INVISIBLE);

            relativeLayout.addView(radioGroup, lp);
        }
        setContentView(relativeLayout, matchParentParams);

    }

}

