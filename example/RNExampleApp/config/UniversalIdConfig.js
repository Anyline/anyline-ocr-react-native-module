export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6IDIsCiAgImRlYnVnUmVwb3J0aW5nIjogIm9uIiwKICAiaW1hZ2VSZXBvcnRDYWNoaW5nIjogZmFsc2UsCiAgIm1ham9yVmVyc2lvbiI6ICIyNSIsCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwaW5nUmVwb3J0aW5nIjogdHJ1ZSwKICAicGxhdGZvcm0iOiBbCiAgICAiaU9TIiwKICAgICJBbmRyb2lkIgogIF0sCiAgInNjb3BlIjogWwogICAgIkFMTCIKICBdLAogICJzaG93UG9wVXBBZnRlckV4cGlyeSI6IGZhbHNlLAogICJzaG93V2F0ZXJtYXJrIjogdHJ1ZSwKICAidG9sZXJhbmNlRGF5cyI6IDkwLAogICJ2YWxpZCI6ICIyMDIxLTEyLTMxIiwKICAiaW9zSWRlbnRpZmllciI6IFsKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlIiwKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlLmJldGEiCiAgXSwKICAiYW5kcm9pZElkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIKICBdCn0KekFjQVc4dmI0UjdPd0hkYkhyZkdIVlNIcVVkTzNudDd3clBPbi9XNXJkajhuK0lJSkNiRjdrSXJEOGVFVkVmU2htM2dmSzBXWnBWTGhmekFQbVRNYkU4VnU0bWVqZC9KMktCTms3d2NTa3RRbmRYUko2V2RuTmxMZS9uUFNSM1RvWXdQMVU3WG0zb01MVGErdFNRaElubDlvZXhYUkFMT25ZM1J5OUY0d0lKcUxMeUMxcmVieXFMcDJwRGx6N3RCeHNkd2ZLZEx3TkQrQWtJUGxKQmNrbUlGN2lIREJLOW55aVNCMXJPMUxET2VEOUJZMlNZU0UwelR1Z2I1bzN2UG9kenYxYldhVmpMS05vcGw1QVNGU3BKcjdNZE9oN2hvMW5rcGk4Rm5uVFJCUko4QklSb2dGRmI4SUQxOXdvdlk3M1BqMGI2dkdabGxucElDTm1UNnFBPT0=',
  options: {
  "camera" : {
    "captureResolution" : "1080p",
    "zoomGesture": true
  },
  "flash" : {
    "mode": "manual",
    "alignment": "bottom_right"
  },
  "viewPlugin" : {
    "plugin":{
      "id":"ID",
      "idPlugin": {
        "universalIdConfig": {
          "allowedLayouts": {
            "mrz": [],
            "drivingLicense": [],
            "idFront": [],
            "insuranceCard" : []
          },
          "drivingLicense": {
            "surname": {"scanOption": 0, "minConfidence": 40},
            "givenNames": {"scanOption": 0, "minConfidence": 40},
            "dateOfBirth": {"scanOption": 0, "minConfidence": 50},
            "placeOfBirth": {"scanOption": 1, "minConfidence": 50},
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
            "placeOfBirth": {"scanOption": 1, "minConfidence": 60},
            "dateOfExpiry": {"scanOption": 1, "minConfidence": 60},
            "cardAccessNumber": {"scanOption": 1, "minConfidence": 60},
            "documentNumber": {"scanOption": 0, "minConfidence": 60},
            "nationality": {"scanOption": 1, "minConfidence": 60}
          },
          "insuranceCard": {
            "nationality": {"scanOption": 0, "minConfidence": 50},
            "surname": {"scanOption": 0, "minConfidence": 50},
            "givenNames": {"scanOption": 0, "minConfidence": 50},
            "dateOfBirth": {"scanOption": 0, "minConfidence": 50},
            "personalNumber": {"scanOption": 0, "minConfidence": 50},
            "authority": {"scanOption": 0, "minConfidence": 50},
            "documentNumber": {"scanOption": 0, "minConfidence": 50},
            "dateOfExpiry": {"scanOption": 0, "minConfidence": 50}
          }
        }
      }
    },
    "cutoutConfig" : {
      "style": "animated_rect",
      "maxWidthPercent": "90%",
      "maxHeightPercent": "90%",
      "alignment": "center",
      "width": 1080,
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
        "x": -50,
        "y": -50
      },
      "cropOffset": {
        "x": 0,
        "y": 0
      },
      "feedbackStrokeColor": "0099FF"
    },
    "scanFeedback" : { },
    "cancelOnResult" : true
  }
}
}
