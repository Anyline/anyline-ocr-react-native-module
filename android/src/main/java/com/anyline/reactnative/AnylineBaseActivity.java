/*
 * Anyline React-Native Plugin
 * AnylineBaseActivity.java
 *
 * Copyright (c) 2017 9yards GmbH
 *
 */
package com.anyline.reactnative;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.WindowManager;

import at.nineyards.anyline.camera.CameraController;
import at.nineyards.anyline.camera.CameraOpenListener;

public abstract class AnylineBaseActivity extends Activity
        implements CameraOpenListener, Thread.UncaughtExceptionHandler {

    private static final String TAG = AnylineBaseActivity.class.getSimpleName();

    protected String licenseKey;
    protected String configJson;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        licenseKey = getIntent().getStringExtra(AnylineSDKPlugin.EXTRA_LICENSE_KEY);
        configJson = getIntent().getStringExtra(AnylineSDKPlugin.EXTRA_CONFIG_JSON);
    }

    /**
     * Always set this like this after the initAnyline: <br/>
     * scanView.getAnylineController().setWorkerThreadUncaughtExceptionHandler(this);<br/>
     * <br/>
     * This will forward background errors back to the plugin (and back to javascript from there)
     */
    @Override
    public void uncaughtException(Thread thread, Throwable e) {
        String msg = e.getMessage();
        Log.e(TAG, "Cached uncaught exception", e);

        String errorMessage;
        if (msg.contains("license") || msg.contains("License")) {
            errorMessage = "error_licence_invalid";
        } else {
            errorMessage = "error_occured";
        }

        finishWithError(errorMessage);
    }

    protected void finishWithError(String errorMessage) {

        Intent data = new Intent();
        data.putExtra(AnylineSDKPlugin.EXTRA_ERROR_MESSAGE, errorMessage);
        setResult(AnylineSDKPlugin.RESULT_ERROR, data);
        finish();
    }

    @Override
    public void onCameraOpened(CameraController cameraController, int width, int height) {
        Log.d(TAG, "Camera opened. Frame size " + width + " x " + height + ".");
    }

    @Override
    public void onCameraError(Exception e) {
        finishWithError("error_accessing_camera");
    }


    @Override
    public void onBackPressed() {
        ResultReporter.onCancel();
        super.onBackPressed();
    }


}
