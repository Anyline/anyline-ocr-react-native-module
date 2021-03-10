export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6IDIsCiAgImRlYnVnUmVwb3J0aW5nIjogIm9uIiwKICAiaW1hZ2VSZXBvcnRDYWNoaW5nIjogZmFsc2UsCiAgIm1ham9yVmVyc2lvbiI6ICIyNSIsCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwaW5nUmVwb3J0aW5nIjogdHJ1ZSwKICAicGxhdGZvcm0iOiBbCiAgICAiaU9TIiwKICAgICJBbmRyb2lkIgogIF0sCiAgInNjb3BlIjogWwogICAgIkFMTCIKICBdLAogICJzaG93UG9wVXBBZnRlckV4cGlyeSI6IGZhbHNlLAogICJzaG93V2F0ZXJtYXJrIjogdHJ1ZSwKICAidG9sZXJhbmNlRGF5cyI6IDkwLAogICJ2YWxpZCI6ICIyMDIxLTA2LTMwIiwKICAiaW9zSWRlbnRpZmllciI6IFsKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlIiwKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlLmJldGEiCiAgXSwKICAiYW5kcm9pZElkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIKICBdCn0KWFdnaUNoTmZxL3hEOWtqSmVqQW14dFNSS2x6T2I2a3A2SEFxcGNvS2pjQ0pUSE1sNFVpRUJCdzFyckJyZHdTU2lycmovaWROUTZEMnFwUWZNcFZ6OU4reFlqSVJ3bmRzdWxtNVhEMFhzZ2srTVI3a3BiSXhmOVhPRHpHNzVmWkZjdGhkNUh3eGtxWnJEVy9aZW1OOHlsdGtaRkpSNzhOYzV3REw3TFZmZCtzUi9XNDM3b05EVkVjaS9MRVBXVEhJd0p0VG80ZmJnSHhoMGV6QzFTVzVPVFZnL3FheUlDeVVnNVNIVEtXR0ZzcmJsR3ZBNjc1OHc2YnBmM0xzeFVmTitXYWZIY1dmNmtORHdpTDVXZ2U2QWN0Q3k2RW9KeTFuRFZEUVVBMFhQV2NYMzZHakVHeFJxZGN5YW1QcUpWNDNDWjN2QUtHUFZxSnhrUHFKNTFId2JBPT0=',
  options: {
    "camera": {
      "captureResolution": "1080"
    },
    "flash": {
      "mode": "manual",
      "alignment": "bottom_right"
    },
    "viewPlugin": {
      "plugin": {
        "id": "OCR_VC",
        "ocrPlugin": {
	  "ocrConfig": {
            "scanMode": "AUTO",
            "charWhitelist": "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            "validationRegex": "[A-Z0-9]{8}$",
            "minConfidence": 75
	  }
        }
      },
      "cutoutConfig": {
        "style": "rect",
        "maxWidthPercent": "80%",
        "maxHeightPercent": "80%",
        "alignment": "center",
        "width": 540,
        "ratioFromSize": {
          "width": 5,
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
        "style": "contour_point",
        "strokeWidth": 3,
        "strokeColor": "0099FF",
        "fillColor": "220099FF",
        "beepOnResult": true,
        "vibrateOnResult": true,
        "blinkAnimationOnResult": true
      },
      "cancelOnResult": true
    }
  }
}
