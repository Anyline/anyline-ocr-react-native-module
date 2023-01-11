export default {
    license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6ICIzLjAiLAogICJkZWJ1Z1JlcG9ydGluZyI6ICJwaW5nIiwKICAibWFqb3JWZXJzaW9uIjogIjM3IiwKICAic2NvcGUiOiBbCiAgICAiQUxMIgogIF0sCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwbGF0Zm9ybSI6IFsKICAgICJpT1MiLAogICAgIkFuZHJvaWQiCiAgXSwKICAic2hvd1dhdGVybWFyayI6IHRydWUsCiAgInRvbGVyYW5jZURheXMiOiAzMCwKICAidmFsaWQiOiAiMjAyMy0xMi0zMSIsCiAgImlvc0lkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZXMucmVhY3RuYXRpdmUiCiAgXSwKICAiYW5kcm9pZElkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZXMucmVhY3RuYXRpdmUiCiAgXQp9CkxSRm9rNkd3UDNTVFErTTAweFhaMTdGM3lzRkxSZVdvUWxlVThPdGpMdE1hUWFxYTBmRExZNFpZR1g5OVFjYXZ6c3ZpK2ZadWYzQmhqbnpFbVlPY3F6dk1sTGdRTGhEcWpMTDJlLzRmQXh4aVNDRmcwRm9HMzF1NWE4dTVtUkgrYnEwVjAyVnJkdkxGOUx0ZmVoR3c1cm4yZlFqZHhRanJOdm1IM0JMMkQzVmx2L0ZIYkROWjFvTlg2Z0xkRy9uN0ttRHRHV3NaTjk5dElwNVpIMHhEcUFGekI4SGc1Mm5uVXBRT09uN3B5c0xFNml6SExRNnFzRElmZmFRQW5sSHcxTGUwSG5rNTdqRkgzVHFING5lckFCaUxENHNyT2VOMlY1d3dNNm9MNit0djlka2lhQk9DT3BCZE5PbFVIOCtydnU3ZGVDblp0VndtN2RzVkhLbmZqZz09',
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
                "id": "com.anyline.configs.plugin.auto-meter",
                "meterConfig": {
                    "scanMode": "auto_analog_digital_meter"
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
