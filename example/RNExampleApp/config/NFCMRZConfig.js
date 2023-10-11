export default {
  "options": {
    "enableNFCWithMRZ": true,
    "labelConfig": {
      "text": "Scan Passport",
      "size": 22,
      "offset.x": 0,
      "offset.y": -10
    },
    "doneButtonConfig": {
      "offset.y": -88
    }
  },
  "cameraConfig": {
    "captureResolution": "1080p"
  },
  "flashConfig": {
    "mode": "manual",
    "alignment": "bottom_left"
  },
  "viewPluginConfig": {
    "pluginConfig": {
      "id": "id-nfc",
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
        "y": 90
      },
      "cropPadding": {
        "x": 0,
        "y": 0
      },
      "outerColor": "000000",
      "outerAlpha": 0.3,
      "strokeWidth": 2,
      "strokeColor": "0099FF",
      "cornerRadius": 4,
      "feedbackStrokeColor": "0099FF"
    },
    "scanFeedbackConfig": {
      "style": "rect",
      "strokeWidth": 2,
      "strokeColor": "0099FF",
      "fillColor": "220099FF",
      "beepOnResult": true,
      "vibrateOnResult": true,
      "blinkAnimationOnResult": false
    }
  }
}
