export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6ICIzLjAiLAogICJkZWJ1Z1JlcG9ydGluZyI6ICJwaW5nIiwKICAibWFqb3JWZXJzaW9uIjogIjM3IiwKICAic2NvcGUiOiBbCiAgICAiQUxMIgogIF0sCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwbGF0Zm9ybSI6IFsKICAgICJpT1MiLAogICAgIkFuZHJvaWQiCiAgXSwKICAic2hvd1dhdGVybWFyayI6IHRydWUsCiAgInRvbGVyYW5jZURheXMiOiAzMCwKICAidmFsaWQiOiAiMjAyMi0xMi0zMSIsCiAgImlvc0lkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIsCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZS5iZXRhIgogIF0sCiAgImFuZHJvaWRJZGVudGlmaWVyIjogWwogICAgImNvbS5hbnlsaW5lLmV4YW1wbGUucmVhY3RuYXRpdmUiCiAgXQp9CklibmlieWFiVTRmWFNwRDZiYU1CUlRiUUQvQUxHTzI0cWdWUHM4Q3FWdThET0dQQnBlRGs4UjhYNTF6WWMvOW95TWZjbWFtakpKSktvMmM2ZVpJWGticzkzNkdqM1M2STBIS2UycEVPd1FNdGZQYVBWY3hKOWJHT25venF6UFk1bWUwNGtJYk9TYVhka3A0SUcwOGM0ZWpqTitsS0N6Qnd6ekhVSkUyNDJ1dnFvKy9tZmFWS2E3T0trOUdWaWYvQzBzamFPNHhhRTFlcHRQT2lKYkJlSCtpK1RCWnFJZDQxamZIdTl1NHEwOHozM0ZuaG5yU0hpMFQwL3VCakFLYStsRGpzbXJPbFBiaG5tU0V6K3RBUVE5NEhPcHA2OTd6b2hCak85WENDZE81aWJwR3pMekhoYWZ3T3VVVy9OQ1NDWFNsNjAzVDE0QitOVjUydWZ4eFlxQT09',
  options: {
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
          "universalIdConfig": {
            "alphabet" : "arabic",
            "faceDetection": true,
            "allowedLayouts": {
              "mrz": [],
              "idFront": [],
              "drivingLicense": []
            },
            "idFront": {
              "fullName": {"scanOption": 0, "minConfidence": 60},
              "dateOfBirth": {"scanOption": 0, "minConfidence": 60},
              "placeOfBirth": {"scanOption": 1, "minConfidence": 60},
              "dateOfExpiry": {"scanOption": 1, "minConfidence": 60},
              "documentNumber": {"scanOption": 0, "minConfidence": 60},
              "nationality": {"scanOption": 1, "minConfidence": 60}
            },
            "drivingLicense": {
              "fullName": {"scanOption": 0, "minConfidence": 60},
              "dateOfBirth": {"scanOption": 0, "minConfidence": 60},
              "placeOfBirth": {"scanOption": 1, "minConfidence": 60},
              "dateOfExpiry": {"scanOption": 1, "minConfidence": 60},
              "documentNumber": {"scanOption": 0, "minConfidence": 60},
              "nationality": {"scanOption": 0, "minConfidence": 60}
            }
          }
        }
      },
      "cutoutConfig" : {
        "style": "animated_rect",
        "maxWidthPercent": "90%",
        "maxHeightPercent": "90%",
        "alignment": "center",
        "strokeWidth": 3,
        "cornerRadius": 8,
        "strokeColor": "FFFFFF",
        "outerColor": "000000",
        "outerAlpha": 0.3,
        "ratioFromSize" : {
          "width": 50,
          "height": 31
        },
        "cropPadding": {
          "x": -50,
          "y": -50
        },
        "cropOffset": {
          "x": 0,
          "y": 0
        },
        "feedbackStrokeColor": "0099FF"
      },
      "scanFeedback" : {
        "style": "CONTOUR_RECT",
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
