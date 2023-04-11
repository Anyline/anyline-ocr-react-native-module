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
      "maxWidthPercent": "85%",
      "maxHeightPercent": "70%",
      "width": 0,
      "alignment": "top_half",
      "ratioFromSize": {
        "width": 86,
        "height": 54
      },
      "offset": {
        "x": 0,
        "y": 25
      },
      "cropPadding": {
        "x": 25,
        "y": 25
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
