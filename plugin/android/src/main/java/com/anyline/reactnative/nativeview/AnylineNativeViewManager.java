package com.anyline.reactnative.nativeview;

import android.widget.FrameLayout;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class AnylineNativeViewManager extends SimpleViewManager<FrameLayout> {
    public static final String REACT_CLASS = "AnylineNativeView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected FrameLayout createViewInstance(ThemedReactContext reactContext) {
        return new NativeFragmentContainerView(reactContext);
    }

    @Override
    public void onDropViewInstance(FrameLayout view) {
        // Remove view from registry
        NativeViewRegistry.remove(view);
        super.onDropViewInstance(view);
    }
}