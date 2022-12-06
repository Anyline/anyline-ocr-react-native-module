export default {
    license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6ICIzLjAiLAogICJkZWJ1Z1JlcG9ydGluZyI6ICJwaW5nIiwKICAibWFqb3JWZXJzaW9uIjogIjM3IiwKICAic2NvcGUiOiBbCiAgICAiQUxMIgogIF0sCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwbGF0Zm9ybSI6IFsKICAgICJpT1MiLAogICAgIkFuZHJvaWQiCiAgXSwKICAic2hvd1dhdGVybWFyayI6IHRydWUsCiAgInRvbGVyYW5jZURheXMiOiAzMCwKICAidmFsaWQiOiAiMjAyMy0xMi0zMSIsCiAgImlvc0lkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIKICBdLAogICJhbmRyb2lkSWRlbnRpZmllciI6IFsKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlIgogIF0KfQpqVkdqaUxWZ05tcFBQQWFUSGRBK21EYkNEQWhnaGx1TG92MmpuWU92NlNJMHJDVjJoTUR6TnBnVVJMRE52Rlp0bUN4alZxcmlpb1BJbExySlFEY0pQdjZHdmY5YWtpVXZXVEdaQ29ra01pd3lUcUc2dkE4QXBDRTBxOENtVUJ1VzZNKzNWVERVdXJFanF6OE5LT1hHMFRUZzA2c281Tk1hRzhrS0Nzd0lzWVBZS1lBYnoxMXdmc09lMkVxV0ZNMGtIdTM0bWVueDU5Ykd4QkVjdHdZZCs5SW5vOTNGZUtHeDJibjJqVURvRENRTGFzdHNQQlMyUXU1WFV0dFNjTjJWZWMwUDkrYTdjaCswUHJLaE5jb0hLcmtwSlczV1lkaEoxMTRiMUhpWjJIL2ljMXdJSnA5ZmszL1lPVHlFYVZFSitYWm1KVG1HYkk2ZU5PcjBhMGE3QWc9PQ==',
    options: {
        "camera": {
            "captureResolution": "720p"
        },
        "flash": {
            "mode": "manual",
            "alignment": "bottom_right"
        },
        "viewPlugin" : {
            "plugin": {
                "id": "TIRE_SIZE",
                "tirePlugin": {
                    "tireSizeConfig":{
                    }
                }
            },
            "cutoutConfig" : {
                "style": "rect",
                "width": 720,
                "alignment": "center",
                "maxWidthPercent": "80%",
                "ratioFromSize": {
                    "width": 720,
                    "height": 144
                },
                "outerColor": "000000",
                "outerAlpha": 0.3,
                "strokeWidth": 2,
                "strokeColor": "FFFFFF",
                "cornerRadius": 2,
                "feedbackStrokeColor": "0099FF"
            },
            "scanFeedback" : {
                "animation": "traverse_multi",
                "animationDuration" : 250,
                "style": "rect",
                "strokeWidth": 2,
                "strokeColor": "0099FF",
                "beepOnResult": true,
                "vibrateOnResult": true,
                "blinkAnimationOnResult": true
            },
            "cancelOnResult" : true
        }
    }
}
