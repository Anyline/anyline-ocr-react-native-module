package com.anyline.reactnative;

import org.json.JSONException;
import org.json.JSONObject;

public class RotateButtonConfig {
    private String alignment = "";
    private Offset offset = null;

    public RotateButtonConfig(JSONObject jsonObject) {
        alignment = jsonObject.optString("alignment", "");
        if (jsonObject.has("offset")) {
            try {
                offset = new Offset(jsonObject.getJSONObject("offset"));
            }
            catch (JSONException e) {

            }
        }
    }

    public String getAlignment() {
        return alignment;
    }
    public Offset getOffset() {
        return offset;
    }

    public boolean hasOffset() {
        return offset != null;
    }
}