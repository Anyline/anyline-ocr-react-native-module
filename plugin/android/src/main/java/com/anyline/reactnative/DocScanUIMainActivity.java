package com.anyline.reactnative;


import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.PointF;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import java.io.File;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import io.anyline.view.DocumentScanViewConfig;
import io.anyline.view.ScanPage;

import static android.preference.PreferenceManager.getDefaultSharedPreferences;


public class DocScanUIMainActivity extends AnylineBaseActivity {

    private static final String TAG = DocScanUIMainActivity.class.getSimpleName();

    public static final int REQUEST_CODE_SCAN = 1;
    public static final int REQUEST_CODE_PERMISSION_CAMERA = 1;
    private static final int CROP_DOCUMENT_REQUEST = 2;
    public static final int RESULT_SWITCH = 3;

    public static final String RESULT_CROPPED_IMAGE_PATH = "RESULT_CROPPED_IMAGE_PATH";
    public static final String RESULT_CORNERS = "RESULT_CORNERS";
    public static final String EXTRA_FULL_IMAGE_PATH = "EXTRA_FULL_IMAGE_PATH";
    public static final String EXTRA_CORNERS = "EXTRA_CORNERS";
    public static final String RESULT_PAGES = "RESULT_PAGES";

    private String[] fullImagePath = null;
    private String[] croppedImagePath = null;
    private List<PointF>[] corners = null;

    private int selectedPosition;
    private String licenseKey;
    private String configJson;

    ListView lv;

    Button btScan;

    int imageWidth;
    int imageHeight;
    String sImageWidth;
    String sImageHeight;



    public static DocumentScanViewConfig initDocumentScanViewConfig(Context context) {
        DocumentScanViewConfig documentScanViewConfig;
        SharedPreferences prefs = getDefaultSharedPreferences(context);
        documentScanViewConfig = new DocumentScanViewConfig(context, "document_scan_view_config.json"); // values from json
        return documentScanViewConfig;

    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_doc_scan_ui_main);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);

        licenseKey = getIntent().getStringExtra(AnylineSDKPlugin.EXTRA_LICENSE_KEY);
        configJson = getIntent().getStringExtra(AnylineSDKPlugin.EXTRA_CONFIG_JSON);

        ActivityCompat.requestPermissions(DocScanUIMainActivity.this,
                                          new String[]{Manifest.permission.CAMERA}, REQUEST_CODE_PERMISSION_CAMERA);

        lv = (ListView) findViewById(R.id.list);

        btScan = findViewById(R.id.btScan);
        btScan.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent scanActivityIntent = new Intent(DocScanUIMainActivity.this, DocumentScanViewUIActivity.class);
                Bundle b = new Bundle();
                b.putString("License", licenseKey);
                b.putString("Config", configJson);
                scanActivityIntent.putExtras(b);
                startActivityForResult(scanActivityIntent, REQUEST_CODE_SCAN);
            }
        });
    }


    @Override
    protected void onResume() {
        super.onResume();
    }


    private void displayScannedPages(Intent data) {
        ArrayList<ScanPage> scanPages;
        scanPages = (ArrayList<ScanPage>) data.getSerializableExtra(RESULT_PAGES);

        fullImagePath = new String[scanPages.size()];
        croppedImagePath = new String[scanPages.size()];
        corners = new List[scanPages.size()];

        for (int i = 0; i < scanPages.size(); i++) {
            fullImagePath[i] = scanPages.get(i).getFullImagePath();
            croppedImagePath[i] = scanPages.get(i).getCroppedImagePath();
            corners[i] = scanPages.get(i).getTransformationPoints();
        }

        MySimpleArrayAdapter adapter = new MySimpleArrayAdapter(this, fullImagePath);
        lv.setAdapter(adapter);
    }


    public class MySimpleArrayAdapter extends ArrayAdapter<String> {
        private final String[] values;
        private int layout;

        public MySimpleArrayAdapter(Context context, String[] values) {
            super(context, R.layout.activity_doc_scan_ui_main_list_item, values);
            this.values = values;
            layout = R.layout.activity_doc_scan_ui_main_list_item;
        }

        private class ViewHolder {
            ImageView ivFullImage;
            ImageView ivCroppedImage;
            TextView tvSizeFullImage;
            TextView tvSizeCroppedImage;
        }

        @NonNull
        @Override
        public View getView(final int position, View convertView, @NonNull ViewGroup parent) {
            ViewHolder viewHolder;
            if (convertView == null) {
                LayoutInflater inflater = LayoutInflater.from(getContext());
                convertView = inflater.inflate(layout, parent, false);
                viewHolder = new ViewHolder();

                viewHolder.ivFullImage = (ImageView) convertView.findViewById(R.id.ivFullImage);
                viewHolder.ivCroppedImage = (ImageView) convertView.findViewById(R.id.ivCroppedImage);
                viewHolder.tvSizeFullImage = convertView.findViewById(R.id.tvSizeFullImage);
                viewHolder.tvSizeCroppedImage = convertView.findViewById(R.id.tvSizeCroppedImage);

                convertView.setTag(viewHolder);
            } else {
                viewHolder = (ViewHolder) convertView.getTag();
            }

            viewHolder.ivFullImage.setTag(position);
            viewHolder.ivCroppedImage.setTag(position);

            File croppedImgFile = new File(croppedImagePath[position]);
            final File fullImgFile = new File(values[position]);

            // draw small red circles on the fullBitmap, indicating the corners:
            if (fullImgFile.exists()) {
                Bitmap fullBitmap = BitmapFactory.decodeFile(fullImgFile.getAbsolutePath());
                Bitmap drawableBitmap = fullBitmap.copy(Bitmap.Config.ARGB_8888, true);

                Canvas canvas = new Canvas(drawableBitmap);
                Paint paint = new Paint();
                paint.setColor(Color.RED);
                paint.setStrokeWidth(4);
                canvas.drawBitmap(drawableBitmap, new Matrix(), null);
                canvas.drawCircle(corners[position].get(0).x, corners[position].get(0).y, 12, paint);
                canvas.drawCircle(corners[position].get(1).x, corners[position].get(1).y, 12, paint);
                canvas.drawCircle(corners[position].get(2).x, corners[position].get(2).y, 12, paint);
                canvas.drawCircle(corners[position].get(3).x, corners[position].get(3).y, 12, paint);

                viewHolder.ivFullImage.setImageBitmap(drawableBitmap);
            }
            if (croppedImgFile.exists()) {
                Bitmap croppedBitmap = BitmapFactory.decodeFile(croppedImgFile.getAbsolutePath());
                viewHolder.ivCroppedImage.setImageBitmap(croppedBitmap);
            }

            getPictureResolution(values[position]);
            viewHolder.tvSizeFullImage.setText(sImageWidth + " x " + sImageHeight);

            getPictureResolution(croppedImagePath[position]);
            viewHolder.tvSizeCroppedImage.setText(sImageWidth + " x " + sImageHeight);

            // if user clicks on full picture: call crop view before:
            viewHolder.ivFullImage.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    int pos = (Integer) v.getTag();
                    selectedPosition = pos;

                    Intent cropActivityIntent = new Intent(DocScanUIMainActivity.this, CropViewUIActivity.class);
                    cropActivityIntent.putExtra(EXTRA_FULL_IMAGE_PATH, fullImgFile.getAbsolutePath());
                    cropActivityIntent.putParcelableArrayListExtra(EXTRA_CORNERS, (ArrayList<PointF>) corners[pos]);

//                    Bundle b = new Bundle();
//                    cropActivityIntent.putExtras(b);

                    startActivityForResult(cropActivityIntent, CROP_DOCUMENT_REQUEST);
                }
            });

            return convertView;
        }
    }


    private void getPictureResolution(String imagePath) {
        BitmapFactory.Options bitMapOption = new BitmapFactory.Options();
        bitMapOption.inJustDecodeBounds = true;
        BitmapFactory.decodeFile(imagePath, bitMapOption);
        imageWidth = bitMapOption.outWidth;
        imageHeight = bitMapOption.outHeight;
        sImageWidth = NumberFormat.getInstance(getResources().getConfiguration().locale).format(imageWidth);
        sImageHeight = NumberFormat.getInstance(getResources().getConfiguration().locale).format(imageHeight);
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CODE_SCAN && resultCode == RESULT_SWITCH) // # Will inform you if second activity is finished and the result
        {
            displayScannedPages(data);
        } else if (requestCode == CROP_DOCUMENT_REQUEST) {
            if (resultCode == RESULT_OK) {
                Bundle extras = data.getExtras();
                if (extras != null) {
                    corners[selectedPosition] = extras.getParcelableArrayList(RESULT_CORNERS);
                    croppedImagePath[selectedPosition] = extras.getString(
                            RESULT_CROPPED_IMAGE_PATH);
                    lv.invalidateViews();
                }
            }
        }
    }


    @Override
    public void onRequestPermissionsResult(int requestCode, String permissions[], int[] grantResults) {
        switch (requestCode) {
            case REQUEST_CODE_PERMISSION_CAMERA: {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0
                    && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    // permission was granted
                } else {
                    // permission denied
                    Toast.makeText(DocScanUIMainActivity.this, "Permission denied to use the Camera", Toast.LENGTH_SHORT).show();
                }
            }
        }
    }
}