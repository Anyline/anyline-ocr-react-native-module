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
  "viewPluginConfig": {
    "pluginConfig": {
      "id": "license-plate-af",
      "licensePlateConfig": {
        "scanMode": "africa"
      },
      "cancelOnResult": true
    },
    "cutoutConfig": {
      "animation": "none",
      "maxWidthPercent": "80%",
      "maxHeightPercent": "80%",
      "alignment": "top_half",
      "ratioFromSize": {
        "width": 2,
        "height": 1
      },
      "offset": {
        "x": 0,
        "y": 0
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
      "vibrateOnResult": true,
      "blinkAnimationOnResult": true
    }
  }
}
