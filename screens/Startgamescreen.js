import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Button,
    Keyboard,
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/Colors';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

const StartGameScreen = (props) => {
    const [EnteredValue, setEnteredValue] = useState('');
    const [Confirmed, setConfirmed] = useState(false);
    const [SelectedNumber, setSelectedNumber] = useState();
    const [ButtonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });
    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText);
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmedInputHandler = () => {
        const chosenNumber = parseInt(EnteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number', 'Number has to be Number between 1 to 99.', [
                { text: 'Okay', style: 'destructive', onPress: resetInputHandler },
            ]);
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOuput;
    if (Confirmed) {
        confirmedOuput = (
            <Card style={styles.summaryContainer}>
                <BodyText>You Seleted</BodyText>
                <NumberContainer>{SelectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(SelectedNumber)}>
                    START GAME
                </MainButton>
            </Card>
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}
                >
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a New Game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input
                                style={styles.input}
                                blurOnSubmit
                                autoCorrect={false}
                                autoCapitalize='none'
                                keyboardType='number-pad'
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                Value={EnteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{ style: ButtonWidth }}>
                                    <Button
                                        title='Reset'
                                        onPress={resetInputHandler}
                                        color={Colors.accent}
                                    />
                                </View>
                                <View style={{ style: ButtonWidth }}>
                                    <Button
                                        title='Confirm'
                                        onPress={confirmedInputHandler}
                                        color={Colors.primary}
                                    />
                                </View>
                            </View>
                        </Card>
                        {confirmedOuput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    button: {
        // width: 90,
        // dimension is the object that allows us to find out how much you have available.
        // It's a great API for finding out how many pixels you have available on the width and on the height
        // and this is only runs once in our app lifecycle
        //width: Dimensions.get('window').width / 4,
    },
    input: {
        width: 50,
        textAlign: 'center',
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});

export default StartGameScreen;
