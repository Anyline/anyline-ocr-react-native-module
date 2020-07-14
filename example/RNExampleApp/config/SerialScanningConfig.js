export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6IDIsCiAgImRlYnVnUmVwb3J0aW5nIjogIm9uIiwKICAiaW1hZ2VSZXBvcnRDYWNoaW5nIjogZmFsc2UsCiAgIm1ham9yVmVyc2lvbiI6ICIzIiwKICAibWF4RGF5c05vdFJlcG9ydGVkIjogMCwKICAicGluZ1JlcG9ydGluZyI6IHRydWUsCiAgInBsYXRmb3JtIjogWwogICAgImlPUyIsCiAgICAiQW5kcm9pZCIKICBdLAogICJzY29wZSI6IFsKICAgICJBTEwiCiAgXSwKICAic2hvd1BvcFVwQWZ0ZXJFeHBpcnkiOiBmYWxzZSwKICAic2hvd1dhdGVybWFyayI6IHRydWUsCiAgInRvbGVyYW5jZURheXMiOiA5MCwKICAidmFsaWQiOiAiMjAyMC0xMi0zMSIsCiAgImlvc0lkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIsCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZS5iZXRhIgogIF0sCiAgImFuZHJvaWRJZGVudGlmaWVyIjogWwogICAgImNvbS5hbnlsaW5lLmV4YW1wbGUucmVhY3RuYXRpdmUiCiAgXQp9CmxXS0Y3enZmTGNKckhlOVBaMmM5WUNaNkU0QnhxdTVRUjExeW1BRTh0T0NaTVppMk9UUGx2QTd6eVZPbmttUURSTHlFY0VEMlRYcGJ5aVdVSklTRk5pbThlZ1laY0xGejRxRmpmMG5DMkN2ZGxuK3YzcFJvVXA3U3VNUUpEamRqTU5wWkJBS1pPeGFQU1ExbVRtWWdjNWYxVHBQbDZnVVB3L0krUmpCdUhXSElZWHBiTklkWUQ5ZTJuK3ZuSWFyZFlPbEUzdE5Td1h2VW5CMXVMQnZlZWdvYWlYR3AyRkI5dWQybVpQNW1uVUh6TklmQUkvWGRwcE4zWGl2NHRRaUlkUzBLUTl2Mk9LR1gyKzgyaEN0M3pVV1NVN3BTVVhENCtKd05lYzJ2OGpPbmlHYjVmRUtKaHlpLzBkRE10ZENyZHVNUVU3RGtVb3oxNG1aN0pPTCt4dz09',
  options: {
  "camera": {
    "captureResolution": "1080p",
    "pictureResolution": "1080p"
  },
  "flash": {
    "mode": "manual",
    "alignment": "top_right"
  },
  "serialViewPluginComposite": {
    "id": "LP_DL_VIN",
    "cancelOnResult": true,
    "viewPlugins": [
      {
        "viewPlugin": {
          "plugin": {
            "id": "LICENSE_PLATE",
            "licensePlatePlugin": {
              "scanMode": "AUTO"
            }
          },
          "cutoutConfig": {
            "style": "rect",
            "maxWidthPercent": "80%",
            "maxHeightPercent": "80%",
            "alignment": "top_half",
            "width": 720,
            "ratioFromSize": {
              "width": 2,
              "height": 1
            },
            "strokeWidth": 2,
            "cornerRadius": 10,
            "strokeColor": "FFFFFF",
            "outerColor": "000000",
            "outerAlpha": 0.3,
            "feedbackStrokeColor": "0099FF"
          },
          "scanFeedback": {
            "style": "rect",
            "strokeWidth": 2,
            "strokeColor": "0099FF",
            "fillColor": "330099FF",
            "cornerRadius": 0,
            "beepOnResult": true,
            "vibrateOnResult": true,
            "blinkAnimationOnResult": true
          },
          "cancelOnResult": true
        }
      },
      {
        "viewPlugin": {
          "plugin": {
            "id": "DRIVING_LICENSE",
            "idPlugin": {
              "drivingLicenseConfig": {
                "scanMode": "AUTO"
              }
            }
          },
          "cutoutConfig" : {
            "style": "rect",
            "maxWidthPercent": "99%",
            "maxHeightPercent": "100%",
            "alignment": "center",
            "ratioFromSize" : {
              "width": 560,
              "height": 354
            },
            "strokeWidth": 2,
            "cornerRadius": 4,
            "strokeColor": "FFFFFF",
            "outerColor": "000000",
            "outerAlpha": 0.3,
            "feedbackStrokeColor": "0099FF"
          },
          "scanFeedback" : {
            "fillColor" : "220099FF",
            "style": "CONTOUR_POINT",
            "strokeColor": "0099FF",
            "strokeWidth": 2,
            "blinkOnResult": true,
            "beepOnResult": true,
            "vibrateOnResult": true
          },
          "cancelOnResult": true
        }
      },
      {
        "viewPlugin": {
          "plugin": {
            "id": "VIN",
            "ocrPlugin": {
              "vinConfig": {
              }
            }
          },
          "cutoutConfig": {
            "style": "rect",
            "maxWidthPercent": "70%",
            "alignment": "top_half",
            "ratioFromSize": {
              "width": 62,
              "height": 9
            },
            "outerColor": "000000",
            "outerAlpha": 0.3,
            "strokeWidth": 2,
            "strokeColor": "FFFFFF",
            "cornerRadius": 4,
            "feedbackStrokeColor": "0099FF"
          },
          "scanFeedback": {
            "animation": "traverse_multi",
            "animationDuration": 250,
            "style": "contour_rect",
            "strokeWidth": 2,
            "strokeColor": "0099FF",
            "fillColor": "220099FF",
            "beepOnResult": true,
            "vibrateOnResult": true,
            "blinkAnimationOnResult": true
          },
          "cancelOnResult": true
        }
      }
    ]
  }
}
}
