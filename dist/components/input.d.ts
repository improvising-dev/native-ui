import React from 'react';
import { StyleProp, TextInput, TextInputProps, TextStyle, ViewStyle } from 'react-native';
export declare type OverlayVisibilityMode = 'always' | 'editing' | 'not-editing' | 'never';
export interface Input extends TextInput {
}
export interface InputProps extends TextInputProps {
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    prefix?: React.ReactNode;
    prefixMode?: OverlayVisibilityMode;
    suffix?: React.ReactNode;
    suffixMode?: OverlayVisibilityMode;
}
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<TextInput>>;
