// Shared module — ensures requireNativeComponent('AnylineNativeView') is called only once
// regardless of how many screens import it (legacy + infinity both need it).
import { requireNativeComponent } from 'react-native';
const AnylineNativeView = requireNativeComponent('AnylineNativeView');
export default AnylineNativeView;