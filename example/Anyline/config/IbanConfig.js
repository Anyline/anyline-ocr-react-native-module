export default {
  license: "eyAiYW5kcm9pZElkZW50aWZpZXIiOiBbICJjb20uYW55bGluZSIgXSwgImRlYnVn\nUmVwb3J0aW5nIjogIm9uIiwgImlvc0lkZW50aWZpZXIiOiBbICJjb20uYW55bGlu\nZSIgXSwgImxpY2Vuc2VLZXlWZXJzaW9uIjogMiwgIm1ham9yVmVyc2lvbiI6ICIz\nIiwgInBpbmdSZXBvcnRpbmciOiB0cnVlLCAicGxhdGZvcm0iOiBbICJBbmRyb2lk\nIiwgImlPUyIgXSwgInNjb3BlIjogWyAiQUxMIiBdLCAic2hvd1dhdGVybWFyayI6\nIHRydWUsICJ0b2xlcmFuY2VEYXlzIjogMywgInZhbGlkIjogIjIwMTctMTItMzEi\nIH0KcGNRSXBOU0MzdGZ5QVV1RkRtSEMyMGo0TElXSGVTMnNxRmJybllqOWZDOWZm\nS1ZpaWVGSitLUGZGY2tTWm9YUgpMVmZvWGx2QmZDOVVaaUErZzZtTGNTV3owUVVl\nSkVuRHBGcWJVU0cxVGVBN1NJenR2aU9BOGg2bFlnNXFSZmw0CjQ5d0IvNXVtL2Ir\nUDhHaXRLUzMzaFNacVhTbEdjbnkxYUVRaWxCRjFHL2NCeitIcUFtUEFMaVpBVzFQ\nZDkxdDYKZXZTcU1XdkNtMk01blZUaVNDd2dDZnR6Zkg3WENnQlVCU2hOb2ZoWlFJ\nVCtiUE5ycTE3SGg1YkVWa2ZoUlZBSQpSc0d1YlM4SEpvVlAvaEs5a2FMdzliRWYx\nZXpYZVpVOXFUbCswSXZKUy9lSlBrazJmV0IxcS9CUzM4ZFBVOTZHClpqVXIyRmlQ\nRjNSc1FxRC9UU244Q0E9PQo=",
  options: {
    "captureResolution": "1080",
    "cutout": {
      "style": "rect",
      "maxWidthPercent": "80%",
      "maxHeightPercent": "80%",
      "alignment": "top_half",
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
    "flash": {
      "mode": "manual",
      "alignment": "bottom_right"
    },
    "beepOnResult": true,
    "vibrateOnResult": true,
    "blinkAnimationOnResult": true,
    "cancelOnResult": true,
    "visualFeedback": {
      "style": "contour_point",
      "strokeColor": "0099FF",
      "strokeWidth": 2,
      "fillColor": "110099FF"
    }
  },
  ocr: {
    "scanMode": "AUTO",
    "tesseractLanguages": ["eng_no_dict", "deu"],
    "traineddataFiles": ["trainedData/eng_no_dict.traineddata", "trainedData/deu.traineddata"],
    "charWhitelist": "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
    "validationRegex": "^[A-Z]{2}([0-9A-Z]\\s*){13,32}$",
    "minConfidence": 65,
    "removeSmallContours": true,
    "removeWhitespaces": true

  }
}