export default {
  license: 'ew0KICAibGljZW5zZUtleVZlcnNpb24iOiAiMy4wIiwNCiAgImRlYnVnUmVwb3J0aW5nIjogInBpbmciLA0KICAibWFqb3JWZXJzaW9uIjogIjM3IiwNCiAgInNjb3BlIjogWw0KICAgICJBTEwiLA0KICAgICJORkMiDQogIF0sDQogICJtYXhEYXlzTm90UmVwb3J0ZWQiOiA1LA0KICAiYWR2YW5jZWRCYXJjb2RlIjogdHJ1ZSwNCiAgIm11bHRpQmFyY29kZSI6IHRydWUsDQogICJzdXBwb3J0ZWRCYXJjb2RlRm9ybWF0cyI6IFsNCiAgICAiQUxMIg0KICBdLA0KICAicGxhdGZvcm0iOiBbDQogICAgImlPUyIsDQogICAgIkFuZHJvaWQiDQogIF0sDQogICJzaG93V2F0ZXJtYXJrIjogdHJ1ZSwNCiAgInRvbGVyYW5jZURheXMiOiAzMCwNCiAgInZhbGlkIjogIjIwMjMtMTItMzEiLA0KICAiaW9zSWRlbnRpZmllciI6IFsNCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZXMucmVhY3RuYXRpdmUiDQogIF0sDQogICJhbmRyb2lkSWRlbnRpZmllciI6IFsNCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZXMucmVhY3RuYXRpdmUiDQogIF0NCn0KSlhUTzVRSmZKa2FtUnR2VDc4QTFadGVhTXVzbmJlTW5HSHl0alZmczlxbUtIeDhCT3ltSGVXc2M2aXpjRExIenhtbklnU0JzS1RRNEdhSENsWCtvMEo2R3VtaFNUWHQrNVVuc1hVQVJ6aGhUdEhTa0l1ZVlRQ0p3dTI3bE9kWlBhNVoxSFNxN24weE9tek1jTjM3R1dsajVzVm9SY2pqaUswYVVnY0M5cDFRT0svK29ZejAvWlR2dXFGVjZUeHdiUHkyc3RqaDhLdS9NaXhtcFZFVmh0eWVzMEU2ZzhNVkdBNmNPU1h4NDVXVzgvR0NUWEpqdFJ6NnM2UFBDYzdYSXhQalFjOVAxdzBtblpFYTdjUHpMS3M0Y3hoYjQwSmluSU5qZXp6MDl1em9kbnZUR3VlSEIwcXIzUWNlVmdkS1JVQzhDc24zNmJLM2NLVmVpOVdTUlVRPT0=',
  "options": {
    "doneButtonConfig": {
      "offset.y": -88
    }
  },
  "cameraConfig": {
    "captureResolution": "1080p"
  },
  "flashConfig": {
    "mode": "manual",
    "alignment": "top_left"
  },
  "viewPluginCompositeConfig": {
    "id": "serial-lpt-dl-vin",
    "processingMode": "sequential",
    "viewPlugins": [
      {
        "viewPluginConfig": {
          "pluginConfig": {
            "id": "license-plate-eu",
            "licensePlateConfig": {
              "scanMode": "auto"
            },
            "cancelOnResult": true
          },
          "cutoutConfig": {
            "animation": "none",
            "maxWidthPercent": "80%",
            "maxHeightPercent": "80%",
            "alignment": "top_half",
            "ratioFromSize": {
              "width": 4,
              "height": 1
            },
            "offset": {
              "x": 0,
              "y": 40
            },
            "cropPadding": {
              "x": 0,
              "y": 0
            },
            "cropOffset": {
              "x": 0,
              "y": 0
            },
            "cornerRadius": 4,
            "strokeColor": "0099ff",
            "strokeWidth": 2,
            "feedbackStrokeColor": "0099ff",
            "outerColor": "000000",
            "outerAlpha": 0.3
          },
          "scanFeedbackConfig": {
            "style": "rect",
            "strokeWidth": 2,
            "animationDuration": 0,
            "strokeColor": "0099ff",
            "cornerRadius": 0,
            "fillColor": "330099ff",
            "beepOnResult": true,
            "vibrateOnResult": true
          }
        }
      },
      {
        "viewPluginConfig": {
          "pluginConfig": {
            "id": "driver-license-eu",
            "universalIdConfig": {
              "allowedLayouts": {
                "drivingLicense": []
              },
              "alphabet": "latin"
            },
            "cancelOnResult": true
          },
          "cutoutConfig": {
            "style": "animated_rect",
            "maxWidthPercent": "90%",
            "maxHeightPercent": "90%",
            "alignment": "center",
            "strokeWidth": 2,
            "cornerRadius": 4,
            "strokeColor": "0099FF",
            "outerColor": "000000",
            "outerAlpha": 0.3,
            "ratioFromSize": {
              "width": 50,
              "height": 31
            },
            "cropPadding": {
              "x": 25,
              "y": 25
            },
            "cropOffset": {
              "x": 0,
              "y": 0
            },
            "feedbackStrokeColor": "0099FF"
          },
          "scanFeedbackConfig": {
            "style": "CONTOUR_RECT",
            "visualFeedbackRedrawTimeout": 100,
            "strokeColor": "0099FF",
            "fillColor": "220099FF",
            "beepOnResult": true,
            "vibrateOnResult": true,
            "strokeWidth": 2
          }
        }
      },
      {
        "viewPluginConfig": {
          "pluginConfig": {
            "id": "vin",
            "vinConfig": {},
            "cancelOnResult": true
          },
          "cutoutConfig": {
            "animation": "none",
            "maxWidthPercent": "90%",
            "maxHeightPercent": "100%",
            "width": 0,
            "alignment": "top_half",
            "ratioFromSize": {
              "width": 11,
              "height": 2
            },
            "offset": { "x": 0, "y": 0 },
            "cropOffset": { "x": 0, "y": 0 },
            "cropPadding": { "x": 0, "y": 0 },
            "cornerRadius": 2,
            "strokeColor": "0099ff",
            "strokeWidth": 2,
            "outerColor": "000000",
            "feedbackStrokeColor": "0099FF",
            "outerAlpha": 0.3
          },
          "scanFeedbackConfig": {
            "style": "contour_rect",
            "strokeWidth": 2,
            "cornerRadius": 2,
            "strokeColor": "0099FF",
            "fillColor": "330099FF",
            "beepOnResult": true,
            "vibrateOnResult": true
          }
        }
      }
    ]
  }
}
