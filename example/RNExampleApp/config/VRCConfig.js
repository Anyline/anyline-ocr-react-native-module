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
                        "scanOption": 1,
                        "minConfidence": 40
                    },
                    "licensePlate": {
                        "scanOption": 0,
                        "minConfidence": 40
                    },
                    "lastName": {
                        "scanOption": 0,
                        "minConfidence": 60
                    },
                    "firstName": {
                        "scanOption": 1,
                        "minConfidence": 40
                    },
                    "address": {
                        "scanOption": 0,
                        "minConfidence": 50
                    },
                    "firstIssued": {
                        "scanOption": 0,
                        "minConfidence": 60
                    },
                    "manufacturerCode": {
                        "scanOption": 0,
                        "minConfidence": 50
                    },
                    "vehicleTypeCode": {
                        "scanOption": 0,
                        "minConfidence": 50
                    },
                    "vehicleIdentificationNumber": {
                        "scanOption": 0,
                        "minConfidence": 60
                    },
                    "brand": {
                        "scanOption": 1,
                        "minConfidence": 40
                    },
                    "vehicleType": {
                        "scanOption": 1,
                        "minConfidence": 40
                    },
                    "displacement": {
                        "scanOption": 1,
                        "minConfidence": 40
                    },
                    "tire": {
                        "scanOption": 1,
                        "minConfidence": 50
                    }
                }
            },
            "cancelOnResult": true
        },
        "cutoutConfig": {
            "animation": "none",
            "maxWidthPercent": "90%",
            "maxHeightPercent": "80%",
            "alignment": "center",
            "ratioFromSize": {
                "width": 90,
                "height": 46
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
                "x": 50,
                "y": 50
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
  