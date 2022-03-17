import React from 'react';
import { View, StyleSheet, Button, Image, Text, Dimensions, ScrollView } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import colors from '../constants/Colors';
import MainButton from '../components/MainButton';

const GameOverscreen = (props) => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The Game is Over!</TitleText>
                <View style={styles.imageContainer}>
                    <Image
                        // fadeduration is added the fade effect into the image for milliseconds
                        fadeDuration={1000}
                        // ---------Image locally Added-------------
                        // image that is locally imported is not need to add width and height

                        // source={require('../assets/success.png')}

                        // --------Image fetch from web----------
                        // image thts is fetch from the web is always need to set the
                        // width and height.

                        source={{
                            uri: 'https://c4.wallpaperflare.com/wallpaper/410/867/750/vector-forest-sunset-forest-sunset-forest-wallpaper-preview.jpg',
                        }}
                        style={styles.image}
                        resizeMode='cover'
                    />
                </View>
                <View style={styles.resultContainer}>
                    <BodyText style={styles.resultText}>
                        {/* we can use nested text component insie the text. 
                and if we chenge something in the BodyText component then it will also
                added to the text component that is inside the bodytext.
                and the text component does not uses the flexbox but view can does.*/}
                        Your phone needed
                        <Text style={styles.highlight}> {props.roundsNumber} </Text>
                        rounds to guess the number
                        <Text style={styles.highlight}> {props.userNumber}</Text>.
                    </BodyText>
                </View>
                <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: (Dimensions.get('window').width * 0.7) / 2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 40,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    highlight: {
        color: colors.primary,
        fontFamily: 'open-sans-bold',
    },
    resultContainer: {
        marginHorizontal: 40,
        marginVertical: Dimensions.get('window').height / 60,
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 600 ? 16 : 20,
    },
});

export default GameOverscreen;
