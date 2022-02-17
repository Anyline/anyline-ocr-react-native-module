export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6ICIzLjAiLAogICJkZWJ1Z1JlcG9ydGluZyI6ICJwaW5nIiwKICAibWFqb3JWZXJzaW9uIjogIjM3IiwKICAic2NvcGUiOiBbCiAgICAiQUxMIgogIF0sCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwbGF0Zm9ybSI6IFsKICAgICJpT1MiLAogICAgIkFuZHJvaWQiCiAgXSwKICAic2hvd1dhdGVybWFyayI6IHRydWUsCiAgInRvbGVyYW5jZURheXMiOiAzMCwKICAidmFsaWQiOiAiMjAyMi0xMi0zMSIsCiAgImlvc0lkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIsCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZS5iZXRhIgogIF0sCiAgImFuZHJvaWRJZGVudGlmaWVyIjogWwogICAgImNvbS5hbnlsaW5lLmV4YW1wbGUucmVhY3RuYXRpdmUiCiAgXQp9CklibmlieWFiVTRmWFNwRDZiYU1CUlRiUUQvQUxHTzI0cWdWUHM4Q3FWdThET0dQQnBlRGs4UjhYNTF6WWMvOW95TWZjbWFtakpKSktvMmM2ZVpJWGticzkzNkdqM1M2STBIS2UycEVPd1FNdGZQYVBWY3hKOWJHT25venF6UFk1bWUwNGtJYk9TYVhka3A0SUcwOGM0ZWpqTitsS0N6Qnd6ekhVSkUyNDJ1dnFvKy9tZmFWS2E3T0trOUdWaWYvQzBzamFPNHhhRTFlcHRQT2lKYkJlSCtpK1RCWnFJZDQxamZIdTl1NHEwOHozM0ZuaG5yU0hpMFQwL3VCakFLYStsRGpzbXJPbFBiaG5tU0V6K3RBUVE5NEhPcHA2OTd6b2hCak85WENDZE81aWJwR3pMekhoYWZ3T3VVVy9OQ1NDWFNsNjAzVDE0QitOVjUydWZ4eFlxQT09',
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
                "universalIdConfig": {
                  "allowedLayouts": {
                    "drivingLicense": []
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
                  }
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
