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
          "scanMode": "AUTO",
          "languages": ["vin.any"],
          "customCmdFile": "vin.ale"
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