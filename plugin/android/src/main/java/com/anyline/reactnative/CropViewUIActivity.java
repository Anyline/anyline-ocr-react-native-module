/*
 * Anyline
 * CropViewUIActivity.java
 *
 * Copyright (c) 2019 Anyline GmbH. All rights reserved.
 *
 * Created by Gerhard S. at 2019-09-18
 */

package com.anyline.reactnative;

import android.content.Intent;
import android.graphics.PointF;
import android.os.Bundle;
import android.view.WindowManager;

import java.util.ArrayList;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import io.anyline.view.CropViewUI;
import io.anyline.view.DocumentScanViewConfig;


public class CropViewUIActivity extends AppCompatActivity {


    private CropViewUI cropViewUI;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.rn_activity_crop_view_ui);

        //Set the flag to keep the screen on (otherwise the screen may go dark during scanning)
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        final ArrayList<PointF> corners = getIntent().getExtras().getParcelableArrayList(DocScanUIMainActivity.EXTRA_CORNERS);
        final String fullImagefilePath = getIntent().getExtras().getString(DocScanUIMainActivity.EXTRA_FULL_IMAGE_PATH);

        DocumentScanViewConfig documentScanViewConfig = DocScanUIMainActivity.initDocumentScanViewConfig(this);

        cropViewUI = findViewById(getResources().getIdentifier("crop_document_view_new", "id", getPackageName()));
        cropViewUI.init(documentScanViewConfig, fullImagefilePath, corners, savedInstanceState);

        cropViewUI.setCropViewUIListener(new CropViewUI.CropViewUIListener() {

            @Override
            public void onSave(String filePath, ArrayList<PointF> scaledCorners) {
                Intent data = new Intent();
                data.putParcelableArrayListExtra(CropViewUI.RESULT_CORNERS, scaledCorners);
                data.putExtra(CropViewUI.RESULT_CROPPED_IMAGE_PATH, filePath);
                CropViewUIActivity.this.setResult(RESULT_OK, data);
                CropViewUIActivity.this.finish();
            }

            @Override
            public void onCancel(String s) {
                CropViewUIActivity.this.finish();
            }

            ;
        });
    }


    @Override
    public void onSaveInstanceState(@NonNull Bundle savedInstanceState) {
        savedInstanceState = cropViewUI.addSavedInstanceState(savedInstanceState);
        super.onSaveInstanceState(savedInstanceState);
    }

}

