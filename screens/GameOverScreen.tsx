import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions, ScrollView } from 'react-native';
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
    <ScrollView>
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
  button: {
    marginTop: 5,
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderWidth: 3,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: '5%',
  },
  image: { width: '100%', height: '100%' },
  highlight: { color: colors.primary, fontFamily: 'open-sans-bold' },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: '2.5%',
    flexDirection: 'row',
  },
  resultText: {
    textAlign: 'center',
    fontSize: Dimensions.get('window').width < 400 ? 16 : 20,
    flexWrap: 'wrap',
  },
});

export default GameScreen;
