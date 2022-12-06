export default {
  license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6ICIzLjAiLAogICJkZWJ1Z1JlcG9ydGluZyI6ICJwaW5nIiwKICAibWFqb3JWZXJzaW9uIjogIjM3IiwKICAic2NvcGUiOiBbCiAgICAiQUxMIgogIF0sCiAgIm1heERheXNOb3RSZXBvcnRlZCI6IDUsCiAgImFkdmFuY2VkQmFyY29kZSI6IHRydWUsCiAgIm11bHRpQmFyY29kZSI6IHRydWUsCiAgInN1cHBvcnRlZEJhcmNvZGVGb3JtYXRzIjogWwogICAgIkFMTCIKICBdLAogICJwbGF0Zm9ybSI6IFsKICAgICJpT1MiLAogICAgIkFuZHJvaWQiCiAgXSwKICAic2hvd1dhdGVybWFyayI6IHRydWUsCiAgInRvbGVyYW5jZURheXMiOiAzMCwKICAidmFsaWQiOiAiMjAyMy0xMi0zMSIsCiAgImlvc0lkZW50aWZpZXIiOiBbCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZS5yZWFjdG5hdGl2ZSIKICBdLAogICJhbmRyb2lkSWRlbnRpZmllciI6IFsKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlIgogIF0KfQpqVkdqaUxWZ05tcFBQQWFUSGRBK21EYkNEQWhnaGx1TG92MmpuWU92NlNJMHJDVjJoTUR6TnBnVVJMRE52Rlp0bUN4alZxcmlpb1BJbExySlFEY0pQdjZHdmY5YWtpVXZXVEdaQ29ra01pd3lUcUc2dkE4QXBDRTBxOENtVUJ1VzZNKzNWVERVdXJFanF6OE5LT1hHMFRUZzA2c281Tk1hRzhrS0Nzd0lzWVBZS1lBYnoxMXdmc09lMkVxV0ZNMGtIdTM0bWVueDU5Ykd4QkVjdHdZZCs5SW5vOTNGZUtHeDJibjJqVURvRENRTGFzdHNQQlMyUXU1WFV0dFNjTjJWZWMwUDkrYTdjaCswUHJLaE5jb0hLcmtwSlczV1lkaEoxMTRiMUhpWjJIL2ljMXdJSnA5ZmszL1lPVHlFYVZFSitYWm1KVG1HYkk2ZU5PcjBhMGE3QWc9PQ==',
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
          "barcodeFormatOptions": ["UPC_E", "EAN_13", "UPC_A", "EAN_8", "AZTEC", "CODABAR", "CODE_11", "CODE_32", "CODE_39", "CODE_93", "CODE_128", "DATABAR", "DATA_MATRIX", "GS1_QR_CODE", "GS1_128", "ITF", "ISBT_128", "MSI", "MICRO_QR", "MICRO_PDF", "PDF_417", "POST_UK",
          "QR_CODE", "RSS_14", "RSS_EXPANDED", "TRIOPTIC", "USPS_4CB", "US_PLANET", "US_POSTNET"],
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
