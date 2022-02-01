import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export interface CheckBoxProps {
    value: boolean;
    onValueChange?: (value: boolean) => void;
    size?: number;
    style?: StyleProp<ViewStyle>;
    checkedColor?: string;
    uncheckedColor?: string;
    iconColor?: string;
}
export declare const CheckBox: React.FC<CheckBoxProps>;
