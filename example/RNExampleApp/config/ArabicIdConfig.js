export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6IDIsCiAgImRlYnVnUmVwb3J0aW5nIjogIm9uIiwKICAiaW1hZ2VSZXBvcnRDYWNoaW5nIjogZmFsc2UsCiAgIm1ham9yVmVyc2lvbiI6ICIyNSIsCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwaW5nUmVwb3J0aW5nIjogdHJ1ZSwKICAicGxhdGZvcm0iOiBbCiAgICAiaU9TIiwKICAgICJBbmRyb2lkIgogIF0sCiAgInNjb3BlIjogWwogICAgIkFMTCIKICBdLAogICJzaG93UG9wVXBBZnRlckV4cGlyeSI6IGZhbHNlLAogICJzaG93V2F0ZXJtYXJrIjogdHJ1ZSwKICAidG9sZXJhbmNlRGF5cyI6IDkwLAogICJ2YWxpZCI6ICIyMDIxLTEyLTMxIiwKICAiaW9zSWRlbnRpZmllciI6IFsKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlIiwKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlLmJldGEiCiAgXSwKICAiYW5kcm9pZElkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIKICBdCn0KekFjQVc4dmI0UjdPd0hkYkhyZkdIVlNIcVVkTzNudDd3clBPbi9XNXJkajhuK0lJSkNiRjdrSXJEOGVFVkVmU2htM2dmSzBXWnBWTGhmekFQbVRNYkU4VnU0bWVqZC9KMktCTms3d2NTa3RRbmRYUko2V2RuTmxMZS9uUFNSM1RvWXdQMVU3WG0zb01MVGErdFNRaElubDlvZXhYUkFMT25ZM1J5OUY0d0lKcUxMeUMxcmVieXFMcDJwRGx6N3RCeHNkd2ZLZEx3TkQrQWtJUGxKQmNrbUlGN2lIREJLOW55aVNCMXJPMUxET2VEOUJZMlNZU0UwelR1Z2I1bzN2UG9kenYxYldhVmpMS05vcGw1QVNGU3BKcjdNZE9oN2hvMW5rcGk4Rm5uVFJCUko4QklSb2dGRmI4SUQxOXdvdlk3M1BqMGI2dkdabGxucElDTm1UNnFBPT0=',
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
          "arabicIdConfig": {
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
