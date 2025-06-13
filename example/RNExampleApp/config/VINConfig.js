export default {
  "options": {
    "doneButtonConfig": {
      "offset.y": -88
    }
  },
  "cameraConfig": {
    "captureResolution": "1080p",
    "zoomGesture": true
  },
  "flashConfig": {
    "mode": "manual",
    "alignment": "top_left"
  },
  "viewPluginConfig": {
    "pluginConfig": {
      "id": "vin",
      "cancelOnResult": true,
      "vinConfig": {
        "validateCheckDigit": true
      }
    },
    "cutoutConfig": {
      "maxWidthPercent": "70%",
      "maxHeightPercent": "70%",
      "alignment": "top_half",
      "ratioFromSize": {
        "width": 69,
        "height": 10
      },
      "outerColor": "000000",
      "outerAlpha": 0.3,
      "strokeWidth": 2,
      "strokeColor": "0099FF",
      "cornerRadius": 4,
      "feedbackStrokeColor": "0099FF"
    },
    "scanFeedbackConfig": {
      "animation": "traverse_multi",
      "animationDuration": 250,
      "style": "contour_rect",
      "strokeWidth": 2,
      "strokeColor": "0099FF",
      "fillColor": "220099FF",
      "beepOnResult": true,
      "vibrateOnResult": true,
      "blinkAnimationOnResult": true
    },
    "uiFeedbackConfig": {
      "presets": [
        {
          "presetName": "vin_with_instruction_image_text_sound_feedback",
          "presetAttributes": [
            {
              "attributeName": "instruction_text",
              "attributeValue": "Please make sure the entire VIN number is inside the cutout."
            },
            {
              "attributeName": "lighting_toodark_image",
              "attributeValue": "uifeedback_default_toodark"
            },
            {
              "attributeName": "lighting_toobright_image",
              "attributeValue": "uifeedback_default_toobright"
            },
            {
              "attributeName": "distance_moveback_image",
              "attributeValue": "uifeedback_default_moveback"
            },
            {
              "attributeName": "distance_movecloser_image",
              "attributeValue": "uifeedback_default_movecloser"
            },
            {
              "attributeName": "format_invalid_image",
              "attributeValue": "uifeedback_vin_invalid"
            },
            {
              "attributeName": "lighting_toodark_text",
              "attributeValue": ""
            },
            {
              "attributeName": "lighting_toobright_text",
              "attributeValue": ""
            },
            {
              "attributeName": "distance_moveback_text",
              "attributeValue": ""
            },
            {
              "attributeName": "distance_movecloser_text",
              "attributeValue": ""
            },
            {
              "attributeName": "format_invalid_text",
              "attributeValue": ""
            },
            {
              "attributeName": "lighting_toodark_sound",
              "attributeValue": "info_sound_default.wav"
            },
            {
              "attributeName": "lighting_toobright_sound",
              "attributeValue": "info_sound_default.wav"
            },
            {
              "attributeName": "distance_moveback_sound",
              "attributeValue": "info_sound_default.wav"
            },
            {
              "attributeName": "distance_movecloser_sound",
              "attributeValue": "info_sound_default.wav"
            },
            {
              "attributeName": "format_invalid_sound",
              "attributeValue": "info_sound_default.wav"
            }
          ]
        }
      ]
    }
  }
}
