/**
 * Created by jonesBoi on 03.12.16.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    ScrollView,
    View,
    Image,
    StyleSheet
} from 'react-native';
import Anyline from './Anyline';
import config from './config.json';
class ResultView extends Component {

    constructor(props) {
        super(props);
        this.state = {hasScanned: false};
        this.result = '';
        this.imagePath = '';
        this.fullImagePath = '';
        this.barcode = '';
        this.scanMode = '';
        this.meterType = '';
        this.scanMode = "ANALOG_METER";
        this.cutoutBase64 = "";
    }


    onResult = (dataString) => {
        const data = JSON.parse(dataString);
        this.result = data.reading;
        this.imagePath = data.imagePath;
        this.fullImagePath = data.fullImagePath;
        this.barcode = data.barcodeResult;
        this.scanMode = data.scanMode;
        this.meterType = data.meterType;
        this.cutoutBase64 = data.cutoutBase64;
        this.fullImageBase64 = data.fullImageBase64;
        this.setState({hasScanned: true});
    };

    onError = (error) => {
        alert(error);
    };


    render() {

        const styles = StyleSheet.create({
            stretch: {
                height: 250,
                width: 200,
            },
            cutout: {
                height: 70
            }
        });

        const AnylineComponent = (this.state.hasScanned) ? (<Text />) : (
            <Anyline config={config} scanMode={this.scanMode} onError={this.onError} onResult={this.onResult}/>);

        const Result = (!this.state.hasScanned) ? (<Text />) : (
            <View>
                <Text style={{flex: 1}}>
                    {"\n\n"}
                    Full Image:
                </Text>

                <Image
                    style={styles.stretch}
                    source={{
                        uri: 'data:image/jpg;base64,' + this.fullImageBase64
                    }}
                />
                <Text style={{flex: 1}}>
                    Cutout:
                </Text>

                <Image
                    style={styles.cutout}
                    source={{
                        uri: 'data:image/jpg;base64,' + this.cutoutBase64
                    }}
                />
                <Text style={{flex: 1}}>
                    Result: {this.result}
                    {"\n"}
                    barcode: {this.barcode}
                    {"\n"}
                    scanMode: {this.scanMode}
                    {"\n"}
                    meterType: {this.meterType}
                    {"\n\n"}
                    {"\n\n"}
                    {"\n\n"}
                    {"\n\n"}
                </Text>

            </View>
        );

        return (

            <ScrollView>

                {Result}
                {AnylineComponent}

            </ScrollView>
        );
    }
}
export default ResultView;
AppRegistry.registerComponent('ResultView', () => ResultView);