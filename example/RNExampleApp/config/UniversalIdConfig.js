export default {
  "options": {
    "doneButtonConfig": {
      "offset.y": -88
    }
  },
  "cameraConfig": {
    "captureResolution": "1080p",
    "pictureResolution": "1080p"
  },
  "flashConfig": {
    "mode": "manual",
    "alignment": "top_left",
    "offset": {
      "x": 0,
      "y": 0
    }
  },
  "viewPluginConfig": {
    "pluginConfig": {
      "id": "universal-id",
      "universalIdConfig": {
        "allowedLayouts": {
          "mrz": [],
          "insuranceCard": [],
          "drivingLicense": [],
          "idFront": []
        },
        "alphabet": "latin",
        "insuranceCard": {
          "lastName": {
            "scanOption": 0,
            "minConfidence": 50
          },
          "firstName": {
            "scanOption": 0,
            "minConfidence": 50
          },
          "dateOfBirth": {
            "scanOption": 0,
            "minConfidence": 50
          },
          "personalNumber": {
            "scanOption": 0,
            "minConfidence": 50
          },
          "authority": {
            "scanOption": 0,
            "minConfidence": 50
          },
          "documentNumber": {
            "scanOption": 0,
            "minConfidence": 50
          },
          "dateOfExpiry": {
            "scanOption": 0,
            "minConfidence": 50
          },
          "nationality": {
            "scanOption": 0,
            "minConfidence": 50
          }
        },
        "idFront": {
          "lastName": {
            "scanOption": 0,
            "minConfidence": 60
          },
          "firstName": {
            "scanOption": 0,
            "minConfidence": 60
          },
          "fullName": {
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
          "dateOfIssue": {
            "scanOption": 0,
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
          },
          "sex": {
            "scanOption": 1,
            "minConfidence": 60
          },
          "personalNumber": {
            "scanOption": 1,
            "minConfidence": 60
          }
        }
      },
      "cancelOnResult": true
    },
    "cutoutConfig": {
      "style": "animated_rect",
      "maxWidthPercent": "90%",
      "maxHeightPercent": "90%",
      "alignment": "center",
      "strokeWidth": 2,
      "cornerRadius": 4,
      "strokeColor": "0099FF",
      "outerColor": "000000",
      "outerAlpha": 0.3,
      "ratioFromSize": {
        "width": 50,
        "height": 31
      },
      "cropPadding": {
        "x": 25,
        "y": 25
      },
      "cropOffset": {
        "x": 0,
        "y": 0
      },
      "feedbackStrokeColor": "0099FF"
    },
    "scanFeedbackConfig": {
      "style": "CONTOUR_RECT",
      "visualFeedbackRedrawTimeout": 100,
      "strokeColor": "0099FF",
      "fillColor": "220099FF",
      "beepOnResult": true,
      "vibrateOnResult": true,
      "strokeWidth": 2
    }
  }
}
