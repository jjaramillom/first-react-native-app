import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import colors from '../constants/colors';

type Props = {
  numberOfRounds: number;
  guessedNumber: number;
  onRestart: () => void;
};

const GameScreen = ({ guessedNumber, numberOfRounds, onRestart }: Props) => {
  return (
    <View style={styles.screen}>
      <TitleText>Game is over</TitleText>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/success.png')} //Local image
          // source={{uri:'https://s3.amazonaws.com/images.gearjunkie.com/uploads/2018/05/matterhorn-3x21.jpg'}} //Web image
          resizeMode='cover'
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          It took your phone <Text style={styles.highlight}>{numberOfRounds}</Text> rounds to
          guess the number <Text style={styles.highlight}>{guessedNumber}</Text>
        </BodyText>
      </View>
      <View style={styles.button}>
        <MainButton onPress={onRestart}>NEW GAME</MainButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 5,
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderWidth: 3,
    borderRadius: 200,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30,
  },
  image: { width: '100%', height: '100%' },
  highlight: { color: colors.primary, fontFamily: 'open-sans-bold' },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: 15,
    flexDirection: 'row',
  },
  resultText: {
    textAlign: 'center',
    fontSize: 20,
    flexWrap: 'wrap',
  },
});

export default GameScreen;
