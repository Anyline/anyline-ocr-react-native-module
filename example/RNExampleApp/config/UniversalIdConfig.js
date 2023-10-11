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
            "scanOption": "mandatory",
            "minConfidence": 50
          },
          "firstName": {
            "scanOption": "mandatory",
            "minConfidence": 50
          },
          "dateOfBirth": {
            "scanOption": "mandatory",
            "minConfidence": 50
          },
          "personalNumber": {
            "scanOption": "mandatory",
            "minConfidence": 50
          },
          "authority": {
            "scanOption": "mandatory",
            "minConfidence": 50
          },
          "documentNumber": {
            "scanOption": "mandatory",
            "minConfidence": 50
          },
          "dateOfExpiry": {
            "scanOption": "mandatory",
            "minConfidence": 50
          },
          "nationality": {
            "scanOption": "mandatory",
            "minConfidence": 50
          }
        },
        "idFront": {
          "lastName": {
            "scanOption": "mandatory",
            "minConfidence": 60
          },
          "firstName": {
            "scanOption": "mandatory",
            "minConfidence": 60
          },
          "fullName": {
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
          "dateOfIssue": {
            "scanOption": "mandatory",
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
          },
          "sex": {
            "scanOption": "optional",
            "minConfidence": 60
          },
          "personalNumber": {
            "scanOption": "optional",
            "minConfidence": 60
          }
        }
      },
      "cancelOnResult": true
    },
    "cutoutConfig": {
      "maxWidthPercent": "90%",
      "maxHeightPercent": "90%",
      "alignment": "center",
      "strokeWidth": 2,
      "cornerRadius": 4,
      "strokeColor": "0099FF",
      "outerColor": "000000",
      "outerAlpha": 0.3,
      "ratioFromSize": {
        "width": 161,
        "height": 100
      },
      "cropPadding": {
        "x": 0,
        "y": 0
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
