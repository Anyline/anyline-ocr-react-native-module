package com.anyline.reactnative.updateAsset;

import android.content.Context;

import org.json.JSONException;
import org.json.JSONObject;

import javax.annotation.Nullable;

import io.anyline.products.ProductContext;
import io.anyline.trainer.AssetContext;
import io.anyline.trainer.ProjectContext;

public class AssetContextJsonParser {

    @Nullable
    public AssetContext parseJson(Context context, String json) throws JSONException {
        JSONObject jsonObject = new JSONObject(json);

        if (jsonObject.has("projectID")) {
            return new ProjectContext(context, jsonObject);
        }
        if (jsonObject.has("product")) {
            return new ProductContext(context, jsonObject);
        }
        throw new IllegalStateException("Neither 'projectID'  nor 'product' was provided in the configuration JSON!");
    }
}
