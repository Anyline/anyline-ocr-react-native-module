import React from 'react';
import {ScrollView, View, Text, Image, StyleSheet, Button} from 'react-native';

export default function Result({
                                   result,
                                   imagePath,
                                   fullImagePath,
                                   emptyResult
                               }) {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.text}>Full Image:</Text>
                <Image
                    style={styles.image}
                    source={{uri: `file://${fullImagePath}`}}
                />

                <Text style={styles.text}>Cutout:</Text>
                <Image
                    style={styles.image}
                    source={{uri: `file://${imagePath}`}}
                />
                {Object.keys(result).map((value, key) => {
                    return (<Text style={styles.text} key={`Result_Text_${key}`}>
                        {`${value}: ${result[value]}`}
                    </Text>);
                })}
                <Button title={'Back'} onPress={emptyResult}/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 200
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#303030',
        marginBottom: 50
    },
    text: {
        color: "white"
    },
    scrollContainer: {
        alignItems: 'center',
    }
});
