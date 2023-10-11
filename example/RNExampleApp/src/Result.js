import React, {
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
  TextInput,
} from 'react-native';
import AnylineOCR from 'anyline-ocr-react-native-module';

const withoutImagePaths = value =>
  value !== 'imagePath' && value !== 'fullImagePath';

export default function Result({
  result,
  imagePath,
  fullImagePath,
  emptyResult,
  hasBackButton,
  title = false,
}) {

  const [correctedResult, setCorrectedResult] = useState('');
  const [responseText, setResponseText] = useState('');

  let onReportCorrectedResultResponseHandler = function (response) {
    /* 
        The response is a string with the following style if it's an error:
        "Error: Full error message"

        If the response is successful it looks like this:
        "Success"
    */
    if (response.startsWith("Success")) {
        setResponseText("Sending corrected result was successful.");
    } else {
        setResponseText(response);
    }
  }

  let onReportCorrectedResultPressed = function () {
    let blobKey = result["blobKey"];

    if (typeof blobKey === 'undefined' || blobKey === '' || blobKey === null) {
      setResponseText("Only licenses with 'debugReporting' set to 'on' allow user corrected results.");
    } else if (correctedResult !== "") {
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
        onChangeText={newCorrectedResult => setCorrectedResult(newCorrectedResult)}
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
        source={{ uri: `file://${fullImagePath}` }}
      />
    );
    fullImageText = <Text style={styles.text}>Full Image:</Text>;
  }

  // cloned version of result.
  const resultWithoutImagePaths = JSON.parse(JSON.stringify(result));
  delete resultWithoutImagePaths.imagePath;
  delete resultWithoutImagePaths.fullImagePath;

  const stringifiedResult = JSON.stringify(resultWithoutImagePaths, ' ', 2);

  let BackButton = <View />;
  if (hasBackButton) {
    BackButton = (
      <View style={styles.backButton}>
        <Button title={'Back'} onPress={emptyResult} />
      </View>
    );
  }

  let Title = <View />;
  if (title) {
    Title = <Text style={styles.titleText}>{title}</Text>;
  }

  return (
    <View style={styles.container}>

      {Title}

      {<ScrollView style={styles.scrollViewInner} nestedScrollEnabled showsVerticalScrollIndicator>
        <Text style={styles.textResultScrollable}>{stringifiedResult}</Text>
      </ScrollView>}

      {fullImageText}

      {fullImage}

      <Text style={styles.text}>Cutout:</Text>

      <Image
        style={styles.image}
        resizeMode={'contain'}
        source={{ uri: `file://${imagePath}` }}
      />

      {Platform.OS === 'android' && reportCorrectedResultButton}
      {BackButton}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
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
    marginTop: 20,
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
  textResultScrollable: {
    color: 'white',
    fontWeight: 'normal',
    fontFamily: 'courier',
    marginVertical: 20
  },
  scrollContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column',
  },
  backButton: {
    marginTop: 25,
    width: Dimensions.get('window').width / 4,
    alignSelf: 'center',
  },
  reportCorrectedResultButtonStyle: {
    marginTop: 25,
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    paddingLeft: 24,
    paddingRight: 24
  },
  scrollViewInner: {
    margin: 25,
    paddingHorizontal: 20,
    maxHeight: 300,
    borderRadius: 7,
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1
  },
  titleText: {
    color: '#0099FF',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 0,
  },
});
