import React from 'react';
import { View, StyleSheet } from 'react-native';

import TitleText from '../components/TitleText';
import colors from '../constants/colors';

type Props = {
  title: string;
};

const Header = ({ title }: Props) => (
  <View style={styles.header}>
    <TitleText>{title}</TitleText>
  </View>
);
const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
