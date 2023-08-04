export default {
    "options": {
        "doneButtonConfig": {
            "offset.y": -88
        },
        "nativeBarcodeScanningFormats": [
            "CODE_128",
            "CODE_39",
            "QR_CODE",
            "PDF_417"
        ]
    },
    "cameraConfig": {
        "captureResolution": "1080p",
        "pictureResolution": "1080p"
    },
    "flashConfig": {
        "mode": "manual_off",
        "alignment": "top_left"
    },
    "viewPluginConfig": {
        "pluginConfig": {
            "id": "auto-meter",
            "meterConfig": {
                "scanMode": "auto_analog_digital_meter"
            },
            "cancelOnResult": true
        },
        "cutoutConfig": {
            "maxWidthPercent": "100%",
            "width": 768,
            "alignment": "top_half",
            "ratioFromSize": {
                "width": 9,
                "height": 4
            },
            "offset": {
                "x": 0,
                "y": 80
            },
            "strokeWidth": 2,
            "cornerRadius": 4,
            "strokeColor": "0099FF",
            "outerColor": "000000",
            "outerAlpha": 0.3
        },
        "scanFeedbackConfig": {
            "style": "contour_rect",
            "strokeWidth": 2,
            "strokeColor": "0099FF",
            "fillColor": "220099FF",
            "cornerRadius": 2,
            "beepOnResult": true,
            "vibrateOnResult": true,
            "blinkAnimationOnResult": true,
            "redrawTimeout": 200,
            "animationDuration": 75
        }
    }
}
