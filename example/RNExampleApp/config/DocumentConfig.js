export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6IDIsCiAgImRlYnVnUmVwb3J0aW5nIjogIm9uIiwKICAiaW1hZ2VSZXBvcnRDYWNoaW5nIjogZmFsc2UsCiAgIm1ham9yVmVyc2lvbiI6ICIzIiwKICAibWF4RGF5c05vdFJlcG9ydGVkIjogMCwKICAicGluZ1JlcG9ydGluZyI6IHRydWUsCiAgInBsYXRmb3JtIjogWwogICAgImlPUyIsCiAgICAiQW5kcm9pZCIKICBdLAogICJzY29wZSI6IFsKICAgICJBTEwiCiAgXSwKICAic2hvd1BvcFVwQWZ0ZXJFeHBpcnkiOiBmYWxzZSwKICAic2hvd1dhdGVybWFyayI6IHRydWUsCiAgInRvbGVyYW5jZURheXMiOiA5MCwKICAidmFsaWQiOiAiMjAyMC0xMi0zMSIsCiAgImlvc0lkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIsCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZS5iZXRhIgogIF0sCiAgImFuZHJvaWRJZGVudGlmaWVyIjogWwogICAgImNvbS5hbnlsaW5lLmV4YW1wbGUucmVhY3RuYXRpdmUiCiAgXQp9CmxXS0Y3enZmTGNKckhlOVBaMmM5WUNaNkU0QnhxdTVRUjExeW1BRTh0T0NaTVppMk9UUGx2QTd6eVZPbmttUURSTHlFY0VEMlRYcGJ5aVdVSklTRk5pbThlZ1laY0xGejRxRmpmMG5DMkN2ZGxuK3YzcFJvVXA3U3VNUUpEamRqTU5wWkJBS1pPeGFQU1ExbVRtWWdjNWYxVHBQbDZnVVB3L0krUmpCdUhXSElZWHBiTklkWUQ5ZTJuK3ZuSWFyZFlPbEUzdE5Td1h2VW5CMXVMQnZlZWdvYWlYR3AyRkI5dWQybVpQNW1uVUh6TklmQUkvWGRwcE4zWGl2NHRRaUlkUzBLUTl2Mk9LR1gyKzgyaEN0M3pVV1NVN3BTVVhENCtKd05lYzJ2OGpPbmlHYjVmRUtKaHlpLzBkRE10ZENyZHVNUVU3RGtVb3oxNG1aN0pPTCt4dz09',
  options: {
      "camera": {
        "captureResolution": "720p",
        "pictureResolution": "1080p",
        "pictureAspectRatios": [
          "16:9"
        ]
      },
      "flash": {
        "mode": "manual",
        "alignment": "bottom_left",
        "offset": {
          "x": 10,
          "y": 0
        }
      },
      "viewPlugin": {
        "plugin": {
          "id": "DOCUMENT",
          "documentPlugin": {}
        },
        "cutoutConfig": {
          "style": "rect",
          "maxWidthPercent": "100%",
          "maxHeightPercent": "100%",
          "widthPercent": "100%",
          "width": 1080,
          "ratioFromSize": {
            "width": 10,
            "height": 18
          },
          "alignment": "center",
          "strokeWidth": 2,
          "cornerRadius": 0,
          "strokeColor": "00000000"
        },
        "scanFeedback": {
          "beepOnResult": true,
          "vibrateOnResult": true,
          "blinkAnimationOnResult": true
        },
        "cancelOnResult": true
      },
      "document": {
        "manualCaptureButton": {
          "buttonColor": "0099ff"
        },
        "UIKit": {
          "scanMode": "multiple_pages",
          "enablePostProcessing": true,
          "showCancelOnCropView": true,
          "reducePictureSize": {
            "allowChangeCustomSize": true,
            "option": "Small",
            "maxSizeSmall": 300,
            "maxSizeMedium": 600,
            "maxSizeLarge": 1200,
            "maxSizeCustom": 900
          },
          "scanFormat": {
            "selectFormats": "All",
            "formatTolerance": "0.1",
            "a4": true,
            "complimentSlip": false,
            "businessCard": false,
            "letter": true,
            "customRatio": true,
            "customRatioValueShortSide": 3,
            "customRatioValueLongSide": 4,
            "allformatsminratio": {
              "width": 1,
              "height": 6
            },
            "allformatsmaxratio": {
              "width": 1,
              "height": 1
            }
          },
          "bottomBar": {
            "position0": {
              "control": "flash",
              "width": 2
            },
            "position1": {
              "control": "scan_mode",
              "width": 2
            },
            "position2": {
              "control": "manual_picture",
              "width": 3
            },
            "position3": {
              "control": "cancel",
              "width": 2
            },
            "position4": {
              "control": "ok",
              "width": 2
            }
          },
          "bottomBarExtension": {
            "line0": "picture_resize",
            "line1": "format",
            "line2": "empty",
            "line3": "empty"
          },
          "bottomGalleryBar": {
            "position0": {
              "control": "rotate_left_picture",
              "width": 2
            },
            "position1": {
              "control": "rotate_right_picture",
              "width": 2
            },
            "position2": {
              "control": "delete_picture",
              "width": 2
            },
            "position3": {
              "control": "crop_image",
              "width": 2
            },
            "position4": {
              "control": "new_scan",
              "width": 2
            }
          },
          "bottomGalleryBarExtension": {
            "line0": "import_image",
            "line1": "rearrange_image",
            "line2": "processing_image",
            "line3": "empty"
          },
          "imageProcessing": {
            "autoWhiteBalance": false,
            "autoContrast": false,
            "autoBrightness": false,
            "imageTypeConversion": "color"
          },
          "colors": {
            "tintControls": "007acc",
            "tintControlsDisabled": "bbbbbb",
            "tintManualPictureButton": "009999",
            "textMessage": "111111",
            "backgroundMessage": "fff399",
            "textHint": "111111",
            "backgroundHint": "fff399",
            "textBottomBar": "007acc",
            "backgroundBottomBar": "efefef",
            "divider": "999999"
          }
        }
      },
      "quality": 90
    }
}

