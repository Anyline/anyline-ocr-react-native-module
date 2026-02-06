package com.anyline.reactnative;

import androidx.annotation.NonNull;

import com.anyline.reactnative.nativeview.AnylineNativeViewManager;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class AnylinePackage implements ReactPackage {

    private AnylineNativeViewManager viewManager = null;

    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        if (viewManager == null) {
            viewManager = new AnylineNativeViewManager();
        }
        return List.of(viewManager);
    }

    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new AnylineSDKPlugin(reactContext));
        return modules;
    }
}
