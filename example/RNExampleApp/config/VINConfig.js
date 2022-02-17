export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6ICIzLjAiLAogICJkZWJ1Z1JlcG9ydGluZyI6ICJwaW5nIiwKICAibWFqb3JWZXJzaW9uIjogIjM3IiwKICAic2NvcGUiOiBbCiAgICAiQUxMIgogIF0sCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwbGF0Zm9ybSI6IFsKICAgICJpT1MiLAogICAgIkFuZHJvaWQiCiAgXSwKICAic2hvd1dhdGVybWFyayI6IHRydWUsCiAgInRvbGVyYW5jZURheXMiOiAzMCwKICAidmFsaWQiOiAiMjAyMi0xMi0zMSIsCiAgImlvc0lkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIsCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZS5iZXRhIgogIF0sCiAgImFuZHJvaWRJZGVudGlmaWVyIjogWwogICAgImNvbS5hbnlsaW5lLmV4YW1wbGUucmVhY3RuYXRpdmUiCiAgXQp9CklibmlieWFiVTRmWFNwRDZiYU1CUlRiUUQvQUxHTzI0cWdWUHM4Q3FWdThET0dQQnBlRGs4UjhYNTF6WWMvOW95TWZjbWFtakpKSktvMmM2ZVpJWGticzkzNkdqM1M2STBIS2UycEVPd1FNdGZQYVBWY3hKOWJHT25venF6UFk1bWUwNGtJYk9TYVhka3A0SUcwOGM0ZWpqTitsS0N6Qnd6ekhVSkUyNDJ1dnFvKy9tZmFWS2E3T0trOUdWaWYvQzBzamFPNHhhRTFlcHRQT2lKYkJlSCtpK1RCWnFJZDQxamZIdTl1NHEwOHozM0ZuaG5yU0hpMFQwL3VCakFLYStsRGpzbXJPbFBiaG5tU0V6K3RBUVE5NEhPcHA2OTd6b2hCak85WENDZE81aWJwR3pMekhoYWZ3T3VVVy9OQ1NDWFNsNjAzVDE0QitOVjUydWZ4eFlxQT09',
  options: {
    "camera": {
      "captureResolution": "720"
    },
    "flash": {
      "mode": "manual",
      "alignment": "bottom_left",
    },
    "viewPlugin": {
      "plugin": {
        "id": "VIN_ID",
        "ocrPlugin": {
          "vinConfig":{
          }
        }
      },
      "cutoutConfig": {
        "style": "rect",
        "width": 720,
        "alignment": "top_half",
        "maxWidthPercent": "70%",
        "ratioFromSize": {
          "width": 62,
          "height": 9
        },
        "strokeWidth": 1,
        "strokeColor": "FFFFFF",
        "cornerRadius": 2,
        "outerColor": "000000",
        "outerAlpha": 0.3,
        "feedbackStrokeColor": "0099FF"
      },
      "scanFeedback": {
        "animation": "traverse_multi",
        "animationDuration": 250,
        "style": "contour_rect",
        "strokeWidth": 2,
        "strokeColor": "0099FF",
        "beepOnResult": false,
        "vibrateOnResult": true,
        "blinkAnimationOnResult": true,
        "cancelOnResult": true
      },
      "cancelOnResult": true,
      "reportingEnabled": true
    }
  }
}
