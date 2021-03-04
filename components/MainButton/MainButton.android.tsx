import React, { PropsWithChildren } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextProps,
  Text,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

import { Props } from './MainButton-types';
import colors from '../../constants/colors';

const MainButton = ({ onPress, children }: PropsWithChildren<Props>) => {
  let ButtonComponent: any = TouchableOpacity;

  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }
  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.6} onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: { borderRadius: 25, overflow: 'hidden' },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18,
  },
});

export default MainButton;
