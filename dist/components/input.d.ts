import React from 'react';
import { StyleProp, TextInput, TextInputProps, TextStyle, ViewStyle } from 'react-native';
export interface Input extends TextInput {
}
export interface InputProps extends TextInputProps {
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<TextInput>>;
