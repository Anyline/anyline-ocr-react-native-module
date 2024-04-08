package com.anyline.reactnative;

import org.json.JSONObject;

@Deprecated
public class InstructionConfig {
    public String text = null;
    public String textColor = null;
    public String backgroundColor = null;

    public InstructionConfig(JSONObject jsonObject) {
        text = jsonObject.optString("text", "");
        if (jsonObject.has("textColor")) {
            textColor = jsonObject.optString("textColor", "");
        }
        if (jsonObject.has("backgroundColor")) {
            backgroundColor = jsonObject.optString("backgroundColor", "");
        }
    }
}
