import React from 'react';
import { StyleProp, TextInput, TextInputProps, TextStyle, ViewStyle } from 'react-native';
export declare type OverlayVisibilityMode = 'always' | 'editing' | 'not-editing' | 'never';
export interface Input extends TextInput {
}
export interface InputProps extends TextInputProps {
    autoFocusDelay?: number;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    prefix?: React.ReactNode;
    prefixMode?: OverlayVisibilityMode;
    suffix?: React.ReactNode;
    suffixMode?: OverlayVisibilityMode;
}
export declare const Input: React.MemoExoticComponent<React.ForwardRefExoticComponent<InputProps & React.RefAttributes<TextInput>>>;
