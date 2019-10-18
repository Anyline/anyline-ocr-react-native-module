/*
 * Anyline
 * DocumentScanViewUIActivity.java
 *
 * Copyright (c) 2019 Anyline GmbH. All rights reserved.
 *
 * Created by Gerhard S. at 2019-09-05
 */

package com.anyline.reactnative;

import android.content.Intent;
import android.os.Bundle;
import android.view.WindowManager;

import org.json.JSONObject;

import java.util.ArrayList;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import io.anyline.view.DocumentScanViewConfig;
import io.anyline.view.DocumentScanViewUI;
import io.anyline.view.ScanPage;


public class DocumentScanViewUIActivity extends AppCompatActivity {

    private io.anyline.view.DocumentScanViewUI documentScanViewUI;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.rn_activity_document_scan_view_ui);

        String licenseKey = getIntent().getExtras().getString("License");
        String configJson = getIntent().getExtras().getString("Config");

        // convert json string to json object:
        JSONObject obj = null;
        try {
            obj = new JSONObject(configJson);
        } catch (Throwable t) {
            //Log.e("My App", "Could not parse malformed JSON: \"" + json + "\"");
        }

        // init the documentScanViewUI from the layout file:
        documentScanViewUI = findViewById(R.id.document_scan_view_ui);

        // initialize the documentScanViewConfig from a scan-view config file:
        DocumentScanViewConfig documentScanViewConfig = new DocumentScanViewConfig(this, "document_scan_view_config.json");

        documentScanViewUI.init(licenseKey, documentScanViewConfig, obj, savedInstanceState);
        documentScanViewUI.setDocumentScanViewListener(new DocumentScanViewUI.DocumentScanViewListener() {

            @Override
            public void onSave(ArrayList<ScanPage> scannedPages) {
                documentScanViewUI.stopScanning();

                // pass a list of scanned pages to the calling activity:
                Intent data = new Intent();
                data.putExtra(DocScanUIMainActivity.RESULT_PAGES, scannedPages);
                DocumentScanViewUIActivity.this.setResult(DocScanUIMainActivity.RESULT_SWITCH, data);
                DocumentScanViewUIActivity.this.finish();
            }

            @Override
            public void onCancel() {
                DocumentScanViewUIActivity.this.finish();
            }
        });
    }


    @Override
    public void onSaveInstanceState(@NonNull Bundle savedInstanceState) {
        // save state of activity before an activity is paused:
        savedInstanceState = documentScanViewUI.addSavedInstanceState(savedInstanceState);
        super.onSaveInstanceState(savedInstanceState);
    }


    @Override
    protected void onResume() {
        // is required, otherwise scanning will not happen:
        super.onResume();
        documentScanViewUI.startScanning();
    }


    @Override
    protected void onPause() {
        super.onPause();
        documentScanViewUI.stopScanning();
    }


    @Override
    public void onBackPressed() {
        // back button collapses bottom sheet if this is open
        if (documentScanViewUI.isBottomSheetExpanded()) {
            documentScanViewUI.collapseBottomSheet();
        } else {
            super.onBackPressed();
        }
    }
}
