import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

type Props = {
  userNumber: number;
  onGameOver: (numberOfRounds: number) => void;
};

type Direction = 'lower' | 'higher';

const generateRandomBetween = (min: number, max: number, exclude?: number): number => {
  const minInt = Math.ceil(min);
  const maxInt = Math.ceil(max);
  const rndNum = Math.floor(Math.random() * (maxInt - minInt)) + minInt;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
};

const renderListItem = (value: number, roundnum: number) => (
  <View key={value} style={styles.pastGuess}>
    <BodyText>#{roundnum}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const MIN = 1;
const MAX = 100;

const GameScreen = ({ userNumber, onGameOver }: Props) => {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  const initialGuess = generateRandomBetween(MIN, MAX, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  /* BETTER TO USE REFS, SINCE WE DON'T NEED TO RE-RENDER THE COMPONENT IF THESE VALUES CHANGE (WHICH HAPPENS WHEN USING STATE) */
  const min = useRef(MIN);
  const max = useRef(MAX);
  const [pastGuesses, setPastGuesses] = useState<number[]>([initialGuess]);
  const [deviceHeight, setDeviceHeight] = useState<number>(Dimensions.get('window').height);
  const [deviceWidth, setDeviceWidth] = useState<number>(Dimensions.get('window').width);

  const handleNextGuess = (direction: Direction) => {
    // Invalid hint given by user
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'higher' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie", 'You know this is bad...');
      return;
    }
    let newGuess: number;
    if (direction === 'lower') {
      max.current = currentGuess;
    } else {
      min.current = currentGuess + 1;
    }
    newGuess = generateRandomBetween(min.current, max.current);
    setCurrentGuess(newGuess);

    setPastGuesses((st) => [newGuess, ...st]);
  };

  useEffect(() => {
    const updateLayout = () => {
      setDeviceHeight(Dimensions.get('window').height);
      setDeviceWidth(Dimensions.get('window').width);
    };
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  }, []);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, pastGuesses, onGameOver]);

  if (deviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={() => handleNextGuess('lower')}>
            <Ionicons name='md-remove' size={24} color='white' />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={() => handleNextGuess('higher')}>
            <Ionicons name='md-add' size={24} color='white' />
          </MainButton>
        </View>
        <View style={styles.pastGuessListContainer}>
          <ScrollView contentContainerStyle={styles.pastGuessList}>
            {pastGuesses.map((guess, i) => renderListItem(guess, pastGuesses.length - i))}
          </ScrollView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={{ ...styles.card, marginTop: deviceHeight > 600 ? 20 : 10 }}>
        <Text>Your number is</Text>
        <View style={styles.buttonContainer}>
          <MainButton onPress={() => handleNextGuess('lower')}>
            <Ionicons name='md-remove' size={24} color='white' />
          </MainButton>
          <MainButton onPress={() => handleNextGuess('higher')}>
            <Ionicons name='md-add' size={24} color='white' />
          </MainButton>
        </View>
      </Card>
      <View
        style={{
          ...styles.pastGuessListContainer,
          width: deviceWidth > 500 ? '60%' : '80%',
        }}>
        <ScrollView contentContainerStyle={styles.pastGuessList}>
          {pastGuesses.map((guess, i) => renderListItem(guess, pastGuesses.length - i))}
        </ScrollView>
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
    width: '100%',
    marginTop: 10,
  },
  card: {
    alignItems: 'center',
    maxWidth: '80%',
    width: 300,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
  },
  pastGuess: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pastGuessList: {
    // alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  pastGuessListContainer: {
    flex: 1,
    width: Dimensions.get('window').width > 500 ? '60%' : '80%',
  },
});

export default GameScreen;
