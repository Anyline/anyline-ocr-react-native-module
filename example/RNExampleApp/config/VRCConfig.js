export default {
    "options": {
        "doneButtonConfig": {
            "offset.y": -88
        }
    },
    "flashConfig": {
        "mode": "manual",
        "alignment": "bottom_right"
    },
    "viewPluginConfig": {
        "pluginConfig": {
            "id": "vrc",
            "vehicleRegistrationCertificateConfig": {
                "vehicleRegistrationCertificate": {
                    "documentNumber": {
                        "scanOption": "optional",
                        "minConfidence": 40
                    },
                    "licensePlate": {
                        "scanOption": "mandatory",
                        "minConfidence": 40
                    },
                    "lastName": {
                        "scanOption": "mandatory",
                        "minConfidence": 60
                    },
                    "firstName": {
                        "scanOption": "optional",
                        "minConfidence": 40
                    },
                    "address": {
                        "scanOption": "mandatory",
                        "minConfidence": 50
                    },
                    "firstIssued": {
                        "scanOption": "mandatory",
                        "minConfidence": 60
                    },
                    "manufacturerCode": {
                        "scanOption": "mandatory",
                        "minConfidence": 50
                    },
                    "vehicleTypeCode": {
                        "scanOption": "mandatory",
                        "minConfidence": 50
                    },
                    "vehicleIdentificationNumber": {
                        "scanOption": "mandatory",
                        "minConfidence": 60
                    },
                    "brand": {
                        "scanOption": "optional",
                        "minConfidence": 40
                    },
                    "vehicleType": {
                        "scanOption": "optional",
                        "minConfidence": 40
                    },
                    "displacement": {
                        "scanOption": "optional",
                        "minConfidence": 40
                    },
                    "tire": {
                        "scanOption": "optional",
                        "minConfidence": 50
                    }
                }
            },
            "cancelOnResult": true
        },
        "cutoutConfig": {
            "animation": "none",
            "maxWidthPercent": "90%",
            "maxHeightPercent": "90%",
            "alignment": "center",
            "ratioFromSize": {
                "width": 2,
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
            "strokeColor": "0099FF",
            "strokeWidth": 2,
            "outerColor": "000000",
            "feedbackStrokeColor": "0099FF",
            "outerAlpha": 0.3
        },
        "scanFeedbackConfig": {
            "style": "animated_rect",
            "strokeWidth": 0,
            "strokeColor": "0099ff",
            "fillColor": "000099ff",
            "beepOnResult": true,
            "vibrateOnResult": true,
            "blinkAnimationOnResult": false
        }
    }
  }
  