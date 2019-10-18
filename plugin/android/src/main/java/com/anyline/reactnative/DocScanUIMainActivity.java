package com.anyline.reactnative;


import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
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
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

import java.io.File;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import io.anyline.view.ScanPage;


public class DocScanUIMainActivity extends AnylineBaseActivity {

    private static final String TAG = DocScanUIMainActivity.class.getSimpleName();

    public static final int REQUEST_CODE_SCAN = 1;
    private static final int CROP_DOCUMENT_REQUEST = 2;
    public static final int RESULT_SWITCH = 3;

    public static final String RESULT_CROPPED_IMAGE_PATH = "RESULT_CROPPED_IMAGE_PATH";
    public static final String RESULT_CORNERS = "RESULT_CORNERS";
    public static final String EXTRA_FULL_IMAGE_PATH = "EXTRA_FULL_IMAGE_PATH";
    public static final String EXTRA_CORNERS = "EXTRA_CORNERS";
    public static final String RESULT_PAGES = "RESULT_PAGES";


    private String[] fullImagePath = null;      // a list of scanned full pictures
    private String[] croppedImagePath = null;   // a list of (automatically or manually) cropped pictures. a cropped picture contains the document
    private List<PointF>[] corners = null;      // a list of 4 corners, specifying a cropped picture within the full picture

    private int selectedPosition;               // used to update the list of cropped images and corners after adjusting corners in the cropView

    ListView imageListView;
    Button btScan;

    File fullImgFile;                           // the image as it was taken by the camera. need to declare it globally as it is accessed in a listener

    private String licenseKey;
    private String configJson;


    // call the documentScanView where a user will scan documents (automatically or manually):
    private void callDocumentScanViewUIActivity() {
        Intent scanActivityIntent = new Intent(DocScanUIMainActivity.this, DocumentScanViewUIActivity.class);
        Bundle b = new Bundle();
        b.putString("License", licenseKey);
        b.putString("Config", configJson);
        scanActivityIntent.putExtras(b);
        startActivityForResult(scanActivityIntent, REQUEST_CODE_SCAN);
    }


    // call the cropView where a user will adjust corners of a cropped image or - in case the documentScanView did not detect corners - set corners initially:
    private void callCropViewUIActivity(int pos, File fullImgFile) {
        Intent cropActivityIntent = new Intent(DocScanUIMainActivity.this, CropViewUIActivity.class);
        cropActivityIntent.putExtra(EXTRA_FULL_IMAGE_PATH, fullImgFile.getAbsolutePath());
        cropActivityIntent.putParcelableArrayListExtra(EXTRA_CORNERS, (ArrayList<PointF>) corners[pos]);
        startActivityForResult(cropActivityIntent, CROP_DOCUMENT_REQUEST);
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_doc_scan_ui_main);

        licenseKey = getIntent().getStringExtra(AnylineSDKPlugin.EXTRA_LICENSE_KEY);
        configJson = getIntent().getStringExtra(AnylineSDKPlugin.EXTRA_CONFIG_JSON);

        imageListView = findViewById(R.id.list);

        btScan = findViewById(R.id.btScan);
        btScan.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {

                // if "scan document" is called repeatedly the user will be warned that scan results from the previous pass will get lost:
                if (fullImagePath != null && fullImagePath.length > 0) {
                    AlertDialog.Builder builder = new AlertDialog.Builder(DocScanUIMainActivity.this);

                    builder.setTitle(getResources().getString(R.string.confirm));
                    builder.setMessage(getResources().getString(R.string.existing_scans_will_be_overwritten_msg));

                    builder.setPositiveButton(getResources().getString(at.nineyards.anyline.R.string.ok),
                                              new DialogInterface.OnClickListener() {

                                                  public void onClick(DialogInterface dialog, int which) {
                                                      dialog.dismiss();
                                                      callDocumentScanViewUIActivity();
                                                  }
                                              });

                    AlertDialog alert = builder.create();
                    alert.show();
                } else {
                    callDocumentScanViewUIActivity();
                }

            }
        });
    }


    @Override
    protected void onResume() {
        super.onResume();
    }


    private void displayScannedPages(Intent data) {
        // when returning from scanning documents the full images and the cropped images are displayed:
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

        // create new adapter to display full image, corners and cropped image:
        ImageListViewArrayAdapter adapter = new ImageListViewArrayAdapter(this, fullImagePath);
        imageListView.setAdapter(adapter);
    }


    public class ImageListViewArrayAdapter extends ArrayAdapter<String> {
        private final String[] values;
        private int layout;

        public ImageListViewArrayAdapter(Context context, String[] values) {
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

            // the tag will be used to retrieve the actual position in the list when clicking on an image:
            viewHolder.ivFullImage.setTag(position);
            viewHolder.ivCroppedImage.setTag(position);

            fullImgFile = null;
            if (values[position] != null) { // values[position] contains the path of the full image
                fullImgFile = new File(values[position]);
                if (fullImgFile.exists()) {

                    // create bitmap in ARGB-format from full image file:
                    Bitmap fullBitmap = BitmapFactory.decodeFile(fullImgFile.getAbsolutePath());
                    Bitmap drawableFullBitmap = fullBitmap.copy(Bitmap.Config.ARGB_8888, true);

                    // draw small red circles on the fullBitmap, indicating the corners:
                    if (corners[position] != null) {
                        Canvas canvas = new Canvas(drawableFullBitmap);
                        Paint paint = new Paint();
                        paint.setColor(Color.RED);
                        paint.setStrokeWidth(4);
                        canvas.drawBitmap(drawableFullBitmap, new Matrix(), null);
                        canvas.drawCircle(corners[position].get(0).x, corners[position].get(0).y, 12, paint);
                        canvas.drawCircle(corners[position].get(1).x, corners[position].get(1).y, 12, paint);
                        canvas.drawCircle(corners[position].get(2).x, corners[position].get(2).y, 12, paint);
                        canvas.drawCircle(corners[position].get(3).x, corners[position].get(3).y, 12, paint);
                    }

                    // display the full image with the 4 corners:
                    viewHolder.ivFullImage.setImageBitmap(drawableFullBitmap);

                    // display the size (height and width) of the full image:
                    viewHolder.tvSizeFullImage.setText(getPictureResolution(values[position]));

                    // if user clicks on full image: call cropView where the user can adjust corners:
                    viewHolder.ivFullImage.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            selectedPosition = (Integer) v.getTag();
                            callCropViewUIActivity(selectedPosition, fullImgFile);
                        }
                    });
                }
            }

            if (croppedImagePath[position] != null) {
                File croppedImgFile = new File(croppedImagePath[position]);
                if (croppedImgFile.exists()) {

                    // create bitmap in ARGB-format from cropped image file:
                    Bitmap croppedBitmap = BitmapFactory.decodeFile(croppedImgFile.getAbsolutePath());
                    Bitmap drawableCroppedBitmap = croppedBitmap.copy(Bitmap.Config.ARGB_8888, true);

                    // display the cropped image:
                    viewHolder.ivCroppedImage.setImageBitmap(drawableCroppedBitmap);

                    // display the size (height and width) of the cropped image:
                    viewHolder.tvSizeCroppedImage.setText(getPictureResolution(croppedImagePath[position]));

                    // if a full image exists and user clicks on cropped image: call cropView where the user can adjust corners:
                    if (fullImgFile != null) {
                        if (fullImgFile.exists()) {
                            viewHolder.ivCroppedImage.setOnClickListener(new View.OnClickListener() {
                                @Override
                                public void onClick(View v) {
                                    selectedPosition = (Integer) v.getTag();
                                    callCropViewUIActivity(selectedPosition, fullImgFile);
                                }
                            });
                        }
                    }
                }
            }

            return convertView;
        }
    }


    private String getPictureResolution(String imagePath) {
        BitmapFactory.Options bitMapOption = new BitmapFactory.Options();
        bitMapOption.inJustDecodeBounds = true;
        BitmapFactory.decodeFile(imagePath, bitMapOption);
        return (NumberFormat.getInstance(getResources().getConfiguration().locale).format(bitMapOption.outWidth) + " x " +
                NumberFormat.getInstance(getResources().getConfiguration().locale).format(bitMapOption.outHeight));
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
                    imageListView.invalidateViews();
                }
            }
        }
    }


}