export default {
    license: 'ew0KICAibGljZW5zZUtleVZlcnNpb24iOiAiMy4wIiwNCiAgImRlYnVnUmVwb3J0aW5nIjogInBpbmciLA0KICAibWFqb3JWZXJzaW9uIjogIjM3IiwNCiAgInNjb3BlIjogWw0KICAgICJBTEwiLA0KICAgICJORkMiDQogIF0sDQogICJtYXhEYXlzTm90UmVwb3J0ZWQiOiA1LA0KICAiYWR2YW5jZWRCYXJjb2RlIjogdHJ1ZSwNCiAgIm11bHRpQmFyY29kZSI6IHRydWUsDQogICJzdXBwb3J0ZWRCYXJjb2RlRm9ybWF0cyI6IFsNCiAgICAiQUxMIg0KICBdLA0KICAicGxhdGZvcm0iOiBbDQogICAgImlPUyIsDQogICAgIkFuZHJvaWQiDQogIF0sDQogICJzaG93V2F0ZXJtYXJrIjogdHJ1ZSwNCiAgInRvbGVyYW5jZURheXMiOiAzMCwNCiAgInZhbGlkIjogIjIwMjMtMTItMzEiLA0KICAiaW9zSWRlbnRpZmllciI6IFsNCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZXMucmVhY3RuYXRpdmUiDQogIF0sDQogICJhbmRyb2lkSWRlbnRpZmllciI6IFsNCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZXMucmVhY3RuYXRpdmUiDQogIF0NCn0KSlhUTzVRSmZKa2FtUnR2VDc4QTFadGVhTXVzbmJlTW5HSHl0alZmczlxbUtIeDhCT3ltSGVXc2M2aXpjRExIenhtbklnU0JzS1RRNEdhSENsWCtvMEo2R3VtaFNUWHQrNVVuc1hVQVJ6aGhUdEhTa0l1ZVlRQ0p3dTI3bE9kWlBhNVoxSFNxN24weE9tek1jTjM3R1dsajVzVm9SY2pqaUswYVVnY0M5cDFRT0svK29ZejAvWlR2dXFGVjZUeHdiUHkyc3RqaDhLdS9NaXhtcFZFVmh0eWVzMEU2ZzhNVkdBNmNPU1h4NDVXVzgvR0NUWEpqdFJ6NnM2UFBDYzdYSXhQalFjOVAxdzBtblpFYTdjUHpMS3M0Y3hoYjQwSmluSU5qZXp6MDl1em9kbnZUR3VlSEIwcXIzUWNlVmdkS1JVQzhDc24zNmJLM2NLVmVpOVdTUlVRPT0=',
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
            "id": "com.anyline.configs.plugin.vrc",
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
  