package com.anyline.reactnative;

import org.json.JSONException;
import org.json.JSONObject;

public class RotateButtonConfig {
    private Offset offset = null;

    public RotateButtonConfig(JSONObject jsonObject) throws JSONException {
        if (jsonObject.has("offset")) {
            offset = new Offset(jsonObject.getJSONObject("offset"));
        }
    }

    public Offset getOffset() {
        return offset;
    }

    public boolean hasOffset() {
        return offset != null;
    }
}