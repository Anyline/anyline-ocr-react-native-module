export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6IDIsCiAgImRlYnVnUmVwb3J0aW5nIjogIm9uIiwKICAiaW1hZ2VSZXBvcnRDYWNoaW5nIjogZmFsc2UsCiAgIm1ham9yVmVyc2lvbiI6ICIyNSIsCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwaW5nUmVwb3J0aW5nIjogdHJ1ZSwKICAicGxhdGZvcm0iOiBbCiAgICAiaU9TIiwKICAgICJBbmRyb2lkIgogIF0sCiAgInNjb3BlIjogWwogICAgIkFMTCIKICBdLAogICJzaG93UG9wVXBBZnRlckV4cGlyeSI6IGZhbHNlLAogICJzaG93V2F0ZXJtYXJrIjogdHJ1ZSwKICAidG9sZXJhbmNlRGF5cyI6IDkwLAogICJ2YWxpZCI6ICIyMDIyLTEyLTMxIiwKICAiaW9zSWRlbnRpZmllciI6IFsKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlIiwKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlLmJldGEiCiAgXSwKICAiYW5kcm9pZElkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIKICBdCn0KS2RiZmVncWJweG13R2tOVnl1aXNFSUh0L2pGS0NrT2ZjeXlmYjIrbWtURVpwdGMyVWtUbkduZlgvTWJpWmRPdy9pVjFOMVJNMzFjdmp1dEMvbkxZRmxheWUyYTdHTnRpTjhnNmRTZCt6eXZOcktUb29rZFkwRFVWaGFxUko4WHcxeVIzbTd1OXoyb2NwTHl6WmVpa0J2cDJGWjRoWjZScDQveUgrbTFxT01lRmhaaHo3Um5pQnNSa1RjcUNhVW9LRDZJSUY2djc3SGxYdUUvV0VacWFEdFNkaXpmOFRUM2ljTjhkcEdmTzZEZmtJVkx0TWhjK3lTMEdJWHVXbFU1aTlESTVtMGM3SFRnQVMwOWg4dGFsbjl5R2xKQUFtY1VoL2NpdUtCZmlhd2pycFRLSm9FOTBUZjFoSGZIQUxpSzlNcnYwckdJZUNwOHg1STlzOHBtU3d3PT0=',
  options: {
  "camera": {
    "captureResolution": "1080p"
  },
  "flash": {
    "mode": "manual",
    "alignment": "top_right"
  },
  "parallelViewPluginComposite": {
    "id": "DOUBLE_TARIFF_SEQUENTIAL",
    "cancelOnResult": true,
    "viewPlugins": [
      {
        "viewPlugin": {
          "plugin": {
            "id": "METER_PLUGIN",
            "meterPlugin": {
              "scanMode": "AUTO_ANALOG_DIGITAL_METER"
            }
          },
          "cutoutConfig": {
            "style": "rect",
            "alignment": "top",
            "strokeWidth": 2,
            "strokeColor": "FFFFFF",
            "cornerRadius": 4,
            "outerColor": "000000",
            "outerAlpha": 0.5,
            "feedbackStrokeColor": "0099FF",
            "offset": {
              "x": 0,
              "y": 120
            }
          },
          "scanFeedback": {
            "style": "CONTOUR_RECT",
            "strokeColor": "0099FF",
            "strokeWidth": 2,
            "fillColor": "220099FF",
            "cornerRadius": 2,
            "redrawTimeout": 200,
            "animationDuration": 75,
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
            "id": "USNR_ID",
            "ocrPlugin": {
              "ocrConfig": {}
            },
            "delayStartScanTime": 1000
          },
          "cutoutConfig": {
            "style": "rect",
            "width": 720,
            "alignment": "center",
            "maxWidthPercent": "80%",
            "ratioFromSize": {
              "width": 720,
              "height": 144
            },
            "strokeWidth": 2,
            "strokeColor": "FFFFFF",
            "cornerRadius": 4,
            "outerColor": "000000",
            "outerAlpha": 0.5,
            "feedbackStrokeColor": "0099FF",
            "offset": {
              "x": 0,
              "y": 0
            }
          },
          "scanFeedback": {
            "style": "CONTOUR_RECT",
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
