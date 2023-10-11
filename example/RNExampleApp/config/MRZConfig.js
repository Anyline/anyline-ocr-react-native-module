export default {
  "options": {
    "doneButtonConfig": {
      "offset.y": -88
    }
  },
  "viewPluginConfig": {
    "pluginConfig": {
      "id": "mrz",
      "mrzConfig": {
        "strictMode": false,
        "cropAndTransformID": false
      }
    },
    "cutoutConfig": {
      "animation": "none",
      "maxWidthPercent": "90%",
      "maxHeightPercent": "90%",
      "alignment": "center",
      "ratioFromSize": {
        "width": 161,
        "height": 100
      },
      "offset": {
        "x": 0,
        "y": 0
      },
      "cropPadding": {
        "x": 0,
        "y": 0
      },
      "outerColor": "000000",
      "outerAlpha": 0.3,
      "strokeWidth": 2,
      "strokeColor": "0099FF",
      "cornerRadius": 2,
      "feedbackStrokeColor": "0099FF"
    },
    "scanFeedbackConfig": {
      "style": "rect",
      "strokeWidth": 2,
      "strokeColor": "0099FF",
      "fillColor": "220099FF",
      "beepOnResult": false,
      "vibrateOnResult": false,
      "blinkAnimationOnResult": false
    }
  }
}
