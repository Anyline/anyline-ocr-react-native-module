package com.anyline.reactnative;

import android.content.Context;

import org.json.JSONObject;

import java.io.IOException;

import io.anyline2.util.SoundUtil;

@Deprecated
public class FeedbackConfig {
    private SoundUtil soundUtil;
    public ImageTextConfig wrongFormat = null;
    public ImageTextConfig brightnessTooHigh = null;
    public ImageTextConfig brightnessTooLow = null;
    public ImageTextConfig distance = null;
    public String sound = null;

    public FeedbackConfig(Context context, JSONObject jsonObject) {
        if (jsonObject.has("format")) {
            wrongFormat = new ImageTextConfig(context, jsonObject.optJSONObject("format"));
        }

        if (jsonObject.has("distance")) {
            distance = new ImageTextConfig(context, jsonObject.optJSONObject("distance"));
        }

        if (jsonObject.has("brightness")) {
            JSONObject jsonBrightness = jsonObject.optJSONObject("brightness");
            if (jsonBrightness.has("too_high")) {
                brightnessTooHigh = new ImageTextConfig(context, jsonBrightness.optJSONObject("too_high"));
            }
            if (jsonBrightness.has("too_low")) {
                brightnessTooLow = new ImageTextConfig(context, jsonBrightness.optJSONObject("too_low"));
            }
        }

        if (jsonObject.has("sound")) {
            sound = jsonObject.optString("sound", "");
            soundUtil = new SoundUtil(context);
            try {
                soundUtil.loadSoundFromAssets(sound);
            } catch (IOException e) {
                soundUtil = null;
            }
        }

    }

    public void playBeepSound() {
        if (sound != null) {
            if (soundUtil != null) {
                soundUtil.playSound(sound);
            }
        }
    }

}
