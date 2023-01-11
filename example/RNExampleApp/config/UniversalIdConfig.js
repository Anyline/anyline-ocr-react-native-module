export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6ICIzLjAiLAogICJkZWJ1Z1JlcG9ydGluZyI6ICJwaW5nIiwKICAibWFqb3JWZXJzaW9uIjogIjM3IiwKICAic2NvcGUiOiBbCiAgICAiQUxMIgogIF0sCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwbGF0Zm9ybSI6IFsKICAgICJpT1MiLAogICAgIkFuZHJvaWQiCiAgXSwKICAic2hvd1dhdGVybWFyayI6IHRydWUsCiAgInRvbGVyYW5jZURheXMiOiAzMCwKICAidmFsaWQiOiAiMjAyMy0xMi0zMSIsCiAgImlvc0lkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZXMucmVhY3RuYXRpdmUiCiAgXSwKICAiYW5kcm9pZElkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZXMucmVhY3RuYXRpdmUiCiAgXQp9CkxSRm9rNkd3UDNTVFErTTAweFhaMTdGM3lzRkxSZVdvUWxlVThPdGpMdE1hUWFxYTBmRExZNFpZR1g5OVFjYXZ6c3ZpK2ZadWYzQmhqbnpFbVlPY3F6dk1sTGdRTGhEcWpMTDJlLzRmQXh4aVNDRmcwRm9HMzF1NWE4dTVtUkgrYnEwVjAyVnJkdkxGOUx0ZmVoR3c1cm4yZlFqZHhRanJOdm1IM0JMMkQzVmx2L0ZIYkROWjFvTlg2Z0xkRy9uN0ttRHRHV3NaTjk5dElwNVpIMHhEcUFGekI4SGc1Mm5uVXBRT09uN3B5c0xFNml6SExRNnFzRElmZmFRQW5sSHcxTGUwSG5rNTdqRkgzVHFING5lckFCaUxENHNyT2VOMlY1d3dNNm9MNit0djlka2lhQk9DT3BCZE5PbFVIOCtydnU3ZGVDblp0VndtN2RzVkhLbmZqZz09',
  "cameraConfig": {
    "captureResolution": "1080p",
    "pictureResolution": "1080p"
  },
  "flashConfig": {
    "mode": "manual",
    "alignment": "top_left",
    "offset": {
      "x": 0,
      "y": 0
    }
  },
  "viewPluginConfig": {
    "pluginConfig": {
      "id": "com.anyline.configs.plugin.id",
      "universalIdConfig": {
        "allowedLayouts": {
          "mrz": [],
          "insuranceCard": [],
          "drivingLicense": [],
          "idFront": []
        },
        "alphabet": "latin",
        "insuranceCard": {
          "lastName": {
            "scanOption": 0,
            "minConfidence": 50
          },
          "firstName": {
            "scanOption": 0,
            "minConfidence": 50
          },
          "dateOfBirth": {
            "scanOption": 0,
            "minConfidence": 50
          },
          "personalNumber": {
            "scanOption": 0,
            "minConfidence": 50
          },
          "authority": {
            "scanOption": 0,
            "minConfidence": 50
          },
          "documentNumber": {
            "scanOption": 0,
            "minConfidence": 50
          },
          "dateOfExpiry": {
            "scanOption": 0,
            "minConfidence": 50
          },
          "nationality": {
            "scanOption": 0,
            "minConfidence": 50
          }
        },
        "idFront": {
          "lastName": {
            "scanOption": 0,
            "minConfidence": 60
          },
          "firstName": {
            "scanOption": 0,
            "minConfidence": 60
          },
          "fullName": {
            "scanOption": 0,
            "minConfidence": 60
          },
          "dateOfBirth": {
            "scanOption": 0,
            "minConfidence": 60
          },
          "placeOfBirth": {
            "scanOption": 1,
            "minConfidence": 60
          },
          "dateOfIssue": {
            "scanOption": 0,
            "minConfidence": 60
          },
          "dateOfExpiry": {
            "scanOption": 1,
            "minConfidence": 60
          },
          "cardAccessNumber": {
            "scanOption": 1,
            "minConfidence": 60
          },
          "documentNumber": {
            "scanOption": 0,
            "minConfidence": 60
          },
          "nationality": {
            "scanOption": 1,
            "minConfidence": 60
          },
          "sex": {
            "scanOption": 1,
            "minConfidence": 60
          },
          "personalNumber": {
            "scanOption": 1,
            "minConfidence": 60
          }
        }
      },
      "cancelOnResult": true
    },
    "cutoutConfig": {
      "style": "animated_rect",
      "maxWidthPercent": "90%",
      "maxHeightPercent": "90%",
      "alignment": "center",
      "strokeWidth": 2,
      "cornerRadius": 4,
      "strokeColor": "0099FF",
      "outerColor": "000000",
      "outerAlpha": 0.3,
      "ratioFromSize": {
        "width": 50,
        "height": 31
      },
      "cropPadding": {
        "x": 25,
        "y": 25
      },
      "cropOffset": {
        "x": 0,
        "y": 0
      },
      "feedbackStrokeColor": "0099FF"
    },
    "scanFeedbackConfig": {
      "style": "CONTOUR_RECT",
      "visualFeedbackRedrawTimeout": 100,
      "strokeColor": "0099FF",
      "fillColor": "220099FF",
      "beepOnResult": true,
      "vibrateOnResult": true,
      "strokeWidth": 2
    }
  }
}
