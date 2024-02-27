package com.anyline.reactnative.updateAsset;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import io.anyline2.legacy.products.IAnylineUpdateDelegate;

public class AnylineUpdateDelegateImpl implements IAnylineUpdateDelegate {

    private ReactContext reactContext;
    private Callback onUpdateError;
    private Callback onUpdateFinished;

    public AnylineUpdateDelegateImpl(
            ReactContext reactContext,
            Callback onUpdateError,
            Callback onUpdateFinished
    ) {
        this.reactContext = reactContext;
        this.onUpdateError = onUpdateError;
        this.onUpdateFinished = onUpdateFinished;
    }

    @Override
    public void onUpdateProgress(String s, float v) {
        sendUpdateEvent(v);
    }

    @Override
    public void onUpdateError(String s) {
        onUpdateError.invoke(s);
    }

    @Override
    public void onUpdateFinished() {
        onUpdateFinished.invoke();
    }

    private void sendUpdateEvent(float progress) {
        WritableMap params = Arguments.createMap();
        params.putDouble("progress", progress);

        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("ota_progress_update_event", params);
    }
}
