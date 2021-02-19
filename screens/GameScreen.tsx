import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  const initialGuess = generateRandomBetween(MIN, MAX, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  /* BETTER TO USE REFS, SINCE WE DON'T NEED TO RE-RENDER THE COMPONENT IF THESE VALUES CHANGE (WHICH HAPPENS WHEN USING STATE) */
  const min = useRef(MIN);
  const max = useRef(MAX);
  const [pastGuesses, setPastGuesses] = useState<number[]>([initialGuess]);

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
      newGuess = generateRandomBetween(min.current, currentGuess);
      setCurrentGuess(newGuess);
    } else {
      min.current = currentGuess + 1;
      newGuess = generateRandomBetween(currentGuess, max.current);
      setCurrentGuess(newGuess);
    }
    console.log('min', 'max', 'newGuess');
    console.log(min.current, max.current, newGuess);
    setPastGuesses((st) => [newGuess, ...st]);
  };

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, pastGuesses, onGameOver]);

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.card}>
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
      <View style={styles.pastGuessListContainer}>
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
    marginTop: 20,
    maxWidth: '80%',
    width: 300,
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
    width: '80%',
  },
});

export default GameScreen;
