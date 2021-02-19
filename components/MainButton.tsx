import React, { PropsWithChildren } from 'react';
import { View, StyleSheet, TouchableOpacity, TextProps, Text } from 'react-native';

import colors from '../constants/colors';

interface Props extends TextProps {
  onPress: () => void;
}

const BodyText = ({ onPress, children }: PropsWithChildren<Props>) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems:'center',
    borderRadius:25
  },
  buttonText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 18,
  },
});

export default BodyText;
