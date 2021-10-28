package com.anyline.reactnative;

import org.json.JSONObject;

public class Offset {
    private int x;
    private int y;

    public Offset(JSONObject jsonObject) {
        this.x = jsonObject.optInt("x", 0);
        this.y = jsonObject.optInt("y", 0);
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }
}