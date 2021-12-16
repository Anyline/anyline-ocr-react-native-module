export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6IDIsCiAgImRlYnVnUmVwb3J0aW5nIjogIm9uIiwKICAiaW1hZ2VSZXBvcnRDYWNoaW5nIjogZmFsc2UsCiAgIm1ham9yVmVyc2lvbiI6ICIyNSIsCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwaW5nUmVwb3J0aW5nIjogdHJ1ZSwKICAicGxhdGZvcm0iOiBbCiAgICAiaU9TIiwKICAgICJBbmRyb2lkIgogIF0sCiAgInNjb3BlIjogWwogICAgIkFMTCIKICBdLAogICJzaG93UG9wVXBBZnRlckV4cGlyeSI6IGZhbHNlLAogICJzaG93V2F0ZXJtYXJrIjogdHJ1ZSwKICAidG9sZXJhbmNlRGF5cyI6IDkwLAogICJ2YWxpZCI6ICIyMDIyLTEyLTMxIiwKICAiaW9zSWRlbnRpZmllciI6IFsKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlIiwKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlLmJldGEiCiAgXSwKICAiYW5kcm9pZElkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIKICBdCn0KS2RiZmVncWJweG13R2tOVnl1aXNFSUh0L2pGS0NrT2ZjeXlmYjIrbWtURVpwdGMyVWtUbkduZlgvTWJpWmRPdy9pVjFOMVJNMzFjdmp1dEMvbkxZRmxheWUyYTdHTnRpTjhnNmRTZCt6eXZOcktUb29rZFkwRFVWaGFxUko4WHcxeVIzbTd1OXoyb2NwTHl6WmVpa0J2cDJGWjRoWjZScDQveUgrbTFxT01lRmhaaHo3Um5pQnNSa1RjcUNhVW9LRDZJSUY2djc3SGxYdUUvV0VacWFEdFNkaXpmOFRUM2ljTjhkcEdmTzZEZmtJVkx0TWhjK3lTMEdJWHVXbFU1aTlESTVtMGM3SFRnQVMwOWg4dGFsbjl5R2xKQUFtY1VoL2NpdUtCZmlhd2pycFRLSm9FOTBUZjFoSGZIQUxpSzlNcnYwckdJZUNwOHg1STlzOHBtU3d3PT0=',
    options: {
      "camera": {
        "captureResolution": "1080p"
      },
      "flash": {
        "mode": "auto",
        "alignment": "bottom_right"
      },
      "viewPlugin": {
        "plugin": {
          "id": "Barcode_ID",
          "barcodePlugin": {
            "barcodeFormatOptions": ["PDF_417"],
            "enablePDF417Parsing": true
          }
        },
        "cutoutConfig": {
          "style": "rect",
          "maxWidthPercent": "80%",
          "maxHeightPercent": "80%",
          "alignment": "center",
          "ratioFromSize": {
            "width": 100,
            "height": 80
          },
          "strokeWidth": 1,
          "cornerRadius": 3,
          "strokeColor": "FFFFFF",
          "outerColor": "000000",
          "outerAlpha": 0.3,
          "feedbackStrokeColor": "0099FF"
        },
        "scanFeedback": {
          "style": "rect",
          "strokeColor": "0099FF",
          "fillColor": "220099FF",
          "animationDuration": 150,
          "blinkOnResult": true,
          "beepOnResult": true,
          "vibrateOnResult": true
        },
        "cancelOnResult": true
      },
      "doneButton": { // iOS only. Android uses hardware back button.
        "title": "OK",
        "type": "rect", // fullwidth, rect
        "cornerRadius": 0,
        //"backgroundColor":"#EEEEEE", // default clearcolor
        "textColor": "FFFFFF",
        "textColorHighlighted": "CCCCCC",
        "fontSize": 33,
        "fontName": "HelveticaNeue",
        "positionXAlignment": "center", // left,right,center - no affect on fullwidth
        "positionYAlignment": "bottom", // top, center, bottom
        "offset": {
          "x": 0, // postive -> right
          "y": -88, // postive -> down
        }
      }
    }
  }
