export default {
    license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6ICIzLjAiLAogICJkZWJ1Z1JlcG9ydGluZyI6ICJwaW5nIiwKICAibWFqb3JWZXJzaW9uIjogIjM3IiwKICAic2NvcGUiOiBbCiAgICAiQUxMIgogIF0sCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwbGF0Zm9ybSI6IFsKICAgICJpT1MiLAogICAgIkFuZHJvaWQiCiAgXSwKICAic2hvd1dhdGVybWFyayI6IHRydWUsCiAgInRvbGVyYW5jZURheXMiOiAzMCwKICAidmFsaWQiOiAiMjAyMy0xMi0zMSIsCiAgImlvc0lkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZXMucmVhY3RuYXRpdmUiCiAgXSwKICAiYW5kcm9pZElkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZXMucmVhY3RuYXRpdmUiCiAgXQp9CkxSRm9rNkd3UDNTVFErTTAweFhaMTdGM3lzRkxSZVdvUWxlVThPdGpMdE1hUWFxYTBmRExZNFpZR1g5OVFjYXZ6c3ZpK2ZadWYzQmhqbnpFbVlPY3F6dk1sTGdRTGhEcWpMTDJlLzRmQXh4aVNDRmcwRm9HMzF1NWE4dTVtUkgrYnEwVjAyVnJkdkxGOUx0ZmVoR3c1cm4yZlFqZHhRanJOdm1IM0JMMkQzVmx2L0ZIYkROWjFvTlg2Z0xkRy9uN0ttRHRHV3NaTjk5dElwNVpIMHhEcUFGekI4SGc1Mm5uVXBRT09uN3B5c0xFNml6SExRNnFzRElmZmFRQW5sSHcxTGUwSG5rNTdqRkgzVHFING5lckFCaUxENHNyT2VOMlY1d3dNNm9MNit0djlka2lhQk9DT3BCZE5PbFVIOCtydnU3ZGVDblp0VndtN2RzVkhLbmZqZz09',
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
                "id": "COMMERCIAL_TIRE_ID",
                "tirePlugin": {
                    "commercialTireIdConfig":{
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
                "style": "contour_rect",
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
