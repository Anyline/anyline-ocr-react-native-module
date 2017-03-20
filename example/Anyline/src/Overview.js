/**
 * Created by jonesBoi on 14.03.17.
 */
import React from 'react';
import {Button, View, StyleSheet, Platform} from 'react-native';

export default function Overview({
    openAnyline,
    checkCameraPermissionAndOpen
}) {


    const platformPermissionCheck = (Platform.OS === 'android') ? checkCameraPermissionAndOpen : openAnyline;


    return (
        <View style={styles.container}>
            <Button style={styles.buttons} title={'Open Energy Analog Meter Scanner'} color="#0099FF"
                    onPress={()=> {platformPermissionCheck('ANALOG_METER')}}/>

            <Button style={styles.buttons} title={'Open Energy Digital Meter Scanner'} color="#0099FF"
                    onPress={()=> {platformPermissionCheck('DIGITAL_METER')}}/>

            <Button style={styles.buttons} title={'Open Barcode Scanner'} color="#0099FF"
                    onPress={()=> {platformPermissionCheck('BARCODE')}}/>

            <Button style={styles.buttons} title={'Open MRZ Scanner'} color="#0099FF"
                    onPress={()=> {platformPermissionCheck('MRZ')}}/>

            <Button style={styles.buttons} title={'Open Document Snapper'} color="#0099FF"
                    onPress={()=> {platformPermissionCheck('DOCUMENT')}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: '#303030',
        marginTop: '40%',
        marginBottom: '20%'
    },
    buttons: {
        fontSize : 40,
        backgroundColor: '#0099FF',
        width: "100%",
        height: "20%"
    }
});
