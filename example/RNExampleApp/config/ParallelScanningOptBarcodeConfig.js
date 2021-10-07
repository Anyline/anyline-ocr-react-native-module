export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6IDIsCiAgImRlYnVnUmVwb3J0aW5nIjogIm9uIiwKICAiaW1hZ2VSZXBvcnRDYWNoaW5nIjogZmFsc2UsCiAgIm1ham9yVmVyc2lvbiI6ICIyNSIsCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwaW5nUmVwb3J0aW5nIjogdHJ1ZSwKICAicGxhdGZvcm0iOiBbCiAgICAiaU9TIiwKICAgICJBbmRyb2lkIgogIF0sCiAgInNjb3BlIjogWwogICAgIkFMTCIKICBdLAogICJzaG93UG9wVXBBZnRlckV4cGlyeSI6IGZhbHNlLAogICJzaG93V2F0ZXJtYXJrIjogdHJ1ZSwKICAidG9sZXJhbmNlRGF5cyI6IDkwLAogICJ2YWxpZCI6ICIyMDIxLTEyLTMxIiwKICAiaW9zSWRlbnRpZmllciI6IFsKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlIiwKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlLmJldGEiCiAgXSwKICAiYW5kcm9pZElkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIKICBdCn0KekFjQVc4dmI0UjdPd0hkYkhyZkdIVlNIcVVkTzNudDd3clBPbi9XNXJkajhuK0lJSkNiRjdrSXJEOGVFVkVmU2htM2dmSzBXWnBWTGhmekFQbVRNYkU4VnU0bWVqZC9KMktCTms3d2NTa3RRbmRYUko2V2RuTmxMZS9uUFNSM1RvWXdQMVU3WG0zb01MVGErdFNRaElubDlvZXhYUkFMT25ZM1J5OUY0d0lKcUxMeUMxcmVieXFMcDJwRGx6N3RCeHNkd2ZLZEx3TkQrQWtJUGxKQmNrbUlGN2lIREJLOW55aVNCMXJPMUxET2VEOUJZMlNZU0UwelR1Z2I1bzN2UG9kenYxYldhVmpMS05vcGw1QVNGU3BKcjdNZE9oN2hvMW5rcGk4Rm5uVFJCUko4QklSb2dGRmI4SUQxOXdvdlk3M1BqMGI2dkdabGxucElDTm1UNnFBPT0=',
  options: {
    "camera": {
      "captureResolution": "1080p"
    },
    "flash": {
      "mode": "manual",
      "alignment": "top_right"
    },
    "parallelViewPluginComposite": {
      "id": "VIN_AND_OPT_BARCODE",
      "cancelOnResult": true,
      "viewPlugins": [
        {
          "viewPlugin": {
            "plugin": {
              "id": "VIN_ID",
              "ocrPlugin": {
                "vinConfig":{
                }
              }
            },
            "cutoutConfig": {
              "style": "rect",
              "width": 720,
              "alignment": "center",
              "maxWidthPercent": "100%",
              "strokeWidth": 1,
              "strokeColor": "FFFFFF",
              "cornerRadius": 2,
              "outerColor": "000000",
              "outerAlpha": 0.3,
              "feedbackStrokeColor": "0099FF",
              "ratioFromSize": {
                "width": 80,
                "height": 20
              },
            },
            "scanFeedback": {
              "animation": "traverse_multi",
              "animationDuration": 250,
              "style": "contour_rect",
              "strokeWidth": 2,
              "strokeColor": "0099FF",
              "beepOnResult": true,
              "vibrateOnResult": true,
              "blinkAnimationOnResult": true,
              "cancelOnResult": true
            },
            "cancelOnResult": true,
            "reportingEnabled": true
          }
        },
        {
          "viewPlugin": {
            "optional": true,
            "plugin": {
              "id": "Barcode_ID",
              "barcodePlugin": {
                "barcodeFormatOptions": [
                  "UPC_E", "EAN_13", "UPC_A", "EAN_8", "AZTEC", "CODABAR", "CODE_11", "CODE_32", "CODE_39", "CODE_93", "CODE_128", "DATABAR", "DATA_MATRIX", "GS1_QR_CODE", "GS1_128", "ITF", "ISBT_128", "MSI", "MICRO_QR", "MICRO_PDF", "PDF_417", "POST_UK", "QR_CODE", "RSS_14", "RSS_EXPANDED", "TRIOPTIC", "USPS_4CB", "US_PLANET", "US_POSTNET"]
                }
              },
              "cutoutConfig": {
                "style": "rect",
                "width": 720,
                "alignment": "center",
                "maxWidthPercent": "100%",
                "ratioFromSize": {
                  "width": 80,
                  "height": 16
                },
                "strokeWidth": 1,
                "strokeColor": "FFFFFF",
                "cornerRadius": 2,
                "outerColor": "000000",
                "outerAlpha": 0.3,
                "feedbackStrokeColor": "0099FF"
              },
              "scanFeedback": {
                "style": "CONTOUR_RECT",
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
  