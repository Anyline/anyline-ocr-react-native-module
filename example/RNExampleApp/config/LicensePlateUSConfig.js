export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6ICIzLjAiLAogICJkZWJ1Z1JlcG9ydGluZyI6ICJwaW5nIiwKICAibWFqb3JWZXJzaW9uIjogIjM3IiwKICAic2NvcGUiOiBbCiAgICAiQUxMIgogIF0sCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwbGF0Zm9ybSI6IFsKICAgICJpT1MiLAogICAgIkFuZHJvaWQiCiAgXSwKICAic2hvd1dhdGVybWFyayI6IHRydWUsCiAgInRvbGVyYW5jZURheXMiOiAzMCwKICAidmFsaWQiOiAiMjAyMy0xMi0zMSIsCiAgImlvc0lkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZXMucmVhY3RuYXRpdmUiCiAgXSwKICAiYW5kcm9pZElkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZXMucmVhY3RuYXRpdmUiCiAgXQp9CkxSRm9rNkd3UDNTVFErTTAweFhaMTdGM3lzRkxSZVdvUWxlVThPdGpMdE1hUWFxYTBmRExZNFpZR1g5OVFjYXZ6c3ZpK2ZadWYzQmhqbnpFbVlPY3F6dk1sTGdRTGhEcWpMTDJlLzRmQXh4aVNDRmcwRm9HMzF1NWE4dTVtUkgrYnEwVjAyVnJkdkxGOUx0ZmVoR3c1cm4yZlFqZHhRanJOdm1IM0JMMkQzVmx2L0ZIYkROWjFvTlg2Z0xkRy9uN0ttRHRHV3NaTjk5dElwNVpIMHhEcUFGekI4SGc1Mm5uVXBRT09uN3B5c0xFNml6SExRNnFzRElmZmFRQW5sSHcxTGUwSG5rNTdqRkgzVHFING5lckFCaUxENHNyT2VOMlY1d3dNNm9MNit0djlka2lhQk9DT3BCZE5PbFVIOCtydnU3ZGVDblp0VndtN2RzVkhLbmZqZz09',
  options: {
    "camera": {
      "captureResolution": "1080p",
      "zoomGesture": true
    },
    "flash": {
      "mode": "manual",
      "alignment": "top_left"
    },
    "viewPlugin": {
      "plugin": {
        "id": "LICENSE_PLATE_US",
        "licensePlatePlugin": {
          "scanMode": "unitedStates"
        }
      },
      "cutoutConfig": {
        "style": "rect",
        "maxWidthPercent": "80%",
        "maxHeightPercent": "80%",
        "alignment": "top_half",
        "width": 720,
        "ratioFromSize": {
          "width": 2,
          "height": 1
        },
        "strokeWidth": 2,
        "cornerRadius": 10,
        "strokeColor": "FFFFFF",
        "outerColor": "000000",
        "outerAlpha": 0.3,
        "feedbackStrokeColor": "0099FF"
      },
      "scanFeedback": {
        "animationDuration": 0,
        "style": "RECT",
        "strokeWidth": 2,
        "strokeColor": "0099FF",
        "blinkOnResult": true,
        "beepOnResult": true,
        "vibrateOnResult": true
      },
      "cancelOnResult": true
    }
  },
}
