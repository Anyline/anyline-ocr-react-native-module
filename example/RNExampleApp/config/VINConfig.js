export default {
  "options": {
    "doneButtonConfig": {
      "offset.y": -88
    }
  },
  "cameraConfig": {
    "captureResolution": "1080p",
    "zoomGesture": true
  },
  "flashConfig": {
    "mode": "manual",
    "alignment": "top_left"
  },
  "viewPluginConfig": {
    "pluginConfig": {
      "id": "vin",
      "cancelOnResult": true,
      "vinConfig": {}
    },
    "cutoutConfig": {
      "maxWidthPercent": "70%",
      "maxHeightPercent": "70%",
      "alignment": "top_half",
      "ratioFromSize": {
        "width": 69,
        "height": 10
      },
      "outerColor": "000000",
      "outerAlpha": 0.3,
      "strokeWidth": 2,
      "strokeColor": "0099FF",
      "cornerRadius": 4,
      "feedbackStrokeColor": "0099FF"
    },
    "scanFeedbackConfig": {
      "animation": "traverse_multi",
      "animationDuration": 250,
      "style": "contour_rect",
      "strokeWidth": 2,
      "strokeColor": "0099FF",
      "fillColor": "220099FF",
      "beepOnResult": true,
      "vibrateOnResult": true,
      "blinkAnimationOnResult": true
    }
  }
}
