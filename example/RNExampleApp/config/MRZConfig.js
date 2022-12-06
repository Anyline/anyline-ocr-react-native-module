export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6ICIzLjAiLAogICJkZWJ1Z1JlcG9ydGluZyI6ICJwaW5nIiwKICAibWFqb3JWZXJzaW9uIjogIjM3IiwKICAic2NvcGUiOiBbCiAgICAiQUxMIgogIF0sCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwbGF0Zm9ybSI6IFsKICAgICJpT1MiLAogICAgIkFuZHJvaWQiCiAgXSwKICAic2hvd1dhdGVybWFyayI6IHRydWUsCiAgInRvbGVyYW5jZURheXMiOiAzMCwKICAidmFsaWQiOiAiMjAyMy0xMi0zMSIsCiAgImlvc0lkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIKICBdLAogICJhbmRyb2lkSWRlbnRpZmllciI6IFsKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlIgogIF0KfQpqVkdqaUxWZ05tcFBQQWFUSGRBK21EYkNEQWhnaGx1TG92MmpuWU92NlNJMHJDVjJoTUR6TnBnVVJMRE52Rlp0bUN4alZxcmlpb1BJbExySlFEY0pQdjZHdmY5YWtpVXZXVEdaQ29ra01pd3lUcUc2dkE4QXBDRTBxOENtVUJ1VzZNKzNWVERVdXJFanF6OE5LT1hHMFRUZzA2c281Tk1hRzhrS0Nzd0lzWVBZS1lBYnoxMXdmc09lMkVxV0ZNMGtIdTM0bWVueDU5Ykd4QkVjdHdZZCs5SW5vOTNGZUtHeDJibjJqVURvRENRTGFzdHNQQlMyUXU1WFV0dFNjTjJWZWMwUDkrYTdjaCswUHJLaE5jb0hLcmtwSlczV1lkaEoxMTRiMUhpWjJIL2ljMXdJSnA5ZmszL1lPVHlFYVZFSitYWm1KVG1HYkk2ZU5PcjBhMGE3QWc9PQ==',
  options: {
    "camera": {
      "captureResolution": "1080p"
    },
    "flash": {
      "mode": "manual",
      "alignment": "bottom_left"
    },
    "viewPlugin" : {
      "plugin" : {
        "id" : "IDPlugin_ID",
        "idPlugin" : {
          "mrzConfig" : {
            "strictMode" : false,
            "cropAndTransformID" : false,
            "mrzFieldScanOptions": {
              "vizAddress" : "default",
              "vizDateOfIssue" : "default",
              "vizSurname" : "default",
              "vizGivenNames" : "default",
              "vizDateOfBirth" : "default",
              "vizDateOfExpiry" : "default",
            }
          }
        }
      },
      "cutoutConfig": {
        "style": "rect",
        "maxWidthPercent": "90%",
        "maxHeightPercent": "90%",
        "width" : 972,
        "alignment": "center",
        "ratioFromSize": {
          "width": 125,
          "height": 85
        },
        "strokeWidth": 2,
        "cornerRadius": 4,
        "strokeColor": "FFFFFF",
        "outerColor": "000000",
        "outerAlpha": 0.3,
        "cropPadding": {
          "x": -30,
          "y": -90
        },
        "cropOffset": {
          "x": 0,
          "y": 90
        },
        "feedbackStrokeColor": "0099FF",
        "offset": {
          "x": 0,
          "y": 30
        }
      },
      "scanFeedback": {
        "style": "rect",
        "strokeColor": "0099FF",
        "strokeWidth": 2,
        "blinkOnResult": true,
        "beepOnResult": true,
        "vibrateOnResult": true
      },
      "cancelOnResult": true
    },
    "cropAndTransformErrorMessage": "Edges are not detected"
  }
}
