package com.anyline.reactnative;

/**
 * Created by jonesBoi on 02.12.16.
 */

public class ResultReporter {

    private static OnResultListener listener;

    public static void setListener(OnResultListener listener) {
        ResultReporter.listener = listener;
    }

    public static void onResult(Object result, boolean isFinalResult) {
        if (listener != null) {
            listener.onResult(result, isFinalResult);
        }
    }

    public static void onError(String error) {
        if (listener != null) {
            listener.onError(error);
        }
    }

    public static void onCancel() {
        if (listener != null) {
            listener.onCancel();
        }
    }

    public interface OnResultListener {
        void onResult(Object result, boolean isFinalResult);
        void onError(String error);
        void onCancel();
    }
}

