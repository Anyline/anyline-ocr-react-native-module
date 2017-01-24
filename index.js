import {NativeModules} from 'react-native';

export default NativeModules.AnylineSDKPlugin;

// based on strings from BarcodeScanView.BarcodeFormat
export const BarcodeFormat = {
  0: 'UNKNOWN',
  [1 << 0]: 'AZTEC',
  [1 << 1]: 'CODABAR',
  [1 << 2]: 'CODE_39',
  [1 << 3]: 'CODE_93',
  [1 << 4]: 'CODE_128',
  [1 << 5]: 'DATA_MATRIX',
  [1 << 6]: 'EAN_8',
  [1 << 7]: 'EAN_13',
  [1 << 8]: 'ITF',
  [1 << 9]: 'PDF_417',
  [1 << 10]: 'QR_CODE',
  [1 << 11]: 'RSS_14',
  [1 << 12]: 'RSS_EXPANDED',
  [1 << 13]: 'UPC_A',
  [1 << 14]: 'UPC_E',
  [1 << 15]: 'UPC_EAN_EXTENSION'
}
