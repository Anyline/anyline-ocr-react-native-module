export default {
  license: 'eyAiYW5kcm9pZElkZW50aWZpZXIiOiBbICJjb20uYW55bGluZSIgXSwgImRlYnVn\nUmVwb3J0aW5nIjogIm9uIiwgImlvc0lkZW50aWZpZXIiOiBbICJjb20uYW55bGlu\nZSIgXSwgImxpY2Vuc2VLZXlWZXJzaW9uIjogMiwgIm1ham9yVmVyc2lvbiI6ICIz\nIiwgInBpbmdSZXBvcnRpbmciOiB0cnVlLCAicGxhdGZvcm0iOiBbICJBbmRyb2lk\nIiwgImlPUyIgXSwgInNjb3BlIjogWyAiQUxMIiBdLCAic2hvd1dhdGVybWFyayI6\nIHRydWUsICJ0b2xlcmFuY2VEYXlzIjogMywgInZhbGlkIjogIjIwMTctMTItMzEi\nIH0KcGNRSXBOU0MzdGZ5QVV1RkRtSEMyMGo0TElXSGVTMnNxRmJybllqOWZDOWZm\nS1ZpaWVGSitLUGZGY2tTWm9YUgpMVmZvWGx2QmZDOVVaaUErZzZtTGNTV3owUVVl\nSkVuRHBGcWJVU0cxVGVBN1NJenR2aU9BOGg2bFlnNXFSZmw0CjQ5d0IvNXVtL2Ir\nUDhHaXRLUzMzaFNacVhTbEdjbnkxYUVRaWxCRjFHL2NCeitIcUFtUEFMaVpBVzFQ\nZDkxdDYKZXZTcU1XdkNtMk01blZUaVNDd2dDZnR6Zkg3WENnQlVCU2hOb2ZoWlFJ\nVCtiUE5ycTE3SGg1YkVWa2ZoUlZBSQpSc0d1YlM4SEpvVlAvaEs5a2FMdzliRWYx\nZXpYZVpVOXFUbCswSXZKUy9lSlBrazJmV0IxcS9CUzM4ZFBVOTZHClpqVXIyRmlQ\nRjNSc1FxRC9UU244Q0E9PQo=',
  options: {
    captureResolution: '1080',
    cutout: {
      style: 'rect',
      alignment: 'top',
      offset: {
        'x': 0,
        'y': 120,
      },
      strokeWidth: 2,
      cornerRadius: 4,
      strokeColor: 'F21C0A',
      outerColor: '000000',
      outerAlpha: 0.3,
    },
    flash: {
      mode: 'manual',
      alignment: 'bottom_right',
    },
    beepOnResult: true,
    vibrateOnResult: true,
    blinkAnimationOnResult: true,
    cancelOnResult: true,
    reportingEnabled: true,
    visualFeedback: {
      style: "contour_rect"
    },
    segment: {
      titles: [
        'Analog',
        'Digital'
      ],
      modes: [
        'ANALOG_METER',
        'DIGITAL_METER'
      ],
      tintColor: 'F21C0A',
      offset: {
        x: 0,
        y: 600
      }
    }
  },
  nativeBarcodeEnabled: true
}
