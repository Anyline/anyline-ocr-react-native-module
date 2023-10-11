export default {
    "options": {
        "doneButtonConfig": {
            "offset.y": -88
        }
    },
    "cameraConfig": {
        "captureResolution": "1080p",
        "pictureResolution": "1080p",
        "zoomGesture": true
    },
    "flashConfig": {
        "mode": "manual",
        "alignment": "top_right"
    },
    "viewPluginConfig": {
        "pluginConfig": {
            "id": "horizontal-container",
            "containerConfig": {
                "scanMode": "HORIZONTAL"
            },
            "cancelOnResult": true
        },
        "cutoutConfig": {
            "animation": "none",
            "maxWidthPercent": "80%",
            "alignment": "top_half",
            "ratioFromSize": {
                "width": 5,
                "height": 1
            },
            "offset": {
                "x": 0,
                "y": -15
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
            "style": "contour_rect",
            "animation": "traverse_multi",
            "animationDuration": 250,
            "strokeWidth": 2,
            "cornerRadius": 2,
            "strokeColor": "0099FF",
            "fillColor": "330099FF",
            "beepOnResult": true,
            "vibrateOnResult": true,
            "blinkAnimationOnResult": true
        }
    }
}
