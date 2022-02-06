import React from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
export interface Button extends View {
}
export interface ButtonProps {
    children?: string | React.ReactNode;
    style?: StyleProp<ViewStyle>;
    textStyle?: TextStyle;
    haptic?: boolean;
    disabled?: boolean;
    onPress?: () => void;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<Button>>;
