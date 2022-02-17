export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6ICIzLjAiLAogICJkZWJ1Z1JlcG9ydGluZyI6ICJwaW5nIiwKICAibWFqb3JWZXJzaW9uIjogIjM3IiwKICAic2NvcGUiOiBbCiAgICAiQUxMIgogIF0sCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwbGF0Zm9ybSI6IFsKICAgICJpT1MiLAogICAgIkFuZHJvaWQiCiAgXSwKICAic2hvd1dhdGVybWFyayI6IHRydWUsCiAgInRvbGVyYW5jZURheXMiOiAzMCwKICAidmFsaWQiOiAiMjAyMi0xMi0zMSIsCiAgImlvc0lkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIsCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZS5iZXRhIgogIF0sCiAgImFuZHJvaWRJZGVudGlmaWVyIjogWwogICAgImNvbS5hbnlsaW5lLmV4YW1wbGUucmVhY3RuYXRpdmUiCiAgXQp9CklibmlieWFiVTRmWFNwRDZiYU1CUlRiUUQvQUxHTzI0cWdWUHM4Q3FWdThET0dQQnBlRGs4UjhYNTF6WWMvOW95TWZjbWFtakpKSktvMmM2ZVpJWGticzkzNkdqM1M2STBIS2UycEVPd1FNdGZQYVBWY3hKOWJHT25venF6UFk1bWUwNGtJYk9TYVhka3A0SUcwOGM0ZWpqTitsS0N6Qnd6ekhVSkUyNDJ1dnFvKy9tZmFWS2E3T0trOUdWaWYvQzBzamFPNHhhRTFlcHRQT2lKYkJlSCtpK1RCWnFJZDQxamZIdTl1NHEwOHozM0ZuaG5yU0hpMFQwL3VCakFLYStsRGpzbXJPbFBiaG5tU0V6K3RBUVE5NEhPcHA2OTd6b2hCak85WENDZE81aWJwR3pMekhoYWZ3T3VVVy9OQ1NDWFNsNjAzVDE0QitOVjUydWZ4eFlxQT09',
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
        "id": "OCR_IBAN",
        "ocrPlugin": {
          "ocrConfig": {
            "scanMode": "LINE",
            "languages": ["USNr.any"],
            "charWhitelist": "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
            "minConfidence": 70,
            "validationRegex": "^[A-Z]{2}([0-9A-Z]\\s*){13,32}$"
          }
        }
      },
      "cutoutConfig": {
        "style": "rect",
        "maxWidthPercent": "80%",
        "maxHeightPercent": "80%",
        "alignment": "center",
        "width": 900,
        "ratioFromSize": {
          "width": 10,
          "height": 1
        },
        "strokeWidth": 2,
        "cornerRadius": 10,
        "strokeColor": "FFFFFF",
        "outerColor": "000000",
        "outerAlpha": 0.3,
        "feedbackStrokeColor": "0099FF"
      },
      "cancelOnResult": true,
      "scanFeedback": {
        "style": "contour_underline",
        "strokeColor": "0099FF",
        "strokeWidth": 2,
        "fillColor": "110099FF",
        "beepOnResult": true,
        "vibrateOnResult": true,
        "blinkAnimationOnResult": true
      }
    }
  },
}
