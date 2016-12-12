import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Result({
  fullImageBase64,
  cutoutBase64,
  result,
  barcode,
  scanMode,
  meterType,
}) {
  return (
    <View>
      <Text>Full Image:</Text>
      <Image
        style={styles.image}
        source={{ uri: `data:image/jpg;base64,${fullImageBase64}` }}
      />

      <Text>Cutout:</Text>
      <Image
        style={styles.image}
        source={{ uri: `data:image/jpg;base64,${cutoutBase64}` }}
      />

      <Text>{`Result: ${result}`}</Text>
      <Text>{`Scan Mode: ${scanMode}`}</Text>
      <Text>{`Meter Type: ${meterType}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 100,
  },
});
