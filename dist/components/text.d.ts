import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
export interface Text extends RNText {
}
export interface TextProps extends RNTextProps {
}
export declare const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<Text>>;
