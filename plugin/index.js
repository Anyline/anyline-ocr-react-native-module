import {NativeModules} from 'react-native';
import {version as pluginVersion} from './package.json';

const AnylineOCR = NativeModules.AnylineSDKPlugin;

export default AnylineOCR;

AnylineOCR.setupWrapperSession(pluginVersion);

AnylineOCR.getPluginVersion = () => {
  return pluginVersion;
}
