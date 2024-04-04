export default {
    license: '', //INSERT YOUR LICENSE KEY HERE
    "options": {
        "doneButtonConfig": {
            "offset.y": -88
        },
        "rotateButton": {
            "alignment": "top_right",
            "offset": {
                "x": 0,
                "y": 0
            }
        },
        "defaultOrientation": "landscape"
    },
    "cameraConfig": {
        "captureResolution": "1080p",
        "zoomGesture": true
    },
    "flashConfig": {
        "mode": "manual_off",
        "alignment": "bottom_right",
        "imageOn": "ic_flash_on",
        "imageOff": "ic_flash_off",
        "imageAuto": "ic_flash_auto"
    },
    "viewPluginConfig": {
        "pluginConfig": {
            "id": "TIRE",
            "cancelOnResult": true,
            "tinConfig": {
                "scanMode": "DOT",
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
                "height": 1
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
                    "presetName": "tin_custom_v1",
                    "presetAttributes": [
                        {
                            "attributeName": "lighting_toodark_image",
                            "attributeValue": "uifeedback_tin_toodark"
                        },
                        {
                            "attributeName": "lighting_toobright_image",
                            "attributeValue": "uifeedback_tin_toobright"
                        },
                        {
                            "attributeName": "distance_moveback_image",
                            "attributeValue": "uifeedback_tin_moveback"
                        },
                        {
                            "attributeName": "distance_movecloser_image",
                            "attributeValue": "uifeedback_tin_movecloser"
                        },
                        {
                            "attributeName": "format_wrong_image",
                            "attributeValue": "uifeedback_tin_wrongformat"
                        },
                        {
                            "attributeName": "date_wrong_image",
                            "attributeValue": "uifeedback_tin_wrongformat"
                        },
                        {
                            "attributeName": "lighting_toodark_text",
                            "attributeValue": ""
                        },
                        {
                            "attributeName": "lighting_toobright_text",
                            "attributeValue": ""
                        },
                        {
                            "attributeName": "distance_moveback_text",
                            "attributeValue": ""
                        },
                        {
                            "attributeName": "distance_movecloser_text",
                            "attributeValue": ""
                        },
                        {
                            "attributeName": "format_wrong_text",
                            "attributeValue": ""
                        },
                        {
                            "attributeName": "date_wrong_text",
                            "attributeValue": ""
                        },
                        {
                            "attributeName": "lighting_toodark_sound",
                            "attributeValue": "info_sound_TIN.wav"
                        },
                        {
                            "attributeName": "lighting_toobright_sound",
                            "attributeValue": "info_sound_TIN.wav"
                        },
                        {
                            "attributeName": "distance_moveback_sound",
                            "attributeValue": "info_sound_TIN.wav"
                        },
                        {
                            "attributeName": "distance_movecloser_sound",
                            "attributeValue": "info_sound_TIN.wav"
                        },
                        {
                            "attributeName": "format_wrong_sound",
                            "attributeValue": "info_sound_TIN.wav"
                        },
                        {
                            "attributeName": "date_wrong_sound",
                            "attributeValue": "info_sound_TIN.wav"
                        }
                    ]
                }
            ]
        }
    }
}
