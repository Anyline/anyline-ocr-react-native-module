export default {
    license: 'ewogICJsaWNlbnNlS2V5VmVyc2lvbiI6ICIzLjAiLAogICJkZWJ1Z1JlcG9ydGluZyI6ICJvbiIsCiAgIm1ham9yVmVyc2lvbiI6ICIzNyIsCiAgInNjb3BlIjogWwogICAgIkFMTCIKICBdLAogICJtYXhEYXlzTm90UmVwb3J0ZWQiOiA1LAogICJhZHZhbmNlZEJhcmNvZGUiOiB0cnVlLAogICJtdWx0aUJhcmNvZGUiOiB0cnVlLAogICJzdXBwb3J0ZWRCYXJjb2RlRm9ybWF0cyI6IFsKICAgICJBTEwiCiAgXSwKICAicGxhdGZvcm0iOiBbCiAgICAiaU9TIiwKICAgICJBbmRyb2lkIgogIF0sCiAgInNob3dXYXRlcm1hcmsiOiB0cnVlLAogICJ0b2xlcmFuY2VEYXlzIjogMzAsCiAgInZhbGlkIjogIjIwMjItMTItMzEiLAogICJpb3NJZGVudGlmaWVyIjogWwogICAgImNvbS5hbnlsaW5lLmV4YW1wbGUucmVhY3RuYXRpdmUiLAogICAgImNvbS5hbnlsaW5lLmV4YW1wbGUucmVhY3RuYXRpdmUuYmV0YSIKICBdLAogICJhbmRyb2lkSWRlbnRpZmllciI6IFsKICAgICJjb20uYW55bGluZS5leGFtcGxlLnJlYWN0bmF0aXZlIgogIF0KfQpnMEhQMTdLZk1Tc0cvUFJVdzA5T1VSNUdCVGc1SmFablN4ZDBNeXBkSXlVRHRoSHpwMzhNUVg0YnZsd0JtODIxOExqelYyRFVOZzVPZTNuUE1YZHJDaEV5L0F1N0lLcHBhN1F0UUJON3FzMjlLN0crQ1JMQTcrL21kK0p3MzN1NWhick5YYVlXb0QrSmtJT1BJYnE1M3B0ZC9Qc1Avb2JVZTNhSFk1R29aSzFreFFaajA1ZUZZcGhCUTZPSXdMRmR3RVJnRmtwWEplaUNycGtLMFFFTzl5R1FkRVZjSWs1UWRwM1kwOTVkWWtOd2FVcytVeG1POG9BM2tLZkxFdlRLZHoya0VZRkpTaEZoQXZoVC8yWVJkYllUblZTQmVyaFVGQmZEQlNFeW5lMlpXbXJ3UE5lZTQwU2cvUDBIWTQxMHNHOUpuNnM0Tm1CT09hRC9Vd1c5OGc9PQ==',
  options: {
      "camera": {
          "captureResolution": "720p"
      },
      "flash": {
          "mode": "manual",
          "alignment": "bottom_right"
      },
      "viewPlugin" : {
          "plugin": {
            "id": "TIRE_SIZE",
            "tirePlugin": {
              "tireSizeConfig":{
              }
            }
          },
          "cutoutConfig" : {
              "style": "rect",
              "width": 720,
              "alignment": "center",
              "maxWidthPercent": "80%",
              "ratioFromSize": {
                  "width": 720,
                  "height": 144
              },
              "outerColor": "000000",
              "outerAlpha": 0.3,
              "strokeWidth": 2,
              "strokeColor": "FFFFFF",
              "cornerRadius": 2,
              "feedbackStrokeColor": "0099FF"
          },
          "scanFeedback" : {
              "animation": "traverse_multi",
              "animationDuration" : 250,
              "style": "contour_rect",
              "strokeWidth": 2,
              "strokeColor": "0099FF",
              "beepOnResult": true,
              "vibrateOnResult": true,
              "blinkAnimationOnResult": true
          },
          "cancelOnResult" : true
      }
  }
}
