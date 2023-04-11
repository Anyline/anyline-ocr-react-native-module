export default {
  "viewPluginConfig": {
    "pluginConfig": {
      "id": "barcode",
      "barcodeConfig": {
        "parseAAMVA": false,
        "barcodeFormats": [
          "ALL"
        ]
      },
      "cancelOnResult": true,
      "startScanDelay": 1000
    },
    "cutoutConfig": {
      "animation": "none",
      "maxWidthPercent": "70%",
      "maxHeightPercent": "70%",
      "alignment": "center",
      "ratioFromSize": {
        "width": 3,
        "height": 2
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
      "strokeWidth": 0,
      "strokeColor": "0099FF",
      "fillColor": "330099FF",
      "beepOnResult": false,
      "vibrateOnResult": false,
      "blinkAnimationOnResult": false
    }
  },
  "options": {
    "doneButtonConfig": {
      "title": "OK",
      "type": "rect",
      "cornerRadius": 0,
      "textColor": "FFFFFF",
      "textColorHighlighted": "CCCCCC",
      "fontSize": 33,
      "fontName": "HelveticaNeue",
      "positionXAlignment": "center",
      "positionYAlignment": "bottom",
      "offset": {
        "x": 0,
        "y": -88
      }
    }
  }
}
