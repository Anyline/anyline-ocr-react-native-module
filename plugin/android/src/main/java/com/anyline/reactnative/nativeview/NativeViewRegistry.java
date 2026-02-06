package com.anyline.reactnative.nativeview;

import android.view.View;

import java.util.HashMap;
import java.util.Map;

public class NativeViewRegistry {
    private static final Map<String, View> registry = new HashMap<>();

    private NativeViewRegistry() {

    }

    public static void register(String id, View view) {
        registry.put(id, view);
    }

    public static View get(String id) {
        return registry.get(id);
    }

    public static View getLastOrNull() {
        if (registry.isEmpty()) {
            return null;
        } else {
            return (View) registry.values().toArray()[registry.size() - 1];
        }
    }

    public static void remove(String id) {
        registry.remove(id);
    }

    public static void remove(View view) {
        registry.values().removeIf(value -> (value == view));
    }
}
