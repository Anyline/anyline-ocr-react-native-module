export default {
  license: 'eyAiYW5kcm9pZElkZW50aWZpZXIiOiBbICJjb20uYW55bGluZS5leGFtcGxlLnJl\n' +
    'YWN0bmF0aXZlIiBdLCAiZGVidWdSZXBvcnRpbmciOiAib24iLCAiaW9zSWRlbnRp\n' +
    'ZmllciI6IFsgImNvbS5hbnlsaW5lLmV4YW1wbGUucmVhY3RuYXRpdmUiIF0sICJs\n' +
    'aWNlbnNlS2V5VmVyc2lvbiI6IDIsICJtYWpvclZlcnNpb24iOiAiMyIsICJwaW5n\n' +
    'UmVwb3J0aW5nIjogdHJ1ZSwgInBsYXRmb3JtIjogWyAiaU9TIiwgIkFuZHJvaWQi\n' +
    'IF0sICJzY29wZSI6IFsgIkFMTCIgXSwgInNob3dQb3BVcEFmdGVyRXhwaXJ5Ijog\n' +
    'ZmFsc2UsICJzaG93V2F0ZXJtYXJrIjogdHJ1ZSwgInRvbGVyYW5jZURheXMiOiA5\n' +
    'MCwgInZhbGlkIjogIjIwMjAtMTItMzEiIH0KUlliRzFBbFgwempXZTVLYkdtK000\n' +
    'SXFXME5jWUdTZWNBU0t6M3k0QnQ3VGFjMWgrVEpveHlIVXFTb1JxWFZKNgpXRlhH\n' +
    'N2kvVjFqNjVTTEgyS0V4NUpoRlZKT0Y1UDhJR1VLak9CY1ozR2o5WHRTLzdub3Ni\n' +
    'ZHoxTTlqZWlJRWJYCjZ1ZXFyVmtyNGRpRVJsOWNDQ01kOWRvTG80dnJiMGpIbzZ0\n' +
    'bk12d2VrWFdUaUFnSlNjNXB5MGlOc2F6MjRKZFYKa3dEWnY2dG9Oa1NIdjhRWTVj\n' +
    'U3laSWdNSHFsRTZBUkVxcG5oNlA5THh3aWF1Sm5Sd2o4OWFWVCt4ZkoyaFdLbgpU\n' +
    'NE9tUzVraWdNUVZLaW8vaWlJS2tIVEVUdUxjYWJEWWtacExZdVR2YnU1S1hIc0R6\n' +
    'b1NxUUJTL3ZFS3VYUHhhCjNnanZnS285M3lrSjJKQjVBZjZiSkE9PQo=',
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
          "scanMode": "AUTO",
          "languages": ["anyline_capitals.traineddata"],
          "charWhitelist": "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
          "validationRegex": "[A-Z0-9]{8}$",
          "minConfidence": 85

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