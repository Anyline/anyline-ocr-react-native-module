export default {
    license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6ICIzLjAiLAogICJkZWJ1Z1JlcG9ydGluZyI6ICJwaW5nIiwKICAibWFqb3JWZXJzaW9uIjogIjM3IiwKICAic2NvcGUiOiBbCiAgICAiQUxMIgogIF0sCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwbGF0Zm9ybSI6IFsKICAgICJpT1MiLAogICAgIkFuZHJvaWQiCiAgXSwKICAic2hvd1dhdGVybWFyayI6IHRydWUsCiAgInRvbGVyYW5jZURheXMiOiAzMCwKICAidmFsaWQiOiAiMjAyMy0xMi0zMSIsCiAgImlvc0lkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIKICBdLAogICJhbmRyb2lkSWRlbnRpZmllciI6IFsKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlIgogIF0KfQpqVkdqaUxWZ05tcFBQQWFUSGRBK21EYkNEQWhnaGx1TG92MmpuWU92NlNJMHJDVjJoTUR6TnBnVVJMRE52Rlp0bUN4alZxcmlpb1BJbExySlFEY0pQdjZHdmY5YWtpVXZXVEdaQ29ra01pd3lUcUc2dkE4QXBDRTBxOENtVUJ1VzZNKzNWVERVdXJFanF6OE5LT1hHMFRUZzA2c281Tk1hRzhrS0Nzd0lzWVBZS1lBYnoxMXdmc09lMkVxV0ZNMGtIdTM0bWVueDU5Ykd4QkVjdHdZZCs5SW5vOTNGZUtHeDJibjJqVURvRENRTGFzdHNQQlMyUXU1WFV0dFNjTjJWZWMwUDkrYTdjaCswUHJLaE5jb0hLcmtwSlczV1lkaEoxMTRiMUhpWjJIL2ljMXdJSnA5ZmszL1lPVHlFYVZFSitYWm1KVG1HYkk2ZU5PcjBhMGE3QWc9PQ==',
    options: {
        "camera": {
            "captureResolution": "720p"
        },
        "flash": {
            "mode": "manual",
            "alignment": "top_left",
        },
        "viewPlugin": {
            "plugin": {
                "id": "DIAL_METER",
                "meterPlugin": {
                    "scanMode": "DIAL_METER"
                }
            },
            "cutoutConfig": {
                "style": "rect",
                "maxWidthPercent": "90%",
                "maxHeightPercent": "90%",
                "alignment": "top_half",
                "ratioFromSize": {
                    "width": 125,
                    "height": 85
                },
                "offset": {
                    "x": 0,
                    "y": 15
                },
                "cropPadding": {
                    "x": 0,
                    "y": 0
                },
                "cropOffset": {
                    "x": 0,
                    "y": 0
                },
                "strokeWidth": 2,
                "cornerRadius": 4,
                "strokeColor": "FFFFFF",
                "outerColor": "000000",
                "outerAlpha": 0.3,
	        "feedbackStrokeColor": "0099FF"
            },
            "scanFeedback": {
	        "style": "CONTOUR_RECT",
        	"strokeColor": "0099FF",
	        "fillColor": "220099FF",
                "blinkOnResult": true,
                "beepOnResult": true,
                "vibrateOnResult": true
            },
            "cancelOnResult": true,
        },
        "nativeBarcodeEnabled": true
    },
}
