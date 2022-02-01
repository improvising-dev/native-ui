import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
export interface ButtonProps {
    children?: string | React.ReactNode;
    style?: StyleProp<ViewStyle>;
    textStyle?: TextStyle;
    haptic?: boolean;
    disabled?: boolean;
    onPressed?: () => void;
}
export declare const Button: React.FC<ButtonProps>;
