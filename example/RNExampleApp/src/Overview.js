/**
 * Created by jonas on 14.03.17.
 */
import React from 'react';
import { Button, Platform, StyleSheet, Text, View, ScrollView } from 'react-native';

export default function Overview({ updateAnyline, checkCameraPermissionAndOpen, disabled }) {

  const platformPermissionCheck = (Platform.OS === 'android') ? checkCameraPermissionAndOpen : updateAnyline;

  const iOS = Platform.OS === 'ios';

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.text}>BARCODE</Text>
      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'Barcode'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('BARCODE')
          }} />
      </View>

      <Text style={styles.text}>METER READING</Text>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'Auto Meter'}
          color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('AUTO_ANALOG_DIGITAL_METER')
          }} />
      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'Dial Meter'}
          color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('DIAL_METER')
          }} />
      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'Serial Number'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('SERIAL_NUMBER')
          }} />
      </View>

      <Text style={styles.text}>ID</Text>
      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'Universal ID'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('UNIVERSAL_ID')
          }} />
      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'Arabic ID'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('ARABIC_ID')
          }} />
      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'Cyrillic ID'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('CYRILLIC_ID')
          }} />
      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'MRZ'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('MRZ')
          }} />
      </View>

      {iOS &&
        <View style={styles.buttons}>
          <Button style={styles.buttons} title={'NFC+MRZ'} color="#0099FF"
            disabled={disabled}
            onPress={() => {
              platformPermissionCheck('NFC+MRZ')
            }} />
        </View>
      }

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'PDF 417 (AAMVA)'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('BARCODE_PDF417')
          }} />
      </View>

      <Text style={styles.text}>LICENSE PLATE</Text>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'License Plate: EU'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('LICENSE_PLATE_EU')
          }} />
      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'License Plate: US'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('LICENSE_PLATE_US')
          }} />
      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'License Plate: AF'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('LICENSE_PLATE_AF')
          }} />
      </View>

      <Text style={styles.text}>VEHICLE</Text>
      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'Vehicle Identification Number'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('VIN')
          }} />

      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'Universal TIN'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('TIN_UNIVERSAL')
          }} />
      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'TIN/DOT'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('TIN_DOT')
          }} />
      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'Tire Make'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('TIRE_MAKE')
          }} />
      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'Tire Size'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('TIRE_SIZE')
          }} />
      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'Commercial Tire ID'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('COMMERCIAL_TIRE_ID')
          }} />
      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'Odometer'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('ODOMETER')
          }} />
      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'Vehicle Registration Certificate'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('VRC')
          }} />
      </View>

      <Text style={styles.text}>OCR</Text>
      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'Universal Serial Number'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('USNR')
          }} />
      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'Horizontal Shipping Container'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('SHIPPING_CONTAINER')
          }} />
      </View>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'Vertical Shipping Container'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('VERTICAL_CONTAINER')
          }} />
      </View>

      <Text style={styles.text}>OTHER</Text>

      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'Serial Scanning (LP > DL > VIN)'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('SERIAL_SCANNING')
          }} />
      </View>
      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'Parallel Scanning (Meter / USRN)'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('PARALLEL_SCANNING')
          }} />
      </View>
      <View style={styles.buttons}>
        <Button style={styles.buttons} title={'Parallel First Scanning (Barcode / VIN)'} color="#0099FF"
          disabled={disabled}
          onPress={() => {
            platformPermissionCheck('PARALLEL_FIRST_SCANNING')
          }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
    marginTop: '10%',
    marginBottom: '10%'
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
