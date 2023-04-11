export default {
    "viewPluginConfig": {
        "pluginConfig": {
            "id": "barcode-pdf417-aamva",
            "barcodeConfig": {
                "barcodeFormats": [
                    "PDF_417"
                ],
                "parseAAMVA": true
            },
            "cancelOnResult": true
        },
        "cutoutConfig": {
            "animation": "none",
            "maxWidthPercent": "75%",
            "maxHeightPercent": "50%",
            "width": 0,
            "alignment": "center",
            "ratioFromSize": {
                "width": 4,
                "height": 1
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
            "style": "animated_rect",
            "strokeWidth": 2,
            "strokeColor": "000000",
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
