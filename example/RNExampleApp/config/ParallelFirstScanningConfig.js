export default {
  "options": {
    "doneButtonConfig": {
      "offset.y": -88
    }
  },
  "viewPluginCompositeConfig": {
    "id": "parallel-first-vin-barcode",
    "processingMode": "parallelFirstScan",
    "viewPlugins": [
      {
        "viewPluginConfig": {
          "pluginConfig": {
            "id": "barcode",
            "barcodeConfig": {
              "barcodeFormats": ["ALL"]
            }
          },
          "scanFeedbackConfig": {
            "style": "rect",
            "strokeWidth": 2,
            "strokeColor": "0099FF",
            "fillColor": "330099FF",
            "cornerRadius": 0,
            "beepOnResult": false,
            "vibrateOnResult": false,
            "blinkAnimationOnResult": true
          }
        }
      },
      {
        "viewPluginConfig": {
          "pluginConfig": {
            "id": "vin",
            "vinConfig": {}
          },
          "cutoutConfig": {
            "maxWidthPercent": "85%",
            "alignment": "top_half",
            "ratioFromSize": { "width": 62, "height": 9 },
            "offset": { "x": 0, "y": 0 },
            "outerColor": "000000",
            "outerAlpha": 0,
            "strokeWidth": 2,
            "strokeColor": "0099FF",
            "cornerRadius": 4,
            "feedbackStrokeColor": "0099FF"
          },
          "scanFeedbackConfig": {
            "style": "contour_rect",
            "animation": "traverse_multi",
            "animationDuration": 250,
            "strokeWidth": 2,
            "strokeColor": "0099FF",
            "fillColor": "220099FF",
            "beepOnResult": false,
            "vibrateOnResult": false,
            "blinkAnimationOnResult": true
          }
        }
      }
    ]
  }
}
