/**
 * Created by jonas on 14.03.17.
 */
import React from 'react';
import { Button, Platform, StyleSheet, Text, View, ScrollView } from 'react-native';

export default function Overview({ openAnyline, checkCameraPermissionAndOpen, disabled }) {

  const platformPermissionCheck = (Platform.OS === 'android') ? checkCameraPermissionAndOpen : openAnyline;

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.text}>METER READING</Text>
      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  Auto Analog/Digital Meter Scanner'}
          color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('AUTO_ANALOG_DIGITAL_METER')
          }} />
      </View>
      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  Analog Meter Scanner'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('ANALOG_METER')
          }} />
      </View>
      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  Digital Meter Scanner'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('DIGITAL_METER')
          }} />
      </View>
      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  Serial Number'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('SERIAL_NUMBER')
          }} />
      </View>
      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  Dial Meter Scanner ALPHA'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('DIAL_METER')
          }} />
      </View>
      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  Dot Matrix Meter'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('DOT_MATRIX_METER')
          }} />
      </View>
      <Text style={styles.text}>ID</Text>
      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  Driving License'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('DRIVING_LICENSE')
          }} />

      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  MRZ Scanner'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('MRZ')
          }} />
      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  German ID Front'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('GERMAN_ID_FRONT')
          }} />
      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  Barcode PDF417'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('BARCODE_PDF417')
          }} />
      </View>


      <Text style={styles.text}>VEHICLE</Text>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  License Plate Scanner'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('LICENSE_PLATE')
          }} />
      </View>
      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  TIN Scanner'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('TIN')
          }} />
      </View>
      <Text style={styles.text}>OCR</Text>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  IBAN Scanner'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('IBAN')
          }} />
      </View>
      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  Voucher Code Scanner'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('VOUCHER')
          }} />

      </View>

      <Text style={styles.text}>MRO</Text>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  Vehicle Identification Number'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('VIN')
          }} />

      </View>
      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  Universal Serial Number'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('USNR')
          }} />
      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  Shipping Container'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('SHIPPING_CONTAINER')
          }} />
      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  Vertical Container'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('VERTICAL_CONTAINER')
          }} />
      </View>

      <Text style={styles.text}>OTHER</Text>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  Barcode Scanner'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('BARCODE')
          }} />
      </View>
      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  Document Scanner'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('DOCUMENT')
          }} />
      </View>
      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  Cattle Tag'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('CATTLE_TAG')
          }} />
      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'  Serial Scanning'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('SERIAL_SCANNING')
          }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
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
