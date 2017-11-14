import React from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';

export default function Result({
                                 result,
                                 imagePath,
                                 fullImagePath,
                                 emptyResult,
                                 currentScanMode,
                               }) {
  let fullImage = (<View/>);
  let fullImageText = (<View/>);
  if (fullImagePath && fullImagePath != '') {
    fullImage = (
        <Image
            style={styles.image}
            resizeMode={'contain'}
            source={{uri: `file://${fullImagePath}`}}
        />);
    fullImageText = (
        <Text style={styles.text}>Full Image:</Text>
    );
  }

  return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer} >

          {fullImageText}
          {fullImage}

          <Text style={styles.text}>Cutout:</Text>
          <Image
              style={styles.image}
              resizeMode={'contain'}
              source={{uri: `file://${imagePath}`}}
          />
          {Object.keys(result).map((value, key) => {
            return (<Text style={styles.text} key={`Result_Text_${key}`}>
              {(value !== 'confidence' || result[value] > 0) &&
               `${value}: ${result[value]}`
              }

            </Text>);
          })}
          <View style={styles.backButton}>
            <Button title={'Back'} onPress={emptyResult}/>
          </View>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 200,
    width: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#303030',
    marginBottom: 50,
    marginTop: 50
  },
  text: {
    color: "white",
    justifyContent: 'space-around',
    marginTop: 5
  },
  scrollContainer: {
    alignItems: 'center',
  },

  backButton: {
    marginTop: 25,
    width: '100%'
  }
});
