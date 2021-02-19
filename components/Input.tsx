import React, { PropsWithChildren } from 'react';
import { TextInput, StyleSheet, TextStyle, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  style?: TextStyle;
}

const Card = (props: PropsWithChildren<Props>) => {
  const { style, ...rest } = props;
  return <TextInput {...rest} style={{ ...styles.container, ...style }}></TextInput>;
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default Card;
