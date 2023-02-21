export default {
  license: 'ew0KICAibGljZW5zZUtleVZlcnNpb24iOiAiMy4wIiwNCiAgImRlYnVnUmVwb3J0aW5nIjogInBpbmciLA0KICAibWFqb3JWZXJzaW9uIjogIjM3IiwNCiAgInNjb3BlIjogWw0KICAgICJBTEwiLA0KICAgICJORkMiDQogIF0sDQogICJtYXhEYXlzTm90UmVwb3J0ZWQiOiA1LA0KICAiYWR2YW5jZWRCYXJjb2RlIjogdHJ1ZSwNCiAgIm11bHRpQmFyY29kZSI6IHRydWUsDQogICJzdXBwb3J0ZWRCYXJjb2RlRm9ybWF0cyI6IFsNCiAgICAiQUxMIg0KICBdLA0KICAicGxhdGZvcm0iOiBbDQogICAgImlPUyIsDQogICAgIkFuZHJvaWQiDQogIF0sDQogICJzaG93V2F0ZXJtYXJrIjogdHJ1ZSwNCiAgInRvbGVyYW5jZURheXMiOiAzMCwNCiAgInZhbGlkIjogIjIwMjMtMTItMzEiLA0KICAiaW9zSWRlbnRpZmllciI6IFsNCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZXMucmVhY3RuYXRpdmUiDQogIF0sDQogICJhbmRyb2lkSWRlbnRpZmllciI6IFsNCiAgICAiY29tLmFueWxpbmUuZXhhbXBsZXMucmVhY3RuYXRpdmUiDQogIF0NCn0KSlhUTzVRSmZKa2FtUnR2VDc4QTFadGVhTXVzbmJlTW5HSHl0alZmczlxbUtIeDhCT3ltSGVXc2M2aXpjRExIenhtbklnU0JzS1RRNEdhSENsWCtvMEo2R3VtaFNUWHQrNVVuc1hVQVJ6aGhUdEhTa0l1ZVlRQ0p3dTI3bE9kWlBhNVoxSFNxN24weE9tek1jTjM3R1dsajVzVm9SY2pqaUswYVVnY0M5cDFRT0svK29ZejAvWlR2dXFGVjZUeHdiUHkyc3RqaDhLdS9NaXhtcFZFVmh0eWVzMEU2ZzhNVkdBNmNPU1h4NDVXVzgvR0NUWEpqdFJ6NnM2UFBDYzdYSXhQalFjOVAxdzBtblpFYTdjUHpMS3M0Y3hoYjQwSmluSU5qZXp6MDl1em9kbnZUR3VlSEIwcXIzUWNlVmdkS1JVQzhDc24zNmJLM2NLVmVpOVdTUlVRPT0=',
  "options": {
  },
  "cameraConfig": {
    "captureResolution": "1080p"
  },
  "flashConfig": {
    "mode": "manual",
    "alignment": "bottom_left",
    "offset": {
      "x": 0,
      "y": -40
    }
  },
  "viewPluginConfig": {
    "pluginConfig": {
      "id": "com.anyline.configs.plugin.id_mrz_dl_arabic",
      "universalIdConfig": {
        "allowedLayouts": {
          "mrz": [],
          "drivingLicense": [],
          "idFront": []
        },
        "alphabet": "arabic",
        "drivingLicense": {
          "surname": {
            "scanOption": 0,
            "minConfidence": 40
          },
          "givenNames": {
            "scanOption": 0,
            "minConfidence": 40
          },
          "dateOfBirth": {
            "scanOption": 0,
            "minConfidence": 50
          },
          "placeOfBirth": {
            "scanOption": 1,
            "minConfidence": 50
          },
          "dateOfIssue": {
            "scanOption": 0,
            "minConfidence": 50
          },
          "dateOfExpiry": {
            "scanOption": 1,
            "minConfidence": 50
          },
          "authority": {
            "scanOption": 1,
            "minConfidence": 30
          },
          "documentNumber": {
            "scanOption": 0,
            "minConfidence": 40
          },
          "categories": {
            "scanOption": 1,
            "minConfidence": 30
          },
          "address": {
            "scanOption": 1
          }
        },
        "idFront": {
          "surname": {
            "scanOption": 0,
            "minConfidence": 60
          },
          "givenNames": {
            "scanOption": 0,
            "minConfidence": 60
          },
          "dateOfBirth": {
            "scanOption": 0,
            "minConfidence": 60
          },
          "placeOfBirth": {
            "scanOption": 1,
            "minConfidence": 60
          },
          "dateOfExpiry": {
            "scanOption": 1,
            "minConfidence": 60
          },
          "cardAccessNumber": {
            "scanOption": 1,
            "minConfidence": 60
          },
          "documentNumber": {
            "scanOption": 0,
            "minConfidence": 60
          },
          "nationality": {
            "scanOption": 1,
            "minConfidence": 60
          }
        }
      },
      "cancelOnResult": true
    },
    "cutoutConfig": {
      "animation": "fade",
      "maxWidthPercent": "90%",
      "maxHeightPercent": "90%",
      "width": 0,
      "alignment": "top_half",
      "ratioFromSize": {
        "width": 86,
        "height": 54
      },
      "offset": {
        "x": 0,
        "y": 60
      },
      "cropOffset": {
        "x": 0,
        "y": 0
      },
      "cropPadding": {
        "x": 0,
        "y": 0
      },
      "cornerRadius": 4,
      "strokeColor": "0099ff",
      "strokeWidth": 2,
      "outerColor": "000000",
      "feedbackStrokeColor": "0099FF",
      "outerAlpha": 0.3
    },
    "scanFeedbackConfig": {
      "style": "animated_rect",
      "strokeWidth": 2,
      "strokeColor": "50fa7b",
      "fillColor": "4050fa7b",
      "cornerRadius": 2,
      "beepOnResult": true,
      "vibrateOnResult": true,
      "blinkAnimationOnResult": true
    }
  }
}
