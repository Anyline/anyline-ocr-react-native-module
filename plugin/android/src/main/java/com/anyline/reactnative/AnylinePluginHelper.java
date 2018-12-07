package com.anyline.reactnative;

import android.content.Context;
import android.util.Log;
import android.util.SparseArray;
import android.widget.Toast;

import com.google.android.gms.vision.barcode.Barcode;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import at.nineyards.anyline.modules.barcode.BarcodeScanView;
import at.nineyards.anyline.modules.barcode.NativeBarcodeResultListener;
import at.nineyards.anyline.util.AssetUtil;
import at.nineyards.anyline.util.TempFileUtil;
import io.anyline.plugin.ScanResult;
import io.anyline.plugin.meter.MeterScanMode;
import io.anyline.view.ScanView;

public class AnylinePluginHelper {

    private static final String TAG = AnylinePluginHelper.class.getSimpleName();;
    private static Toast notificationToast;

    public static JSONObject setLanguages(JSONObject json, Context context) {
        if (json.has("viewPlugin")) {
            try {
                JSONObject viewPlugin = json.getJSONObject("viewPlugin");
                if (viewPlugin != null && viewPlugin.has("plugin")) {

                    JSONObject plugin = viewPlugin.getJSONObject("plugin");
                    if (plugin != null && plugin.has("ocrPlugin")) {
                        JSONObject ocrScanPlugin = plugin.getJSONObject("ocrPlugin");
                        {
                            JSONArray tesseractArray = ocrScanPlugin.optJSONArray("languages");
                            JSONArray newLanguagesArray = new JSONArray();
                            if (tesseractArray != null) {
                                String[] languages = new String[tesseractArray.length()];
                                for (int i = 0; i < languages.length; i++) {
                                    long start = System.currentTimeMillis();

                                    String traineddataFilePath = tesseractArray.getString(i);
                                    String fileExtension = traineddataFilePath
                                            .substring(traineddataFilePath.lastIndexOf(".") + 1);

                                    // Check where to copy the training files
                                    File dirToCopy = new File(context.getFilesDir(),
                                            "anyline/module_anyline_ocr/tessdata/");
                                    if (Objects.equals(fileExtension, "any")) {
                                        dirToCopy = new File(context.getFilesDir(),
                                                "anyline/module_anyline_ocr/trained_models/");
                                    }

                                    int lastFileSeparatorIndex = traineddataFilePath.lastIndexOf(File.separator);
                                    int lastDotIndex = traineddataFilePath.lastIndexOf(".");
                                    if (lastDotIndex > lastFileSeparatorIndex) {
                                        // start after the "/" or with 0 if no fileseperator was found
                                        languages[i] = traineddataFilePath.substring(lastFileSeparatorIndex + 1);
                                    } else {
                                        // maybe it should just fail here, case propably not useful
                                        languages[i] = traineddataFilePath.substring(lastFileSeparatorIndex + 1);
                                    }
                                    newLanguagesArray.put(languages[i]);
                                    Log.d("languages", languages[i]);
                                    AssetUtil.copyAssetFileWithoutPath(context, traineddataFilePath, dirToCopy, false);
                                    Log.v(TAG, "Copy traineddata duration: " + (System.currentTimeMillis() - start));
                                }
                                ocrScanPlugin.put("languages", newLanguagesArray);

                            } else {
                                Log.d(TAG, "No Training Data");
                            }
                        }
                    }
                }
            } catch (JSONException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return json;
    }

    public static JSONObject jsonHelper(Anyline4Activity activity, ScanResult<?> scanResult, JSONObject jsonObject) {
        try {
            File imageFile = TempFileUtil.createTempFileCheckCache(activity, UUID.randomUUID().toString(), ".jpg");
            scanResult.getCutoutImage().save(imageFile, 90);

            jsonObject.put("imagePath", imageFile.getAbsolutePath());

            if(scanResult.getOutline() != null){
                jsonObject.put("outline", activity.jsonForOutline(scanResult.getOutline()));
            }
            if(scanResult.getConfidence() != null){
                jsonObject.put("confidence", scanResult.getConfidence());
            }

        } catch (IOException e) {
            Log.e(TAG, "Image file could not be saved.", e);

        } catch (JSONException jsonException) {
            // should not be possible
            Log.e(TAG, "Error while putting image path to json.", jsonException);
        }
        return jsonObject;
    }

    public static JSONObject wrapBarcodeInJson(Barcode b) {
        JSONObject json = new JSONObject();

        try {
            json.put("value", b.rawValue);
            json.put("format", findValidFormatForReference(b.format));
        } catch (JSONException jsonException) {
            // should not be possible
            Log.e(TAG, "Error while putting image path to json.", jsonException);
        }
        return json;
    }

    private static String findValidFormatForReference(int format) {
        if (format == Barcode.AZTEC) {
            return BarcodeScanView.BarcodeFormat.AZTEC.toString();
        }
        if (format == Barcode.CODABAR) {
            return BarcodeScanView.BarcodeFormat.CODABAR.toString();
        }
        if (format == Barcode.CODE_39) {
            return BarcodeScanView.BarcodeFormat.CODE_39.toString();
        }
        if (format == Barcode.CODE_93) {
            return BarcodeScanView.BarcodeFormat.CODE_93.toString();
        }
        if (format == Barcode.CODE_128) {
            return BarcodeScanView.BarcodeFormat.CODE_128.toString();
        }
        if (format == Barcode.DATA_MATRIX) {
            return BarcodeScanView.BarcodeFormat.DATA_MATRIX.toString();
        }
        if (format == Barcode.EAN_8) {
            return BarcodeScanView.BarcodeFormat.EAN_8.toString();
        }
        if (format == Barcode.EAN_13) {
            return BarcodeScanView.BarcodeFormat.EAN_13.toString();
        }
        if (format == Barcode.ITF) {
            return BarcodeScanView.BarcodeFormat.ITF.toString();
        }
        if (format == Barcode.PDF417) {
            return BarcodeScanView.BarcodeFormat.PDF_417.toString();
        }
        if (format == Barcode.QR_CODE) {
            return BarcodeScanView.BarcodeFormat.QR_CODE.toString();
        }
        if (format == Barcode.UPC_A) {
            return BarcodeScanView.BarcodeFormat.UPC_A.toString();
        }
        if (format == Barcode.UPC_E) {
            return BarcodeScanView.BarcodeFormat.UPC_E.toString();
        }

        // others are currently not supported by the native scanner (RSS_14,
        // RSS_EXPANDED, UPC_EAN_EXTENSION)
        return BarcodeScanView.BarcodeFormat.UNKNOWN.toString();

    }

    public static List<Barcode> nativeBarcodeList(ScanView anylineScanView) {
        final List<Barcode> barcodeList = new ArrayList<>();
        anylineScanView.getCameraView().enableBarcodeDetection(new NativeBarcodeResultListener() {
            @Override
            public void onBarcodesReceived(SparseArray<Barcode> barcodes) {
                if (barcodes.size() > 0) {
                    for (int i = 0; i < barcodes.size(); i++) {
                        if (!barcodeList.contains(barcodes.valueAt(i).rawValue)) {
                            barcodeList.add(barcodes.valueAt(i));
                        }
                    }

                }
            }
        });
        return barcodeList;
    }

    protected static void showToast(String st, Context context) {
        try {
            notificationToast.getView().isShown();
            notificationToast.setText(st);
        } catch (Exception e) {
            notificationToast = Toast.makeText(context, st, Toast.LENGTH_SHORT);
        }
        notificationToast.show();
    }

    // Meter helper
    public static JSONObject setMeterScanMode(MeterScanMode scanMode, JSONObject jsonResult) {
        try {
            switch (scanMode) {
            case DIGITAL_METER:
                jsonResult.put("meterType", "Digital Meter");
                break;
            case DIAL_METER:
                jsonResult.put("meterType", "Dial Meter");
                break;
            case ANALOG_METER:
                jsonResult.put("meterType", "Analog Meter");
                break;
            case AUTO_ANALOG_DIGITAL_METER:
                jsonResult.put("meterType", "Auto Analog Digital Meter");
                break;
            case SERIAL_NUMBER:
                jsonResult.put("meterType", "Serial Number");
                break;
            default:
                jsonResult.put("meterType", "Electric Meter");
                break;
            }

            jsonResult.put("scanMode", scanMode.toString());
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return jsonResult;
    }
}
