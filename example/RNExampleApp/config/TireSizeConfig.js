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
            "id": "tire-size",
            "cancelOnResult": true,
            "tireSizeConfig": {
                "upsideDownMode": "AUTO"
            }
        },
        "cutoutConfig": {
            "maxWidthPercent": "60%",
            "maxHeightPercent": "60%",
            "alignment": "center",
            "strokeWidth": 2,
            "cornerRadius": 4,
            "strokeColor": "0099FF",
            "outerColor": "000000",
            "outerAlpha": 0.3,
            "ratioFromSize": {
                "width": 5,
                "height": 2
            },
            "feedbackStrokeColor": "0099FF"
        },
        "scanFeedbackConfig": {
            "animation": "traverse_multi",
            "animationDuration": 250,
            "style": "rect",
            "strokeColor": "0099FF",
            "beepOnResult": true,
            "vibrateOnResult": false,
            "strokeWidth": 2
        },
        "uiFeedbackConfig": {
          "presets": [
            {
              "presetName": "simple_instruction_label",
              "presetAttributes": [
                {
                  "attributeName": "instruction_text",
                  "attributeValue": "Look for a standardized number sequence, like 205/55 R16"
                }
              ]
            }
          ]
        }
    }
}
