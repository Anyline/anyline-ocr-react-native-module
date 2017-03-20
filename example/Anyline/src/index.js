import React, {Component} from 'react';
import {
    AppRegistry,
    PermissionsAndroid,
    StyleSheet,
    Text,
    View,
    Platform,
    Button,
    LayoutAnimation
} from 'react-native';

import AnylineOCR from 'anyline-ocr-react-native-module';

import Result from './Result';
import Overview from './Overview';

import BarcodeConfig from '../config/BarcodeConfig';
import DocumentConfig from '../config/DocumentConfig';
import EnergyConfig from '../config/EnergyConfig';
import MRZConfig from '../config/MRZConfig';


class Anyline extends Component {

    state = {
        hasScanned: false,
        result: '',
        imagePath: '',
        fullImagePath: ''
    };

    componentWillUpdate() {
        LayoutAnimation.easeInEaseOut();
    }

    openAnyline = (type) => {

        let config;

        switch (type) {
            case 'ANALOG_METER':
            case 'DIGITAL_METER':
                config = EnergyConfig;
                break;
            case 'BARCODE':
                config = BarcodeConfig;
                break;
            case 'MRZ':
                config = MRZConfig;
                break;
            case 'DOCUMENT':
                config = DocumentConfig;
                break;
            default:
                config = EnergyConfig;
        }

        AnylineOCR.setupScanViewWithConfigJson(
            JSON.stringify(config),
            type,
            this.onResult,
            this.onError
        );
    };

    requestCameraPermission = async(type) => {

        try {            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    'title': 'Cool Photo App Camera Permission',
                    'message': 'Cool Photo App needs access to your camera ' +
                    'so you can take awesome pictures.'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Camera permission allowed');
                this.openAnyline(type);
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    hasCameraPermission = async() => {
        try {
            return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        } catch (err) {
            console.warn(err, 'PERMISSION CHECK');
        }
    };

    checkCameraPermissionAndOpen = (type) => {
        this.hasCameraPermission().then((hasCameraPermission) => {
            console.log('hasCameraPermission result is ' + hasCameraPermission);
            if (hasCameraPermission) {
                console.log('Opening OCR directly');
                this.openAnyline(type);
            } else {
                this.requestCameraPermission(type);
            }
        });
    };

    onResult = (dataString) => {
        const data = JSON.parse(dataString);
        LayoutAnimation.easeInEaseOut();
        const fullImagePath = data.fullImagePath;
        const imagePath = data.imagePath;
        // data.outline = JSON.stringify(data.outline);

        delete data.fullImagePath;
        delete data.imagePath;

        this.setState({
            hasScanned: true,
            result: data,
            imagePath: imagePath,
            fullImagePath: fullImagePath,

        });
    };

    onError = (error) => {
        if (error !== 'Canceled') {
            console.error(error);
            alert(error);
        }
    };

    emptyResult = () => {
        this.setState({
            hasScanned: false,
            result: '',
            imagePath: '',
            fullImagePath: ''
        });
    };

    render() {

        const {
            hasScanned,
            result,
            imagePath,
            fullImagePath
        } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.headline}>Anyline React-Native Demo</Text>
                {hasScanned ? (
                        <Result
                            key="ResultView"
                            result={result}
                            imagePath={imagePath}
                            fullImagePath={fullImagePath}
                            data={result}
                            emptyResult={this.emptyResult}
                        />
                    ) : <Overview key="OverView" openAnyline={this.openAnyline}
                                  checkCameraPermissionAndOpen={this.checkCameraPermissionAndOpen}/>}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        width : "100%",
        backgroundColor: '#303030'
    },
    headline: {
        fontSize: 25,
        color: "white",
        marginTop: 100
    }
});

AppRegistry.registerComponent('Anyline', () => Anyline);
