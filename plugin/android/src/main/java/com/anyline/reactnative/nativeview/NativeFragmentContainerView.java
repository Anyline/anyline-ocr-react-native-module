
package com.anyline.reactnative.nativeview;

import android.content.Context;
import android.graphics.PixelFormat;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.FrameLayout;

public class NativeFragmentContainerView extends FrameLayout {
    NativeFragmentContainerView(Context context) {
        super(context);
        setLayoutParams(
                new WindowManager.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        WindowManager.LayoutParams.TYPE_APPLICATION,
                        WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED,
                        PixelFormat.TRANSLUCENT
                ));

        isHardwareAccelerated();

        // Generate a unique ID for the container
        int containerId = View.generateViewId();

        setId(containerId);

        NativeViewRegistry.register(String.valueOf(containerId), this);
    }

    @Override
    public void requestLayout() {
        super.requestLayout();
        post(measureAndLayoutRunnable);
    }

    private final Runnable measureAndLayoutRunnable = () -> {
        measure(MeasureSpec.makeMeasureSpec(getWidth(), MeasureSpec.EXACTLY),
                MeasureSpec.makeMeasureSpec(getHeight(), MeasureSpec.EXACTLY));
        layout(getLeft(), getTop(), getRight(), getBottom());
    };
}
