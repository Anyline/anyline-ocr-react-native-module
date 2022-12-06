export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6ICIzLjAiLAogICJkZWJ1Z1JlcG9ydGluZyI6ICJwaW5nIiwKICAibWFqb3JWZXJzaW9uIjogIjM3IiwKICAic2NvcGUiOiBbCiAgICAiQUxMIgogIF0sCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwbGF0Zm9ybSI6IFsKICAgICJpT1MiLAogICAgIkFuZHJvaWQiCiAgXSwKICAic2hvd1dhdGVybWFyayI6IHRydWUsCiAgInRvbGVyYW5jZURheXMiOiAzMCwKICAidmFsaWQiOiAiMjAyMy0xMi0zMSIsCiAgImlvc0lkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIKICBdLAogICJhbmRyb2lkSWRlbnRpZmllciI6IFsKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlIgogIF0KfQpqVkdqaUxWZ05tcFBQQWFUSGRBK21EYkNEQWhnaGx1TG92MmpuWU92NlNJMHJDVjJoTUR6TnBnVVJMRE52Rlp0bUN4alZxcmlpb1BJbExySlFEY0pQdjZHdmY5YWtpVXZXVEdaQ29ra01pd3lUcUc2dkE4QXBDRTBxOENtVUJ1VzZNKzNWVERVdXJFanF6OE5LT1hHMFRUZzA2c281Tk1hRzhrS0Nzd0lzWVBZS1lBYnoxMXdmc09lMkVxV0ZNMGtIdTM0bWVueDU5Ykd4QkVjdHdZZCs5SW5vOTNGZUtHeDJibjJqVURvRENRTGFzdHNQQlMyUXU1WFV0dFNjTjJWZWMwUDkrYTdjaCswUHJLaE5jb0hLcmtwSlczV1lkaEoxMTRiMUhpWjJIL2ljMXdJSnA5ZmszL1lPVHlFYVZFSitYWm1KVG1HYkk2ZU5PcjBhMGE3QWc9PQ==',
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
            "alphabet" : "cyrillic",
            "faceDetection": true,
            "allowedLayouts": {
              "mrz": [],
              "drivingLicense": [],
              "idFront": []
            },
            "drivingLicense": {
              "lastName": {"scanOption": 0, "minConfidence": 40},
              "lastName@cyr": {"scanOption": 0, "minConfidence": 40},
              "firstName": {"scanOption": 0, "minConfidence": 40},
              "firstName@cyr": {"scanOption": 0, "minConfidence": 40},
              "dateOfBirth": {"scanOption": 0, "minConfidence": 50},
              "placeOfBirth": {"scanOption": 1, "minConfidence": 50},
              "dateOfIssue": {"scanOption": 0, "minConfidence": 50},
              "dateOfExpiry": {"scanOption": 1, "minConfidence": 50},
              "authority": {"scanOption": 1, "minConfidence": 30},
              "documentNumber": {"scanOption": 0, "minConfidence": 40},
              "address": {"scanOption": 1},
              "address@cyr": {"scanOption": 1},
              "nationality": {"scanOption": 1},
              "nationality@cyr": {"scanOption": 1}
            },
            "idFront": {
              "lastName": {"scanOption": 0, "minConfidence": 40},
              "lastName@cyr": {"scanOption": 0, "minConfidence": 40},
              "firstName": {"scanOption": 0, "minConfidence": 40},
              "firstName@cyr": {"scanOption": 0, "minConfidence": 40},
              "dateOfBirth": {"scanOption": 0, "minConfidence": 50},
              "placeOfBirth": {"scanOption": 1, "minConfidence": 50},
              "dateOfIssue": {"scanOption": 0, "minConfidence": 50},
              "dateOfExpiry": {"scanOption": 1, "minConfidence": 50},
              "authority": {"scanOption": 1, "minConfidence": 30},
              "documentNumber": {"scanOption": 0, "minConfidence": 40},
              "address": {"scanOption": 1},
              "address@cyr": {"scanOption": 1},
              "nationality": {"scanOption": 1},
              "nationality@cyr": {"scanOption": 1}
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
