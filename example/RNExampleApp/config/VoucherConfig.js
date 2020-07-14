export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6IDIsCiAgImRlYnVnUmVwb3J0aW5nIjogIm9uIiwKICAiaW1hZ2VSZXBvcnRDYWNoaW5nIjogZmFsc2UsCiAgIm1ham9yVmVyc2lvbiI6ICIzIiwKICAibWF4RGF5c05vdFJlcG9ydGVkIjogMCwKICAicGluZ1JlcG9ydGluZyI6IHRydWUsCiAgInBsYXRmb3JtIjogWwogICAgImlPUyIsCiAgICAiQW5kcm9pZCIKICBdLAogICJzY29wZSI6IFsKICAgICJBTEwiCiAgXSwKICAic2hvd1BvcFVwQWZ0ZXJFeHBpcnkiOiBmYWxzZSwKICAic2hvd1dhdGVybWFyayI6IHRydWUsCiAgInRvbGVyYW5jZURheXMiOiA5MCwKICAidmFsaWQiOiAiMjAyMC0xMi0zMSIsCiAgImlvc0lkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIsCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZS5iZXRhIgogIF0sCiAgImFuZHJvaWRJZGVudGlmaWVyIjogWwogICAgImNvbS5hbnlsaW5lLmV4YW1wbGUucmVhY3RuYXRpdmUiCiAgXQp9CmxXS0Y3enZmTGNKckhlOVBaMmM5WUNaNkU0QnhxdTVRUjExeW1BRTh0T0NaTVppMk9UUGx2QTd6eVZPbmttUURSTHlFY0VEMlRYcGJ5aVdVSklTRk5pbThlZ1laY0xGejRxRmpmMG5DMkN2ZGxuK3YzcFJvVXA3U3VNUUpEamRqTU5wWkJBS1pPeGFQU1ExbVRtWWdjNWYxVHBQbDZnVVB3L0krUmpCdUhXSElZWHBiTklkWUQ5ZTJuK3ZuSWFyZFlPbEUzdE5Td1h2VW5CMXVMQnZlZWdvYWlYR3AyRkI5dWQybVpQNW1uVUh6TklmQUkvWGRwcE4zWGl2NHRRaUlkUzBLUTl2Mk9LR1gyKzgyaEN0M3pVV1NVN3BTVVhENCtKd05lYzJ2OGpPbmlHYjVmRUtKaHlpLzBkRE10ZENyZHVNUVU3RGtVb3oxNG1aN0pPTCt4dz09',
  options: {
    "camera": {
      "captureResolution": "1080"
    },
    "flash": {
      "mode": "manual",
      "alignment": "bottom_right"
    },
    "viewPlugin": {
      "plugin": {
        "id": "OCR_VC",
        "ocrPlugin": {
	  "ocrConfig": {
            "scanMode": "AUTO",
            "charWhitelist": "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            "validationRegex": "[A-Z0-9]{8}$",
            "minConfidence": 75
	  }
        }
      },
      "cutoutConfig": {
        "style": "rect",
        "maxWidthPercent": "80%",
        "maxHeightPercent": "80%",
        "alignment": "center",
        "width": 540,
        "ratioFromSize": {
          "width": 5,
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
        "style": "contour_point",
        "strokeWidth": 3,
        "strokeColor": "0099FF",
        "fillColor": "220099FF",
        "beepOnResult": true,
        "vibrateOnResult": true,
        "blinkAnimationOnResult": true
      },
      "cancelOnResult": true
    }
  }
}
