export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6IDIsCiAgImRlYnVnUmVwb3J0aW5nIjogIm9uIiwKICAiaW1hZ2VSZXBvcnRDYWNoaW5nIjogZmFsc2UsCiAgIm1ham9yVmVyc2lvbiI6ICIzIiwKICAibWF4RGF5c05vdFJlcG9ydGVkIjogMCwKICAicGluZ1JlcG9ydGluZyI6IHRydWUsCiAgInBsYXRmb3JtIjogWwogICAgImlPUyIsCiAgICAiQW5kcm9pZCIKICBdLAogICJzY29wZSI6IFsKICAgICJBTEwiCiAgXSwKICAic2hvd1BvcFVwQWZ0ZXJFeHBpcnkiOiBmYWxzZSwKICAic2hvd1dhdGVybWFyayI6IHRydWUsCiAgInRvbGVyYW5jZURheXMiOiA5MCwKICAidmFsaWQiOiAiMjAyMC0xMi0zMSIsCiAgImlvc0lkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIsCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZS5iZXRhIgogIF0sCiAgImFuZHJvaWRJZGVudGlmaWVyIjogWwogICAgImNvbS5hbnlsaW5lLmV4YW1wbGUucmVhY3RuYXRpdmUiCiAgXQp9CmxXS0Y3enZmTGNKckhlOVBaMmM5WUNaNkU0QnhxdTVRUjExeW1BRTh0T0NaTVppMk9UUGx2QTd6eVZPbmttUURSTHlFY0VEMlRYcGJ5aVdVSklTRk5pbThlZ1laY0xGejRxRmpmMG5DMkN2ZGxuK3YzcFJvVXA3U3VNUUpEamRqTU5wWkJBS1pPeGFQU1ExbVRtWWdjNWYxVHBQbDZnVVB3L0krUmpCdUhXSElZWHBiTklkWUQ5ZTJuK3ZuSWFyZFlPbEUzdE5Td1h2VW5CMXVMQnZlZWdvYWlYR3AyRkI5dWQybVpQNW1uVUh6TklmQUkvWGRwcE4zWGl2NHRRaUlkUzBLUTl2Mk9LR1gyKzgyaEN0M3pVV1NVN3BTVVhENCtKd05lYzJ2OGpPbmlHYjVmRUtKaHlpLzBkRE10ZENyZHVNUVU3RGtVb3oxNG1aN0pPTCt4dz09',
  options: 
  {
  "camera" : {
    "captureResolution" : "1080p",
    "zoomGesture": true
  },
  "flash" : {
    "mode": "manual",
    "alignment": "bottom_right",
    "imageOn": "flash_on",
    "imageOff": "flash_off"
  },
  "viewPlugin" : {
    "plugin":{
      "id":"ID",
      "idPlugin": {
        "templateConfig": {
          "drivingLicense": {
            "surname": {"scanOption": 0, "minConfidence": 40},
            "givenNames": {"scanOption": 0, "minConfidence": 40},
            "dateOfBirth": {"scanOption": 0, "minConfidence": 50},
            "placeOfBirth": {"scanOption": 0, "minConfidence": 50},
            "dateOfIssue": {"scanOption": 0, "minConfidence": 50},
            "dateOfExpiry": {"scanOption": 1, "minConfidence": 50},
            "authority": {"scanOption": 1, "minConfidence": 30},
            "documentNumber": {"scanOption": 0, "minConfidence": 40},
            "categories": {"scanOption": 1, "minConfidence": 30},
            "address": {"scanOption": 1}
          },
          "idFront": {
            "surname": {"scanOption": 0, "minConfidence": 60},
            "givenNames": {"scanOption": 0, "minConfidence": 60},
            "dateOfBirth": {"scanOption": 0, "minConfidence": 60},
            "placeOfBirth": {"scanOption": 0, "minConfidence": 60},
            "dateOfExpiry": {"scanOption": 0, "minConfidence": 60},
            "cardAccessNumber": {"scanOption": 0, "minConfidence": 60},
            "documentNumber": {"scanOption": 0, "minConfidence": 60},
            "nationality": {"scanOption": 0, "minConfidence": 60}
          }
        }

      }
    },
    "cutoutConfig" : {
      "style": "rect",
      "maxWidthPercent": "90%",
      "maxHeightPercent": "90%",
      "alignment": "center",
      "strokeWidth": 2,
      "cornerRadius": 4,
      "strokeColor": "FFFFFF",
      "outerColor": "000000",
      "outerAlpha": 0.3,
      "ratioFromSize" : {
        "width": 50,
        "height": 31
      },
      "cropPadding": {
        "x": -30,
        "y": -90
      },
      "cropOffset": {
        "x": 0,
        "y": 90
      },
      "feedbackStrokeColor": "0099FF"
    },
    "scanFeedback" : {
      "style": "contour_rect",
      "visualFeedbackRedrawTimeout": 100,
      "strokeColor": "0099FF",
      "fillColor" : "220099FF",
      "beepOnResult": true,
      "vibrateOnResult": true,
      "strokeWidth": 2
    },
    "cancelOnResult" : true
  }
}

}
