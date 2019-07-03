import React from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { flattenObject } from './utils/utils';

export default function Result({
  result,
  imagePath,
  fullImagePath,
  emptyResult,
  currentScanMode,
}) {
  let fullImage = (<View />);
  let fullImageText = (<View />);
  if (fullImagePath && fullImagePath != '') {
    fullImage = (
      <Image
        style={styles.image}
        resizeMode={'contain'}
        source={{ uri: `file://${fullImagePath}` }}
      />);
    fullImageText = (
      <Text style={styles.text}>Full Image:</Text>
    );
  }

  const flattenResult = flattenObject(result);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} >

        {fullImageText}
        {fullImage}

        <Text style={styles.text}>Cutout:</Text>
        <Image
          style={styles.image}
          resizeMode={'contain'}
          source={{ uri: `file://${imagePath}` }}
        />
        {Object.keys(flattenResult).map((value, key) => {
          return (value === 'detectedBarcodes') ? (
            <View>
              <Text style={styles.headline}>Detected Barcodes</Text>
              {flattenResult[value].map((valueBar, keyBar) =>
                (<View key={`Result_Text_${keyBar}`}>
                  <Text style={styles.text} >Format: {valueBar.format}</Text>
                  <Text style={styles.text} >Value: {valueBar.value}</Text>
                </View>))}
            </View>)
            :
            (<Text style={styles.text} key={`Result_Text_${key}`}>
              {(value !== 'confidence' || flattenResult[value] > 0) &&
                `${value}: ${flattenResult[value]}`
              }
            </Text>);
        })}
        <View style={styles.backButton}>
          <Button title={'Back'} onPress={emptyResult} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    // flex: 1,
    height: 300,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#303030',
    marginBottom: 50,
    marginTop: 50,
  },
  headline: {
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    fontSize: 15,
    justifyContent: 'center',
  },
  text: {
    color: "white",
    justifyContent: 'space-around',
    marginTop: 5
  },
  scrollContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
  },

  backButton: {
    marginTop: 25,
    width: '100%'
  }
});
