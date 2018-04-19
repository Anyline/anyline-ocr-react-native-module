/*
 * Anyline React-Native Plugin
 * AnylineBaseActivity.java
 *
 * Copyright (c) 2017 Anyline GmbH
 *
 */
package com.anyline.reactnative;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.PointF;
import android.os.Bundle;
import android.util.Log;
import android.view.WindowManager;
import android.widget.RelativeLayout;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

import java.util.List;

import at.nineyards.anyline.camera.CameraConfig;
import at.nineyards.anyline.camera.CameraController;
import at.nineyards.anyline.camera.CameraFeatures;
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
	    ResultReporter.onError(errorMessage);
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

    protected String jsonForOutline(List<PointF> pointList) {

        JSONObject upLeft = new JSONObject();
        JSONObject upRight = new JSONObject();
        JSONObject downRight = new JSONObject();
        JSONObject downLeft = new JSONObject();
        JSONObject outline = new JSONObject();

        try {
            upLeft.put("x", pointList.get(0).x);
            upLeft.put("y", pointList.get(0).y);

            upRight.put("x", pointList.get(1).x);
            upRight.put("y", pointList.get(1).y);

            downRight.put("x", pointList.get(2).x);
            downRight.put("y", pointList.get(2).y);

            downLeft.put("x", pointList.get(3).x);
            downLeft.put("y", pointList.get(3).y);

            outline.put("upLeft", upLeft);
            outline.put("upRight", upRight);
            outline.put("downRight", downRight);
            outline.put("downLeft", downLeft);


        } catch (JSONException e) {
            Log.d(TAG, e.toString());
            e.printStackTrace();
        }

        return outline.toString();
    }


    protected TextView getLabelView(Context context) {

        TextView labelView = new TextView(context);

        try {
            JSONObject jsonObject = new JSONObject(configJson);
            JSONObject labelObject = jsonObject.getJSONObject("label");
            labelView.setText(labelObject.getString("text"));
            labelView.setTextColor(Color.parseColor("#" + labelObject.getString("color")));
            labelView.setTextSize(Float.parseFloat(labelObject.getString("size")));
        } catch (Exception e) {
            e.printStackTrace();
        }

        return labelView;
    }

    protected ArrayList getArrayListFromJsonArray(JSONArray jsonObject) {
        ArrayList<Double> listdata = new ArrayList<Double>();
        JSONArray jArray = jsonObject;
        try {
            for (int i = 0; i < jArray.length(); i++) {
                listdata.add(jArray.getDouble(i));
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return listdata;
    }


    protected RelativeLayout.LayoutParams getTextLayoutParams (){
        // Defining the RelativeLayout layout parameters.
        // In this case I want to fill its parent
        return new RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.MATCH_PARENT,
                RelativeLayout.LayoutParams.MATCH_PARENT);
    }

    protected RelativeLayout.LayoutParams getWrapContentLayoutParams (){
        RelativeLayout.LayoutParams lp = new RelativeLayout.LayoutParams(
                RelativeLayout.LayoutParams.WRAP_CONTENT,
                RelativeLayout.LayoutParams.WRAP_CONTENT);
        lp.addRule(RelativeLayout.ALIGN_PARENT_TOP);
        return lp;
    }


    protected void setFocusConfig (JSONObject json, CameraConfig camConfig) throws JSONException {

        if (json.has("focus")) {
            JSONObject focusConfig = json.getJSONObject("focus");

            // change default focus mode to auto (works better if cutout is not in the center)
            switch (focusConfig.getString("mode")) {
                case ("AUTO"):
                default:
                    camConfig.setFocusMode(CameraFeatures.FocusMode.AUTO);
                    break;
                case ("MACRO"):
                    camConfig.setFocusMode(CameraFeatures.FocusMode.MACRO);
                    break;
                case ("CONTINUOUS_PICTURE"):
                    camConfig.setFocusMode(CameraFeatures.FocusMode.CONTINUOUS_PICTURE);
                    break;
                case ("CONTINUOUS_VIDEO"):
                    camConfig.setFocusMode(CameraFeatures.FocusMode.CONTINUOUS_VIDEO);
                    break;
                case ("EDOF"):
                    camConfig.setFocusMode(CameraFeatures.FocusMode.EDOF);
                    break;
                case ("FIXED"):
                    camConfig.setFocusMode(CameraFeatures.FocusMode.FIXED);
                    break;
                case ("INFINITY"):
                    camConfig.setFocusMode(CameraFeatures.FocusMode.INFINITY);
                    break;
                case ("OFF"):
                    camConfig.setFocusMode(CameraFeatures.FocusMode.OFF);
                    break;
            }
            // autofocus is called in this interval (8000 is default)
            if(focusConfig.has("interval")){
                camConfig.setAutoFocusInterval(focusConfig.getInt("interval"));
            }
            // call autofocus if view is touched (true is default)
            if(focusConfig.has("touchEnabled")){
                camConfig.setFocusOnTouchEnabled(focusConfig.getBoolean("touchEnabled"));
            }
            // focus where the cutout is (true is default)
            if(focusConfig.has("regionEnabled")){
                camConfig.setFocusRegionEnabled(focusConfig.getBoolean("regionEnabled"));
            }
            // automatic exposure calculation based on where the cutout is (true is default)
            if(focusConfig.has("autoExposureRegionEnabled")){
                camConfig.setAutoExposureRegionEnabled(focusConfig.getBoolean("autoExposureRegionEnabled"));
            }
        }
    }

}
