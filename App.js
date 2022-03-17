import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/Startgamescreen';
import GameScreen from './screens/Gamescreen';
import GameOverscreen from './screens/GameOverScreen';

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

export default function App() {
    const [UserNumber, setUserNumber] = useState();
    const [GuessRounds, setGuessRounds] = useState(0);
    const [DataLoaded, setDataLoaded] = useState(false);

    if (!DataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
                onError={(err) => console.log(err)}
            />
        );
    }

    const configureNewGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null);
    };

    const startGameHandler = (seletedNumber) => {
        setUserNumber(seletedNumber);
    };

    const gameOverhandler = (numOfRounds) => {
        setGuessRounds(numOfRounds);
    };

    let content = <StartGameScreen onStartGame={startGameHandler} />;

    if (UserNumber && GuessRounds <= 0) {
        content = <GameScreen userChoice={UserNumber} onGameOver={gameOverhandler} />;
    } else if (GuessRounds > 0) {
        content = (
            <GameOverscreen
                roundsNumber={GuessRounds}
                userNumber={UserNumber}
                onRestart={configureNewGameHandler}
            />
        );
    }

    return (
        // SafeAreaView is used for to adjust the screen if there is a notch on the screen
        <SafeAreaView style={styles.screen}>
            <Header title='Guess A Number' />
            {content}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});
