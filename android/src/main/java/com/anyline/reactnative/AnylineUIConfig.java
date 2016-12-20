package com.anyline.reactnative;

import android.content.Context;
import android.graphics.Color;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class AnylineUIConfig {

    public static final String SEGMENT = "segment";
    public static final String SEGMENT_TITLES = "titles";
    public static final String SEGMENT_MODES = "modes";
    public static final String SEGMENT_TINT_COLOR = "tintColor";
    public static final String SEGMENT_OFFSET = "offset";
    public static final String SEGMENT_X = "x";
    public static final String SEGMENT_Y = "y";

    private ArrayList<String> titles = null;
    private ArrayList<String> modes = null;

    private int tintColor = 0;

    private int offsetX = 0;
    private int offsetY = 0;

    /**
     * Create config from the given json object.
     *
     * @param context    the context
     * @param jsonObject the json object with the settings
     */
    public AnylineUIConfig(Context context, JSONObject jsonObject) {
        initFromJsonObject(context, jsonObject);
    }

    private void initFromJsonObject(Context context, JSONObject json) {
        JSONObject segment = json.optJSONObject(SEGMENT);

        if (segment != null) {
            try {
                JSONArray titlesJson = segment.getJSONArray(SEGMENT_TITLES);
                JSONArray modesJson = segment.getJSONArray(SEGMENT_MODES);

                titles = new ArrayList<String>();
                modes = new ArrayList<String>();
                for (int i=0;i<titlesJson.length();i++){
                    titles.add(titlesJson.get(i).toString());
                    modes.add(modesJson.get(i).toString());
                }

                tintColor = Color.parseColor("#" + segment.optString(SEGMENT_TINT_COLOR));

                JSONObject offsetJson = segment.optJSONObject(SEGMENT_OFFSET);
                if (offsetJson != null) {
                    offsetX = offsetJson.optInt(SEGMENT_X);
                    offsetY = offsetJson.optInt(SEGMENT_Y);
                }

            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }

    public ArrayList<String> getTitles() {
        return titles;
    }

    public ArrayList<String> getModes() {
        return modes;
    }

    public int getTintColor() {
        return tintColor;
    }

    public int getOffsetX() {
        return offsetX;
    }

    public int getOffsetY() {
        return offsetY;
    }
}