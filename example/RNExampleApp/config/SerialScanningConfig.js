export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6IDIsCiAgImRlYnVnUmVwb3J0aW5nIjogIm9uIiwKICAiaW1hZ2VSZXBvcnRDYWNoaW5nIjogZmFsc2UsCiAgIm1ham9yVmVyc2lvbiI6ICIyNSIsCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwaW5nUmVwb3J0aW5nIjogdHJ1ZSwKICAicGxhdGZvcm0iOiBbCiAgICAiaU9TIiwKICAgICJBbmRyb2lkIgogIF0sCiAgInNjb3BlIjogWwogICAgIkFMTCIKICBdLAogICJzaG93UG9wVXBBZnRlckV4cGlyeSI6IGZhbHNlLAogICJzaG93V2F0ZXJtYXJrIjogdHJ1ZSwKICAidG9sZXJhbmNlRGF5cyI6IDkwLAogICJ2YWxpZCI6ICIyMDIyLTEyLTMxIiwKICAiaW9zSWRlbnRpZmllciI6IFsKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlIiwKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlLmJldGEiCiAgXSwKICAiYW5kcm9pZElkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIKICBdCn0KS2RiZmVncWJweG13R2tOVnl1aXNFSUh0L2pGS0NrT2ZjeXlmYjIrbWtURVpwdGMyVWtUbkduZlgvTWJpWmRPdy9pVjFOMVJNMzFjdmp1dEMvbkxZRmxheWUyYTdHTnRpTjhnNmRTZCt6eXZOcktUb29rZFkwRFVWaGFxUko4WHcxeVIzbTd1OXoyb2NwTHl6WmVpa0J2cDJGWjRoWjZScDQveUgrbTFxT01lRmhaaHo3Um5pQnNSa1RjcUNhVW9LRDZJSUY2djc3SGxYdUUvV0VacWFEdFNkaXpmOFRUM2ljTjhkcEdmTzZEZmtJVkx0TWhjK3lTMEdJWHVXbFU1aTlESTVtMGM3SFRnQVMwOWg4dGFsbjl5R2xKQUFtY1VoL2NpdUtCZmlhd2pycFRLSm9FOTBUZjFoSGZIQUxpSzlNcnYwckdJZUNwOHg1STlzOHBtU3d3PT0=',
  options: {
  "camera": {
    "captureResolution": "1080p",
    "pictureResolution": "1080p"
  },
  "flash": {
    "mode": "manual",
    "alignment": "top_right"
  },
  "serialViewPluginComposite": {
    "id": "LP_DL_VIN",
    "cancelOnResult": true,
    "viewPlugins": [
      {
        "viewPlugin": {
          "plugin": {
            "id": "LICENSE_PLATE",
            "licensePlatePlugin": {
              "scanMode": "AUTO"
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
            "style": "rect",
            "strokeWidth": 2,
            "strokeColor": "0099FF",
            "fillColor": "330099FF",
            "cornerRadius": 0,
            "beepOnResult": true,
            "vibrateOnResult": true,
            "blinkAnimationOnResult": true
          },
          "cancelOnResult": true
        }
      },
      {
        "viewPlugin": {
          "plugin": {
            "id": "DRIVING_LICENSE",
            "idPlugin": {
              "universalIdConfig": {
                "allowedLayouts": {
                  "drivingLicense": []
                },
                "drivingLicense": {
                  "surname": {"scanOption": 0, "minConfidence": 40},
                  "givenNames": {"scanOption": 0, "minConfidence": 40},
                  "dateOfBirth": {"scanOption": 0, "minConfidence": 50},
                  "placeOfBirth": {"scanOption": 1, "minConfidence": 50},
                  "dateOfIssue": {"scanOption": 0, "minConfidence": 50},
                  "dateOfExpiry": {"scanOption": 1, "minConfidence": 50},
                  "authority": {"scanOption": 1, "minConfidence": 30},
                  "documentNumber": {"scanOption": 0, "minConfidence": 40},
                  "categories": {"scanOption": 1, "minConfidence": 30},
                  "address": {"scanOption": 1}
                }
              }
            }
          },
          "cutoutConfig" : {
            "style": "rect",
            "maxWidthPercent": "99%",
            "maxHeightPercent": "100%",
            "alignment": "center",
            "ratioFromSize" : {
              "width": 560,
              "height": 354
            },
            "strokeWidth": 2,
            "cornerRadius": 4,
            "strokeColor": "FFFFFF",
            "outerColor": "000000",
            "outerAlpha": 0.3,
            "feedbackStrokeColor": "0099FF"
          },
          "scanFeedback" : {
            "fillColor" : "220099FF",
            "style": "CONTOUR_POINT",
            "strokeColor": "0099FF",
            "strokeWidth": 2,
            "blinkOnResult": true,
            "beepOnResult": true,
            "vibrateOnResult": true
          },
          "cancelOnResult": true
        }
      },
      {
        "viewPlugin": {
          "plugin": {
            "id": "VIN",
            "ocrPlugin": {
              "vinConfig": {
              }
            }
          },
          "cutoutConfig": {
            "style": "rect",
            "maxWidthPercent": "70%",
            "alignment": "top_half",
            "ratioFromSize": {
              "width": 62,
              "height": 9
            },
            "outerColor": "000000",
            "outerAlpha": 0.3,
            "strokeWidth": 2,
            "strokeColor": "FFFFFF",
            "cornerRadius": 4,
            "feedbackStrokeColor": "0099FF"
          },
          "scanFeedback": {
            "animation": "traverse_multi",
            "animationDuration": 250,
            "style": "contour_rect",
            "strokeWidth": 2,
            "strokeColor": "0099FF",
            "fillColor": "220099FF",
            "beepOnResult": true,
            "vibrateOnResult": true,
            "blinkAnimationOnResult": true
          },
          "cancelOnResult": true
        }
      }
    ]
  }
}
}
