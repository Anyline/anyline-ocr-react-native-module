export default {
  "options": {
  },
  "cameraConfig": {
    "captureResolution": "1080p"
  },
  "flashConfig": {
    "mode": "manual",
    "alignment": "bottom_left",
    "offset": {
      "x": 0,
      "y": -40
    }
  },
  "viewPluginConfig": {
    "pluginConfig": {
      "id": "id-mrz-dl-arabic",
      "universalIdConfig": {
        "allowedLayouts": {
          "mrz": [],
          "drivingLicense": [],
          "idFront": []
        },
        "alphabet": "arabic",
        "drivingLicense": {
          "surname": {
            "scanOption": 0,
            "minConfidence": 40
          },
          "givenNames": {
            "scanOption": 0,
            "minConfidence": 40
          },
          "dateOfBirth": {
            "scanOption": 0,
            "minConfidence": 50
          },
          "placeOfBirth": {
            "scanOption": 1,
            "minConfidence": 50
          },
          "dateOfIssue": {
            "scanOption": 0,
            "minConfidence": 50
          },
          "dateOfExpiry": {
            "scanOption": 1,
            "minConfidence": 50
          },
          "authority": {
            "scanOption": 1,
            "minConfidence": 30
          },
          "documentNumber": {
            "scanOption": 0,
            "minConfidence": 40
          },
          "categories": {
            "scanOption": 1,
            "minConfidence": 30
          },
          "address": {
            "scanOption": 1
          }
        },
        "idFront": {
          "surname": {
            "scanOption": 0,
            "minConfidence": 60
          },
          "givenNames": {
            "scanOption": 0,
            "minConfidence": 60
          },
          "dateOfBirth": {
            "scanOption": 0,
            "minConfidence": 60
          },
          "placeOfBirth": {
            "scanOption": 1,
            "minConfidence": 60
          },
          "dateOfExpiry": {
            "scanOption": 1,
            "minConfidence": 60
          },
          "cardAccessNumber": {
            "scanOption": 1,
            "minConfidence": 60
          },
          "documentNumber": {
            "scanOption": 0,
            "minConfidence": 60
          },
          "nationality": {
            "scanOption": 1,
            "minConfidence": 60
          }
        }
      },
      "cancelOnResult": true
    },
    "cutoutConfig": {
      "animation": "fade",
      "maxWidthPercent": "90%",
      "maxHeightPercent": "90%",
      "width": 0,
      "alignment": "top_half",
      "ratioFromSize": {
        "width": 86,
        "height": 54
      },
      "offset": {
        "x": 0,
        "y": 60
      },
      "cropOffset": {
        "x": 0,
        "y": 0
      },
      "cropPadding": {
        "x": 0,
        "y": 0
      },
      "cornerRadius": 4,
      "strokeColor": "0099ff",
      "strokeWidth": 2,
      "outerColor": "000000",
      "feedbackStrokeColor": "0099FF",
      "outerAlpha": 0.3
    },
    "scanFeedbackConfig": {
      "style": "animated_rect",
      "strokeWidth": 2,
      "strokeColor": "50fa7b",
      "fillColor": "4050fa7b",
      "cornerRadius": 2,
      "beepOnResult": true,
      "vibrateOnResult": true,
      "blinkAnimationOnResult": true
    }
  }
}
