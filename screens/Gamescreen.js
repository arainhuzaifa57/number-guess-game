import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';
import { MaterialIcons } from '@expo/vector-icons';
// import * as ScreenOrientation from 'expo-screen-orientation';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (listLenght, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLenght - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);
BodyText;

const GameScreen = (props) => {
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [CurrentGuess, setCurrentGuess] = useState(initialGuess);
    const [PastGuess, setPastGuess] = useState([initialGuess.toString()]);
    const [AvailableDeviceWidth, setAvailableDeviceWidth] = useState(
        Dimensions.get('window').width
    );
    const [AvailableDeviceHeight, setAvailableDeviceHeight] = useState(
        Dimensions.get('window').height
    );

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        };
        Dimensions.addEventListener('change', updateLayout);
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    // object destructuring
    const { userChoice, onGameOver } = props;
    /* useEffect uses two agruments first argument is function and
        the second argument is array.*/
    useEffect(() => {
        if (CurrentGuess === userChoice) {
            onGameOver(PastGuess.length);
        }
    }, [CurrentGuess, userChoice, onGameOver]);

    const nextGuessHandler = (direction) => {
        if (
            (direction === 'lower' && CurrentGuess < props.userChoice) ||
            (direction === 'greater' && CurrentGuess > props.userChoice)
        ) {
            Alert.alert("Don't Lie! ", 'You know that this is wrong', [
                { text: 'Sorry!', style: 'cancel' },
            ]);
        }
        if (direction === 'lower') {
            currentHigh.current = CurrentGuess;
        } else {
            currentLow.current = CurrentGuess + 1;
        }
        const nextNumber = generateRandomBetween(
            currentLow.current,
            currentHigh.current,
            CurrentGuess
        );
        setCurrentGuess(nextNumber);
        // setRounds((curRounds) => curRounds + 1);
        setPastGuess((curPastGuesses) => [nextNumber.toString(), ...curPastGuesses]);
    };
    // if (Dimensions.get('window').height > 600){
    //     return <View>...</View>
    // }

    let listContainerStyle = styles.listContainer;
    if (AvailableDeviceWidth < 350) {
        listContainerStyle = styles.listContainerBig;
    }

    if (AvailableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <BodyText>Opponent's Guess</BodyText>
                <View style={styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        <MaterialIcons name='remove' size={24} color='white' />
                    </MainButton>
                    <NumberContainer>{CurrentGuess}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <MaterialIcons name='add' size={24} color='white' />
                    </MainButton>
                </View>
                <View style={listContainerStyle}>
                    <FlatList
                        keyExtractor={(item) => item}
                        data={PastGuess}
                        renderItem={renderListItem.bind(this, PastGuess.length)}
                        contentContainerStyle={styles.list}
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <BodyText>Opponent's Guess</BodyText>
            <NumberContainer>{CurrentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <MaterialIcons name='remove' size={24} color='white' />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <MaterialIcons name='add' size={24} color='white' />
                </MainButton>
            </Card>
            <View style={listContainerStyle}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {PastGuess.map((guess, index) =>
                        renderListItem(guess, PastGuess.length - index)
                    )}
                </ScrollView> */}
                <FlatList
                    keyExtractor={(item) => item}
                    data={PastGuess}
                    renderItem={renderListItem.bind(this, PastGuess.length)}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // marginTop: 20,
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 300,
        maxWidth: '80%',
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    list: {
        // flexGrow is more flaxible then flex.
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end',
    },
    listContainer: {
        flex: 1,
        width: '60%',
    },
    listContainerBig: {
        flex: 1,
        width: '80%',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
    },
});

export default GameScreen;
