package com.anyline.reactnative;

import static com.anyline.reactnative.AnylineSDKPlugin.EXTRA_CONFIG_JSON;
import static com.anyline.reactnative.AnylineSDKPlugin.EXTRA_ERROR_MESSAGE;
import static com.anyline.reactnative.AnylineSDKPlugin.RESULT_ERROR;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.graphics.Rect;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Pair;
import android.view.View;
import android.view.Gravity;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.coordinatorlayout.widget.CoordinatorLayout;

import com.anyline.reactnative.databinding.ActivityScanBinding;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Timer;
import java.util.TimerTask;

import io.anyline2.ScanResult;
import io.anyline2.view.ScanView;
import io.anyline2.viewplugin.ScanViewPlugin;
import io.anyline2.viewplugin.ViewPluginBase;

public class ScanActivity extends AppCompatActivity {

    private static final String KEY_DEFAULT_ORIENTATION_APPLIED = "default_orientation_applied";

    private Handler handler = new Handler(Looper.getMainLooper());
    private ActivityScanBinding binding;
    private ScanView scanView;

    private float dpFactor = 0;
    private boolean defaultOrientationApplied;
    private int orientation;

    @Deprecated
    private InstructionConfig instructionConfig = null;
    @Deprecated
    private ImageTextConfig imageCutoutConfig = null;
    @Deprecated
    private FeedbackConfig feedbackConfig = null;

    @Deprecated
    private long cleanUIFeedbackIntervalMills = 2000L;
    @Deprecated
    private Timer cleanUIFeedbackTimer = null;

    @Deprecated
    private static final String FEEDBACK_SCANINFO_LIGHTINGCONDITION = "$lightingCondition";
    @Deprecated
    private static final String FEEDBACK_SCANINFO_LIGHTINGCONDITION_TOODARK = "TOODARK";
    @Deprecated
    private static final String FEEDBACK_SCANINFO_LIGHTINGCONDITION_TOOBRIGHT = "TOOBRIGHT";
    @Deprecated
    private static final int FEEDBACK_RUNSKIPPED_WRONGFORMAT = 5006;
    @Deprecated
    private static final int FEEDBACK_RUNSKIPPED_WRONGDATE = 5027;
    @Deprecated
    private static final int FEEDBACK_RUNSKIPPED_TOOCLOSE = 5023;
    @Deprecated
    private static final int FEEDBACK_RUNSKIPPED_TOOFAR = 5024;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityScanBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        dpFactor = getResources().getDisplayMetrics().density;

        orientation = this.getResources().getConfiguration().orientation;

        scanView = binding.scanView;

        if (savedInstanceState != null) {
            defaultOrientationApplied = savedInstanceState.getBoolean(KEY_DEFAULT_ORIENTATION_APPLIED);
        }

        if (getIntent().hasExtra(EXTRA_CONFIG_JSON)) {
            // TODO check for throws clauses
            try {
                JSONObject configJSON = new JSONObject(getIntent().getStringExtra(EXTRA_CONFIG_JSON));

                applyDefaultOrientation(configJSON);
                setupChangeOrientationButton(configJSON);
                setupCustomUIFeedback(configJSON);

                scanView.init(configJSON);

                ViewPluginBase viewPluginBase = scanView.getScanViewPlugin();

                observeUIFeedbackEvents(viewPluginBase);

                viewPluginBase.resultReceived = scanResult -> {
                    setResult(AnylineSDKPlugin.RESULT_OK);
                    JSONObject resultObject = getResultWithImagePath(scanResult);
                    ResultReporter.onResult(resultObject.toString(), true);
                    finish();
                };

                viewPluginBase.resultsReceived = scanResults -> {
                    JSONArray resultJSONArray = new JSONArray();

                    for (ScanResult scanResult : scanResults) {
                        JSONObject resultObject = getResultWithImagePath(scanResult);
                        resultJSONArray.put(resultObject);
                    }
                    setResult(AnylineSDKPlugin.RESULT_OK);
                    ResultReporter.onResult(resultJSONArray.toString(), true);
                    finish();
                };
            } catch (JSONException e) {
                finishWithError("Error parsing view config: " + e.getMessage());
            }
        } else {
            finishWithError("View config not found");
        }
    }

    private void applyDefaultOrientation(JSONObject configJSON) {
        if (defaultOrientationApplied) return;

        JSONObject optionsJsonObject = configJSON.optJSONObject("options");

        if (optionsJsonObject != null) {
            String defaultOrientationJsonString = optionsJsonObject.optString("defaultOrientation", "");

            if ("portrait".equals(defaultOrientationJsonString)) {
                setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
            } else if ("landscape".equals(defaultOrientationJsonString)) {
                setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
            }
        }
        defaultOrientationApplied = true;
    }

    private void setupChangeOrientationButton(JSONObject configJSON) {
        binding.layoutChangeOrientation.setVisibility(View.GONE);
        JSONObject optionsJsonObject = configJSON.optJSONObject("options");

        if (optionsJsonObject != null) {

            JSONObject rotateButtonJson = optionsJsonObject.optJSONObject("rotateButton");
            if (rotateButtonJson != null) {
                RotateButtonConfig rotateButtonConfig = new RotateButtonConfig(rotateButtonJson);

                CoordinatorLayout.LayoutParams buttonLayoutParams = new CoordinatorLayout.LayoutParams(
                        CoordinatorLayout.LayoutParams.WRAP_CONTENT,
                        CoordinatorLayout.LayoutParams.WRAP_CONTENT);

                buttonLayoutParams.gravity = Gravity.TOP | Gravity.RIGHT;
                String alignment = rotateButtonConfig.getAlignment();
                if (alignment.length() > 0) {
                    if (alignment.equals("top_left")) {
                        buttonLayoutParams.gravity = Gravity.TOP | Gravity.LEFT;
                    }
                    if (alignment.equals("top_right")) {
                        buttonLayoutParams.gravity = Gravity.TOP | Gravity.RIGHT;
                    }
                    if (alignment.equals("bottom_left")) {
                        buttonLayoutParams.gravity = Gravity.BOTTOM | Gravity.LEFT;
                    }
                    if (alignment.equals("bottom_right")) {
                        buttonLayoutParams.gravity = Gravity.BOTTOM | Gravity.RIGHT;
                    }
                }
                if (rotateButtonConfig.hasOffset()) {
                    buttonLayoutParams.setMargins(rotateButtonConfig.getOffset().getX(), rotateButtonConfig.getOffset().getY(), 0, 0);
                }
                binding.layoutChangeOrientation.setLayoutParams(buttonLayoutParams);
                binding.layoutChangeOrientation.requestLayout();

                binding.layoutChangeOrientation.setVisibility(View.VISIBLE);
                binding.imageviewChangeOrientation.setOnClickListener(v -> {
                    if (orientation == ActivityInfo.SCREEN_ORIENTATION_PORTRAIT) {
                        orientation = ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE;
                        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
                    } else {
                        orientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT;
                        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
                    }
                });
            }
        }
    }

    @Deprecated
    private void observeUIFeedbackEvents(ViewPluginBase viewPluginBase) {
        viewPluginBase.scanInfoReceived = jsonObject -> {
            if (jsonObject.optString("name", "").equals(FEEDBACK_SCANINFO_LIGHTINGCONDITION)) {
                String lightingConditionValue = jsonObject.optString("value", "");
                if (feedbackConfig != null) {
                    if (lightingConditionValue.equalsIgnoreCase(FEEDBACK_SCANINFO_LIGHTINGCONDITION_TOODARK)) {
                        if (feedbackConfig.brightnessTooLow != null) {
                            updateUIFeedback(feedbackConfig.brightnessTooLow);
                        }
                    }
                    else if (lightingConditionValue.equalsIgnoreCase(FEEDBACK_SCANINFO_LIGHTINGCONDITION_TOOBRIGHT)) {
                        if (feedbackConfig.brightnessTooHigh != null) {
                            updateUIFeedback(feedbackConfig.brightnessTooHigh);
                        }
                    }
                }
            }
        };

        viewPluginBase.runSkippedReceived = jsonObject -> {
            if (feedbackConfig != null) {
                if (jsonObject.optInt("code", 0) == FEEDBACK_RUNSKIPPED_WRONGFORMAT
                        || jsonObject.optInt("code", 0) == FEEDBACK_RUNSKIPPED_WRONGDATE) {
                    if (feedbackConfig.wrongFormat != null) {
                        updateUIFeedback(feedbackConfig.wrongFormat);
                    }
                }
                if (jsonObject.optInt("code", 0) == FEEDBACK_RUNSKIPPED_TOOCLOSE
                        || jsonObject.optInt("code", 0) == FEEDBACK_RUNSKIPPED_TOOFAR) {
                    if (feedbackConfig.distance != null) {
                        updateUIFeedback(feedbackConfig.distance);
                    }
                }
            }
        };
    }

    @Deprecated
    private void setupCustomUIFeedback(JSONObject configJSON) {
        JSONObject optionsJsonObject = configJSON.optJSONObject("options");
        if (optionsJsonObject != null) {
            try {
                if (optionsJsonObject.has("instruction")) {
                    instructionConfig = new InstructionConfig(optionsJsonObject.getJSONObject("instruction"));
                }
                if (optionsJsonObject.has("imageCutout")) {
                    imageCutoutConfig = new ImageTextConfig(this, optionsJsonObject.getJSONObject("imageCutout"));
                }
                if (optionsJsonObject.has("feedback")) {
                    feedbackConfig = new FeedbackConfig(this, optionsJsonObject.getJSONObject("feedback"));
                }
            }
            catch (JSONException e) {
                finishWithError("Error setting up UI Feedback: " + e.getMessage());
                return;
            }

            if (instructionConfig != null) {
                if (instructionConfig.text != null) {
                    binding.textviewInstruction.setText(instructionConfig.text);
                }
                if (instructionConfig.textColor != null) {
                    binding.textviewInstruction.setTextColor(Color.parseColor("#" + instructionConfig.textColor));
                }
                if (instructionConfig.backgroundColor != null) {
                    binding.textviewInstruction.setBackgroundColor(Color.parseColor("#" + instructionConfig.backgroundColor));
                }
            }

            if (imageCutoutConfig != null) {
                if (imageCutoutConfig.hasImage) {
                    binding.imageviewCutoutOverlay.setImageResource(imageCutoutConfig.imageResId);
                }
            }

        }

        scanView.onCutoutChanged = cutouts -> {
            Pair<ScanViewPlugin, android.graphics.Rect> firstCutout = cutouts.get(0);

            ScanViewPlugin scanViewPlugin = firstCutout.first;
            if (scanViewPlugin != null) {
                Rect rect = firstCutout.second;
                if (rect != null) {
                    if (instructionConfig != null) {
                        CoordinatorLayout.LayoutParams instructionLayoutParams =
                                new CoordinatorLayout.LayoutParams(rect.width(), rect.top);
                        instructionLayoutParams.setMargins(rect.left, 0, rect.right, rect.top);
                        binding.layoutInstruction.setVisibility(View.VISIBLE);
                        binding.layoutInstruction.setLayoutParams(instructionLayoutParams);
                        binding.layoutInstruction.requestLayout();
                    }

                    if (imageCutoutConfig != null) {
                        CoordinatorLayout.LayoutParams imageCutoutLayoutParams =
                                new CoordinatorLayout.LayoutParams(rect.width(), rect.height());
                        imageCutoutLayoutParams.setMargins(rect.left, rect.top, rect.right, rect.bottom);
                        binding.imageviewCutoutOverlay.setVisibility(View.VISIBLE);
                        binding.imageviewCutoutOverlay.setLayoutParams(imageCutoutLayoutParams);
                        binding.imageviewCutoutOverlay.requestLayout();
                    }

                    if (feedbackConfig != null) {
                        CoordinatorLayout.LayoutParams feedbackLayoutParams =
                                new CoordinatorLayout.LayoutParams(rect.width(), scanView.getHeight() - rect.bottom);
                        feedbackLayoutParams.setMargins(rect.left, rect.bottom, rect.right, scanView.getBottom());
                        binding.layoutBrightDistanceFeedback.setVisibility(View.VISIBLE);
                        binding.layoutBrightDistanceFeedback.setLayoutParams(feedbackLayoutParams);
                        binding.layoutBrightDistanceFeedback.requestLayout();
                    }
                }
            }
        };
    }

    @Deprecated
    private void updateUIFeedback(ImageTextConfig imageTextFeedback) {
        if (imageTextFeedback.text != null) {
            if (binding.textviewBrightDistanceFeedback.getText().equals(imageTextFeedback.text)) {
                return;
            }
        }

        handler.post(() -> {
            if (imageTextFeedback.text != null) {
                binding.textviewBrightDistanceFeedback.setText(imageTextFeedback.text);
            }
            if (imageTextFeedback.hasImage) {
                binding.imageviewBrightDistanceFeedback.setImageResource(imageTextFeedback.imageResId);
            }

            if (feedbackConfig != null) {
                if (feedbackConfig.sound != null) {
                    feedbackConfig.playBeepSound();
                }
            }

            if (cleanUIFeedbackTimer != null) {
                cleanUIFeedbackTimer.cancel();
            }
            cleanUIFeedbackTimer = new Timer();
            cleanUIFeedbackTimer.schedule(new TimerTask() {
                @Override
                public void run() {
                    handler.post(() -> {
                        binding.textviewBrightDistanceFeedback.setText("");
                        binding.imageviewBrightDistanceFeedback.setImageBitmap(null);
                    });
                }
            }, cleanUIFeedbackIntervalMills);
        });
    }

    @NonNull
    private JSONObject getResultWithImagePath(ScanResult scanResult) {
        JSONObject resultObject = scanResult.getResult();

        try {
            String fullImagePath = scanResult.getImage().save();
            String cutoutImagePath = scanResult.getCutoutImage().save();
            resultObject.put("fullImagePath", fullImagePath);
            resultObject.put("imagePath", cutoutImagePath);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return resultObject;
    }

    private void finishWithError(String errorMessage) {
        Intent intent = new Intent();
        intent.putExtra(EXTRA_ERROR_MESSAGE, errorMessage);
        setResult(RESULT_ERROR, intent);
        finish();
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putBoolean(KEY_DEFAULT_ORIENTATION_APPLIED, defaultOrientationApplied);
    }

    @Override
    protected void onResume() {
        super.onResume();
        scanView.start();
    }

    @Override
    protected void onPause() {
        scanView.stop();
        scanView.getCameraView().releaseCameraInBackground();
        super.onPause();
    }

    @Override
    public void onBackPressed() {
        ResultReporter.onCancel();
        super.onBackPressed();
    }
}
