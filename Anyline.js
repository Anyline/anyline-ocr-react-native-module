/**
 * Created by jonesBoi on 03.12.16.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import AnylineSDKPlugin from './AnylineSDKPlugin';


class Anyline extends Component {

    render() {
        AnylineSDKPlugin.setupScanViewWithConfigJson(JSON.stringify(this.props.config), this.props.scanMode, this.props.onResult, this.props.onError);

        return (
            <View/>
        );
    }
}

Anyline.propTypes = {
    config: React.PropTypes.object,
    scanMode: React.PropTypes.string,
    onResult: React.PropTypes.func,
    onError: React.PropTypes.func
};

AppRegistry.registerComponent('Anyline', () => Anyline);
export default Anyline;
