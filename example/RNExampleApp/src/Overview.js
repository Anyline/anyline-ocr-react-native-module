/**
 * Created by jonas on 14.03.17.
 */
import React from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';

export default function Overview({openAnyline, checkCameraPermissionAndOpen, disabled}) {

  const platformPermissionCheck = (Platform.OS === 'android') ? checkCameraPermissionAndOpen : openAnyline;

  return (
      <View style={styles.container}>

        <Text style={styles.text}>ENERGY</Text>
        <View style={styles.buttons}>
          <Button style={styles.buttons} title={'  Auto Analog/Digital Meter Scanner'}
                  color="#0099FF"
                  disabled={disabled}
                  onPress={() => {
                    platformPermissionCheck('AUTO_ANALOG_DIGITAL_METER')
                  }}/>
        </View>
        <View style={styles.buttons}>
          <Button style={styles.buttons} title={'  Analog Meter Scanner'} color="#0099FF"
                  disabled={disabled}
                  onPress={() => {
                    platformPermissionCheck('ANALOG_METER')
                  }}/>
        </View>
        <View style={styles.buttons}>
          <Button style={styles.buttons} title={'  Digital Meter Scanner'} color="#0099FF"
                  disabled={disabled}
                  onPress={() => {
                    platformPermissionCheck('DIGITAL_METER')
                  }}/>
        </View>
        <View style={styles.buttons}>
          <Button style={styles.buttons} title={'  Serial Number'} color="#0099FF"
                  disabled={disabled}
                  onPress={() => {
                    platformPermissionCheck('SERIAL_NUMBER')
                  }}/>
        </View>
        <View style={styles.buttons}>
          <Button style={styles.buttons} title={'  Dial Meter Scanner ALPHA'} color="#0099FF"
                  disabled={disabled}
                  onPress={() => {
                    platformPermissionCheck('DIAL_METER')
                  }}/>
        </View>
        <View style={styles.buttons}>
          <Button style={styles.buttons} title={'  Dot Matrix Meter'} color="#0099FF"
                  disabled={disabled}
                  onPress={() => {
                    platformPermissionCheck('DOT_MATRIX_METER')
                  }}/>
        </View>
        <Text style={styles.text}>VEHICLE</Text>

        <View style={styles.buttons}>
          <Button style={styles.buttons} title={'  License Plate Scanner'} color="#0099FF"
                  disabled={disabled}
                  onPress={() => {
                    platformPermissionCheck('LICENSE_PLATE')
                  }}/>
        </View>
        <Text style={styles.text}>OCR</Text>

        <View style={styles.buttons}>
          <Button style={styles.buttons} title={'  IBAN Scanner'} color="#0099FF"
                  disabled={disabled}
                  onPress={() => {
                    platformPermissionCheck('IBAN')
                  }}/>
        </View>
        <View style={styles.buttons}>
          <Button style={styles.buttons} title={'  Voucher Code Scanner'} color="#0099FF"
                  disabled={disabled}
                  onPress={() => {
                    platformPermissionCheck('VOUCHER')
                  }}/>

        </View>
        <View style={styles.buttons}>
          <Button style={styles.buttons} title={'  Austrian Driving License'} color="#0099FF"
                  disabled={disabled}
                  onPress={() => {
                    platformPermissionCheck('DRIVING_LICENSE')
                  }}/>

        </View>
        <View style={styles.buttons}>
          <Button style={styles.buttons} title={'  Vehicle Identification Number'} color="#0099FF"
                  disabled={disabled}
                  onPress={() => {
                    platformPermissionCheck('VIN')
                  }}/>

        </View>
        <View style={styles.buttons}>
          <Button style={styles.buttons} title={'  Universal Serial Number'} color="#0099FF"
                  disabled={disabled}
                  onPress={() => {
                    platformPermissionCheck('USNR')
                  }}/>

        </View>
        <Text style={styles.text}>OTHER</Text>

        <View style={styles.buttons}>
          <Button style={styles.buttons} title={'  Barcode Scanner'} color="#0099FF"
                  disabled={disabled}
                  onPress={() => {
                    platformPermissionCheck('BARCODE')
                  }}/>
        </View>
        <View style={styles.buttons}>
          <Button style={styles.buttons} title={'  MRZ Scanner'} color="#0099FF"
                  disabled={disabled}
                  onPress={() => {
                    platformPermissionCheck('MRZ')
                  }}/>
        </View>
        <View style={styles.buttons}>
          <Button style={styles.buttons} title={'  Document Scanner'} color="#0099FF"
                  disabled={disabled}
                  onPress={() => {
                    platformPermissionCheck('DOCUMENT')
                  }}/>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#303030',
    marginTop: '40%',
    marginBottom: '20%'
  },
  buttons: {
    margin: 5
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 25
  }

});
