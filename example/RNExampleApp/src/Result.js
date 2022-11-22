import React, {
  Component,
  useState
} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {flattenObject} from './utils/utils';
import AnylineOCR from 'anyline-ocr-react-native-module';

const withoutImagePaths = value =>
  value !== 'imagePath' && value !== 'fullImagePath';

export default function Result({
  result,
  imagePath,
  fullImagePath,
  emptyResult,
  currentScanMode,
  hasBackButton,
  title = false,
}) {

  const [correctedResult, setCorrectedResult] = useState('');
  const [responseText, setResponseText] = useState('');

  let onReportCorrectedResultResponseHandler = function(response) {
    /* 
        The response is a JSON object with the following style if it's an error:
        {
          "code": <Error code>,
          "message": {
            "code": <Error code>,
            "timestamp": <Timestamp>,
            "path": <Endpoint URL of our Api>,
            "method": <POST, GET etc.>,
            "message": <Error message>
          }
        }

        If the response is successful it looks like this:
        {
          "code" : 201,
          "message" : {
            "message": "ok"
          }
        }
    */
    var parsedResponse = JSON.parse(response);
    if(parsedResponse["code"] === 201){
      setResponseText("Sending corrected result was successful.");
    } else {
      setResponseText("Error while sending corrected result: " + parsedResponse["message"]);
    }
  }

  let onReportCorrectedResultPressed = function() {
    let blobKey = result["blobKey"];
    
    if(typeof blobKey === 'undefined' || blobKey === '' || blobKey === null){
      setResponseText("Only licenses with 'debugReporting' set to 'on' allow user corrected results.");
    } else if(correctedResult !== "") { 
      setResponseText("Waiting for response...");
      AnylineOCR.reportCorrectedResult(result["blobKey"], correctedResult, onReportCorrectedResultResponseHandler);
    }
  };

  let reportCorrectedResultButton = (
    <View 
      style={styles.reportCorrectedResultButtonStyle}
      >
      <TextInput 
        placeholder='Enter corrected result' 
        backgroundColor='white' 
        marginBottom={16}
        onChangeText={ newCorrectedResult => setCorrectedResult(newCorrectedResult) }
      />
      <Button title={'Report corrected result'} onPress={onReportCorrectedResultPressed} />
      <Text style={styles.text}>{responseText}</Text>
    </View>
  );

  let fullImage = <View />;
  let fullImageText = <View />;
  if (fullImagePath && fullImagePath !== '') {
    fullImage = (
      <Image
        style={styles.image}
        resizeMode={'contain'}
        source={{uri: `file://${fullImagePath}`}}
      />
    );
    fullImageText = <Text style={styles.text}>Full Image:</Text>;
  }
  const flattenResult = flattenObject(result);

  let BackButton = <View />;
  if (hasBackButton) {
    BackButton = (
      <View style={styles.backButton}>
        <Button title={'Back'} onPress={emptyResult} />
      </View>
    );
  }
  console.log(title);
  let Title = <View />;
  if (title) {
    Title = <Text style={styles.titleText}>{title}</Text>;
  }

  return (
    <View style={styles.container}>
      {Title}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {fullImageText}
        {fullImage}

        <Text style={styles.text}>Cutout:</Text>
        <Image
          style={styles.image}
          resizeMode={'contain'}
          source={{uri: `file://${imagePath}`}}
        />
        {Object.keys(flattenResult)
          .filter(withoutImagePaths)
          .map((value, key) => {
            return value === 'detectedBarcodes' ? (
              <View>
                <Text style={styles.headline}>Detected Barcodes</Text>
                {flattenResult[value].map((valueBar, keyBar) => (
                  <View key={`Result_Text_${keyBar}`}>
                    <Text style={styles.text}>Format: {valueBar.format}</Text>
                    <Text style={styles.text}>Value: {valueBar.value}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.resultContainer}>
                <Text
                  style={styles.textResultLabel}
                  key={`Result_Label_${key}`}>
                  {value}:
                </Text>
                <Text style={styles.textResult} key={`Result_Text_${key}`}>
                  {flattenResult[value]}
                </Text>
              </View>
            );
          })}
          { Platform.OS === 'android' && reportCorrectedResultButton }
        {BackButton}
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
    marginBottom: 20,
    marginTop: 50,
  },
  resultContainer: {
    display: 'flex',
    flexDirection: 'row',
    color: 'white',
    alignContent: 'flex-end',
    marginLeft: '10%',
    marginRight: '10%',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  headline: {
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    fontSize: 15,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    alignContent: 'flex-end',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginTop: 5,
  },
  textResult: {
    color: 'white',
    alignContent: 'flex-end',
    marginTop: 2,
    marginRight: '10%',
  },
  textResultLabel: {
    color: 'white',
    alignContent: 'flex-end',
    fontWeight: 'bold',
    marginTop: 10,
    marginRight: 20,

  },
  scrollContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column',
  },

  backButton: {
    marginTop: 25,
    width: Dimensions.get('window').width/4,
    alignSelf: 'center',
  },

  reportCorrectedResultButtonStyle: {
    marginTop: 25,
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    paddingLeft: 24,
    paddingRight: 24
  },

  titleText: {
    color: '#0099FF',
    fontSize: 20
  },
});
