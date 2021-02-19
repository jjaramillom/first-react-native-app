import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import Card from '../components/Card';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import Input from '../components/Input';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import colors from '../constants/colors';

type Props = { onStartGame: (selectedNumber: number) => void };

const StartGameScreen = ({ onStartGame }: Props) => {
  const [enteredValue, setEnteredValue] = useState<string>('');
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [selectedNumber, setSelectedNumber] = useState<number>();

  const handleNumberInputChange = (text: string) => {
    setEnteredValue(text.replace(/[^0-9]/g, ''));
  };

  const handleResetInput = () => {
    setEnteredValue('');
  };

  const handleConfirmInput = () => {
    const chosenNumber = Number(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Ivalid number!', 'Has to be a number between 1 and 99', [
        { text: 'okay', style: 'default', onPress: handleResetInput },
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  const handleStartGame = () => {
    if (selectedNumber) {
      onStartGame(selectedNumber);
    }
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected </Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <View style={styles.startGameButton}>
          <MainButton onPress={handleStartGame}>START GAME</MainButton>
        </View>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <TitleText style={styles.title}>Start a New Game!</TitleText>
        <Card style={styles.card}>
          <BodyText>Select a number</BodyText>
          <Input
            style={styles.input}
            onChangeText={(text) => handleNumberInputChange(text)}
            value={enteredValue}
            blurOnSubmit
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='number-pad'
            maxLength={2}
          />
          <View style={styles.buttonsContainer}>
            <View style={styles.button}>
              <Button color={colors.accent} title='Reset' onPress={handleResetInput} />
            </View>
            <View style={styles.button}>
              <Button color={colors.primary} title='Confirm' onPress={handleConfirmInput} />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  card: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  title: {
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
  },
  summaryContainer: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  startGameButton: {
    width: 150,
    marginTop: 10,
  },
});

export default StartGameScreen;
