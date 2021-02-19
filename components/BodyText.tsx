import React, { PropsWithChildren } from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';

interface Props extends TextProps {
  style?: TextStyle;
}

const BodyText = (props: PropsWithChildren<Props>) => {
  const { style, ...rest } = props;
  return <Text {...rest} style={{ ...styles.container, ...style }}></Text>;
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'open-sans',
  },
});

export default BodyText;
