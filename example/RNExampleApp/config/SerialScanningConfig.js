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
    "alignment": "top_left"
  },
  "viewPluginCompositeConfig": {
    "id": "serial-lpt-dl-vin",
    "processingMode": "sequential",
    "viewPlugins": [
      {
        "viewPluginConfig": {
          "pluginConfig": {
            "id": "license-plate-eu",
            "licensePlateConfig": {
              "scanMode": "auto"
            },
            "cancelOnResult": true
          },
          "cutoutConfig": {
            "animation": "none",
            "maxWidthPercent": "80%",
            "maxHeightPercent": "80%",
            "alignment": "top_half",
            "ratioFromSize": {
              "width": 4,
              "height": 1
            },
            "offset": {
              "x": 0,
              "y": 40
            },
            "cropPadding": {
              "x": 0,
              "y": 0
            },
            "cropOffset": {
              "x": 0,
              "y": 0
            },
            "cornerRadius": 4,
            "strokeColor": "0099ff",
            "strokeWidth": 2,
            "feedbackStrokeColor": "0099ff",
            "outerColor": "000000",
            "outerAlpha": 0.3
          },
          "scanFeedbackConfig": {
            "style": "rect",
            "strokeWidth": 2,
            "animationDuration": 0,
            "strokeColor": "0099ff",
            "cornerRadius": 0,
            "fillColor": "330099ff",
            "beepOnResult": true,
            "vibrateOnResult": true
          }
        }
      },
      {
        "viewPluginConfig": {
          "pluginConfig": {
            "id": "driver-license-eu",
            "universalIdConfig": {
              "allowedLayouts": {
                "drivingLicense": []
              },
              "alphabet": "latin"
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
      },
      {
        "viewPluginConfig": {
          "pluginConfig": {
            "id": "vin",
            "vinConfig": {},
            "cancelOnResult": true
          },
          "cutoutConfig": {
            "animation": "none",
            "maxWidthPercent": "90%",
            "maxHeightPercent": "100%",
            "width": 0,
            "alignment": "top_half",
            "ratioFromSize": {
              "width": 11,
              "height": 2
            },
            "offset": { "x": 0, "y": 0 },
            "cropOffset": { "x": 0, "y": 0 },
            "cropPadding": { "x": 0, "y": 0 },
            "cornerRadius": 2,
            "strokeColor": "0099ff",
            "strokeWidth": 2,
            "outerColor": "000000",
            "feedbackStrokeColor": "0099FF",
            "outerAlpha": 0.3
          },
          "scanFeedbackConfig": {
            "style": "contour_rect",
            "strokeWidth": 2,
            "cornerRadius": 2,
            "strokeColor": "0099FF",
            "fillColor": "330099FF",
            "beepOnResult": true,
            "vibrateOnResult": true
          }
        }
      }
    ]
  }
}
