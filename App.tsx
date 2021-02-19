import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () =>
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

export default function App() {
  const [userNumber, setUserNumber] = useState<number>();
  const [numberOfRounds, setNumberOfRounds] = useState<number>(0);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onError={console.log}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }

  const handleStartGame = (selectedNumber: number) => {
    setUserNumber(selectedNumber);
  };

  const handleGameOver = (numberOfRounds: number) => {
    setNumberOfRounds(numberOfRounds);
  };

  const handleStartNewGame = () => {
    setNumberOfRounds(0);
    setUserNumber(undefined);
  };

  let screen;

  if (userNumber && numberOfRounds <= 0) {
    screen = <GameScreen userNumber={userNumber} onGameOver={handleGameOver} />;
  } else if (!userNumber && numberOfRounds <= 0) {
    screen = <StartGameScreen onStartGame={handleStartGame} />;
  } else if (userNumber) {
    screen = (
      <GameOverScreen
        guessedNumber={userNumber}
        numberOfRounds={numberOfRounds}
        onRestart={handleStartNewGame}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title='Guess a Number' />
      {screen}

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
