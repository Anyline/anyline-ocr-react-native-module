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
        "defaultOrientation": "landscape",
        "instruction": {
          "text": "Please make sure the entire DOT number is inside the cutout.",
        },
        "feedback": {
          "format": {
            "text": "Wrong format detected",
            "image": "ic_wrong_format"
          },
          "brightness": {
            "too_high": {
                "text": "Too bright",
                "image": "ic_too_bright"
            },
            "too_low": {
                "text": "Too dark",
                "image": "ic_too_dark"
            }
          },
          "distance": {
            "text": "Position cutout correctly",
            "image": "ic_move_back"
          },
          "sound": "info_sound_TIN.wav"
        },
        "imageCutout": {
          "image": "dot_overlay"
        }
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
            "maxWidthPercent": "80%",
            "maxHeightPercent": "80%",
            "alignment": "center",
            "strokeWidth": 2,
            "cornerRadius": 4,
            "strokeColor": "0099FF",
            "outerColor": "000000",
            "outerAlpha": 0.3,
            "width": 1400,
            "ratioFromSize": {
                "width": 720,
                "height": 144
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
        }
    }
}
