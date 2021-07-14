export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6IDIsCiAgImRlYnVnUmVwb3J0aW5nIjogIm9uIiwKICAiaW1hZ2VSZXBvcnRDYWNoaW5nIjogZmFsc2UsCiAgIm1ham9yVmVyc2lvbiI6ICIyNSIsCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwaW5nUmVwb3J0aW5nIjogdHJ1ZSwKICAicGxhdGZvcm0iOiBbCiAgICAiaU9TIiwKICAgICJBbmRyb2lkIgogIF0sCiAgInNjb3BlIjogWwogICAgIkFMTCIKICBdLAogICJzaG93UG9wVXBBZnRlckV4cGlyeSI6IGZhbHNlLAogICJzaG93V2F0ZXJtYXJrIjogdHJ1ZSwKICAidG9sZXJhbmNlRGF5cyI6IDkwLAogICJ2YWxpZCI6ICIyMDIxLTEyLTMxIiwKICAiaW9zSWRlbnRpZmllciI6IFsKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlIiwKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlLmJldGEiCiAgXSwKICAiYW5kcm9pZElkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIKICBdCn0KekFjQVc4dmI0UjdPd0hkYkhyZkdIVlNIcVVkTzNudDd3clBPbi9XNXJkajhuK0lJSkNiRjdrSXJEOGVFVkVmU2htM2dmSzBXWnBWTGhmekFQbVRNYkU4VnU0bWVqZC9KMktCTms3d2NTa3RRbmRYUko2V2RuTmxMZS9uUFNSM1RvWXdQMVU3WG0zb01MVGErdFNRaElubDlvZXhYUkFMT25ZM1J5OUY0d0lKcUxMeUMxcmVieXFMcDJwRGx6N3RCeHNkd2ZLZEx3TkQrQWtJUGxKQmNrbUlGN2lIREJLOW55aVNCMXJPMUxET2VEOUJZMlNZU0UwelR1Z2I1bzN2UG9kenYxYldhVmpMS05vcGw1QVNGU3BKcjdNZE9oN2hvMW5rcGk4Rm5uVFJCUko4QklSb2dGRmI4SUQxOXdvdlk3M1BqMGI2dkdabGxucElDTm1UNnFBPT0=',
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
        "id": "OCR_COW",
        "ocrPlugin": {
	  "cattleTagConfig":{
          }
        }
      },
      "cutoutConfig": {
        "style": "rect",
        "maxWidthPercent": "80%",
        "maxHeightPercent": "80%",
        "alignment": "center",
        "width": 600,
        "ratioFromSize": {
          "width": 1,
          "height": 1
        },
        "strokeWidth": 2,
        "cornerRadius": 10,
        "strokeColor": "FFFFFF",
        "outerColor": "000000",
        "outerAlpha": 0.3,
        "feedbackStrokeColor": "0099FF",
        "cropPadding": {
          "x": 60,
          "y": 60
        },
        "cropOffset": {
          "x": 0,
          "y": 0
        }
      },
      "cancelOnResult": true,
      "scanFeedback": {
        "style": "rect",
        "strokeWidth": 2,
        "strokeColor": "0099FF",
        "fillColor": "330099FF",
        "cornerRadius": 0,
        "beepOnResult": true,
        "vibrateOnResult": true,
        "blinkAnimationOnResult": true
      }
    }
  }
}
