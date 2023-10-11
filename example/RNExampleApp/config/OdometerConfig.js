export default {
    "options": {

    },
  "cameraConfig":{
    "captureResolution" : "720p",
    "zoomGesture": true
  },
  "flashConfig" : {
    "mode": "manual",
    "alignment": "top_right"
  },
  "viewPluginConfig" : {
    "pluginConfig" : {
      "id" : "Odometer",
      "odometerConfig" : {

      },
      "cancelOnResult" : true
    },
    "cutoutConfig" : {
      "alignment" : "top",
      "strokeWidth" : 2,
      "strokeColor" : "FFFFFF",
      "cornerRadius" : 4,
      "outerColor" : "000000",
      "outerAlpha" : 0.5,
      "feedbackStrokeColor" : "0099FF",
      "maxWidthPercent": "85%",
      "maxHeightPercent": "85%",
      "ratioFromSize": {
        "width": 2.75,
        "height": 1
      },
      "offset": {
        "x": 0,
        "y": 120
      }
    },
    "scanFeedbackConfig" : {
      "style" : "CONTOUR_RECT",
      "strokeColor" : "0099FF",
      "fillColor" : "220099FF",
      "blinkOnResult": true,
      "beepOnResult": true,
      "vibrateOnResult": true
    }
  }
}
