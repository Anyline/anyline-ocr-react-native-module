export default {
    license: 'ew0KICAibGljZW5zZUtleVZlcnNpb24iOiAiMy4wIiwNCiAgImRlYnVnUmVwb3J0aW5nIjogInBpbmciLA0KICAibWFqb3JWZXJzaW9uIjogIjM3IiwNCiAgInNjb3BlIjogWw0KICAgICJBTEwiLA0KICAgICJORkMiDQogIF0sDQogICJtYXhEYXlzTm90UmVwb3J0ZWQiOiA1LA0KICAiYWR2YW5jZWRCYXJjb2RlIjogdHJ1ZSwNCiAgIm11bHRpQmFyY29kZSI6IHRydWUsDQogICJzdXBwb3J0ZWRCYXJjb2RlRm9ybWF0cyI6IFsNCiAgICAiQUxMIg0KICBdLA0KICAicGxhdGZvcm0iOiBbDQogICAgImlPUyIsDQogICAgIkFuZHJvaWQiDQogIF0sDQogICJzaG93V2F0ZXJtYXJrIjogdHJ1ZSwNCiAgInRvbGVyYW5jZURheXMiOiAzMCwNCiAgInZhbGlkIjogIjIwMjMtMTItMzEiLA0KICAiaW9zSWRlbnRpZmllciI6IFsNCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZXMucmVhY3RuYXRpdmUiDQogIF0sDQogICJhbmRyb2lkSWRlbnRpZmllciI6IFsNCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZXMucmVhY3RuYXRpdmUiDQogIF0NCn0KSlhUTzVRSmZKa2FtUnR2VDc4QTFadGVhTXVzbmJlTW5HSHl0alZmczlxbUtIeDhCT3ltSGVXc2M2aXpjRExIenhtbklnU0JzS1RRNEdhSENsWCtvMEo2R3VtaFNUWHQrNVVuc1hVQVJ6aGhUdEhTa0l1ZVlRQ0p3dTI3bE9kWlBhNVoxSFNxN24weE9tek1jTjM3R1dsajVzVm9SY2pqaUswYVVnY0M5cDFRT0svK29ZejAvWlR2dXFGVjZUeHdiUHkyc3RqaDhLdS9NaXhtcFZFVmh0eWVzMEU2ZzhNVkdBNmNPU1h4NDVXVzgvR0NUWEpqdFJ6NnM2UFBDYzdYSXhQalFjOVAxdzBtblpFYTdjUHpMS3M0Y3hoYjQwSmluSU5qZXp6MDl1em9kbnZUR3VlSEIwcXIzUWNlVmdkS1JVQzhDc24zNmJLM2NLVmVpOVdTUlVRPT0=',
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
            "id": "dial-meter",
            "meterConfig": {
                "scanMode": "dial_meter"
            },
            "cancelOnResult": true
        },
        "cutoutConfig": {
            "style": "rect",
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
