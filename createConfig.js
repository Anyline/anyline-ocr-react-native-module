export default ({ license, strokeColor, fillColor }) => ({
  license,
  options: {
    captureResolution: '720p',
    cutout: {
      style: 'rect',
      alignment: 'top',
      offset: {
        'x': 0,
        'y': 120,
      },
      strokeWidth: 2,
      cornerRadius: 4,
      strokeColor: strokeColor.substring(1),
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
      style: 'rect',
      strokeColor: strokeColor.substring(1),
      fillColor: fillColor.substring(1),
      cornerRadius: 2,
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
        y: 400
      }
    }
  }
});
