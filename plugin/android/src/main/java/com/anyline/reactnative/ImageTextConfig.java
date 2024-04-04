package com.anyline.reactnative;

import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;

@Deprecated
public class ImageTextConfig {
    public String text = null;
    public boolean hasImage = false;
    public int imageResId = 0;

    public ImageTextConfig(Context context, JSONObject jsonObject) {
        if (jsonObject.has("text")) {
            text = jsonObject.optString("text", "");
        }

        if (jsonObject.has("image")) {
            imageResId = context.getResources().getIdentifier(jsonObject.optString("image", ""),
                    "drawable",
                    context.getPackageName());
            hasImage = true;
        }
    }

    protected Bitmap getBitmapFromAsset(Context context, String filePath) {
        AssetManager assetManager = context.getAssets();

        InputStream inputStream;
        Bitmap bitmap = null;
        try {
            inputStream = assetManager.open(filePath);
            bitmap = BitmapFactory.decodeStream(inputStream);
            inputStream.close();
        } catch (IOException e) {
            Log.e("ImageTextConfig", e.getMessage());
        }

        return bitmap;
    }

}
