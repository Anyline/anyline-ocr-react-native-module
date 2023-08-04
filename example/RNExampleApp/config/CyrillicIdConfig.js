export default {
  "options": {
    "doneButtonConfig": {
      "offset.y": -88
    }
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
      "id": "id-mrz-dl-cyrillic",
      "universalIdConfig": {
        "allowedLayouts": {
          "mrz": [],
          "drivingLicense": [],
          "idFront": []
        },
        "alphabet": "cyrillic",
        "drivingLicense": {
          "surname": {
            "scanOption": "mandatory",
            "minConfidence": 40
          },
          "givenNames": {
            "scanOption": "mandatory",
            "minConfidence": 40
          },
          "dateOfBirth": {
            "scanOption": "mandatory",
            "minConfidence": 50
          },
          "placeOfBirth": {
            "scanOption": "optional",
            "minConfidence": 50
          },
          "dateOfIssue": {
            "scanOption": "mandatory",
            "minConfidence": 50
          },
          "dateOfExpiry": {
            "scanOption": "optional",
            "minConfidence": 50
          },
          "authority": {
            "scanOption": "optional",
            "minConfidence": 30
          },
          "documentNumber": {
            "scanOption": "mandatory",
            "minConfidence": 40
          },
          "categories": {
            "scanOption": "optional",
            "minConfidence": 30
          },
          "address": {
            "scanOption": "optional"
          }
        },
        "idFront": {
          "surname": {
            "scanOption": "mandatory",
            "minConfidence": 60
          },
          "givenNames": {
            "scanOption": "mandatory",
            "minConfidence": 60
          },
          "dateOfBirth": {
            "scanOption": "mandatory",
            "minConfidence": 60
          },
          "placeOfBirth": {
            "scanOption": "optional",
            "minConfidence": 60
          },
          "dateOfExpiry": {
            "scanOption": "optional",
            "minConfidence": 60
          },
          "cardAccessNumber": {
            "scanOption": "optional",
            "minConfidence": 60
          },
          "documentNumber": {
            "scanOption": "mandatory",
            "minConfidence": 60
          },
          "nationality": {
            "scanOption": "optional",
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
      "strokeColor": "ff5555",
      "fillColor": "40ff5555",
      "cornerRadius": 4,
      "beepOnResult": true,
      "vibrateOnResult": true,
      "blinkAnimationOnResult": true
    }
  }
}
