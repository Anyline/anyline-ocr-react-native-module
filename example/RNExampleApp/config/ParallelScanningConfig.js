export default {
  "options": {
    "doneButtonConfig": {
      "offset.y": -88
    }
  },
  "viewPluginCompositeConfig": {
    "id": "parallel-meter-barcode",
    "processingMode": "parallel",
    "viewPlugins": [
      {
        "viewPluginConfig": {
          "pluginConfig": {
            "id": "meter",
            "meterConfig": {
              "scanMode": "auto_analog_digital_meter"
            },
            "cancelOnResult": true,
            "startScanDelay": 0
          },
          "cutoutConfig": {
            "maxWidthPercent": "100%",
            "width": 768,
            "alignment": "top_half",
            "ratioFromSize": {
              "width": 9,
              "height": 4
            },
            "offset": {
              "x": 0,
              "y": 80
            },
            "strokeWidth": 2,
            "cornerRadius": 4,
            "strokeColor": "0099FF",
            "outerColor": "000000",
            "outerAlpha": 0.3
          },
          "scanFeedbackConfig": {
            "style": "contour_rect",
            "strokeWidth": 2,
            "strokeColor": "0099FF",
            "fillColor": "220099FF",
            "cornerRadius": 2,
            "beepOnResult": true,
            "vibrateOnResult": true,
            "blinkAnimationOnResult": true,
            "redrawTimeout": 200,
            "animationDuration": 75
          }
        }
      },
      {
        "viewPluginConfig": {
          "pluginConfig": {
            "id": "serial-number",
            "ocrConfig": {
              "scanMode": "auto"
            },
            "cancelOnResult": true
          },
          "cutoutConfig": {
            "animation": "none",
            "maxWidthPercent": "80%",
            "alignment": "center",
            "ratioFromSize": {
              "width": 5,
              "height": 1
            },
            "offset": {
              "x": 0,
              "y": 0
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
            "style": "rect",
            "strokeWidth": 2,
            "cornerRadius": 2,
            "strokeColor": "0099FF",
            "fillColor": "330099FF",
            "beepOnResult": true,
            "vibrateOnResult": true,
            "blinkAnimationOnResult": false
          }
        }
      }
    ]
  }
}
