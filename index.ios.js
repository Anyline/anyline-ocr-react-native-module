/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    View
} from 'react-native';
import ResultView from './ResultView';


class AnylineReactNative extends Component {

    render() {

        return (
            <View>
                <ResultView />
            </View>
        );
    }
}

AppRegistry.registerComponent('AnylineReactNative', () => AnylineReactNative);
