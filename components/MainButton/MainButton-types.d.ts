import { Component } from 'react';
import { TextProps } from 'react-native';

export interface Props extends TextProps {
  onPress: () => void;
}
