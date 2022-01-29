/// <reference types="react" />
import { ViewStyle } from 'react-native';
export interface CheckBoxProps {
    value: boolean;
    onValueChange?: (value: boolean) => void;
    size?: number;
    style?: ViewStyle;
    checkedColor?: string;
    uncheckedColor?: string;
    iconColor?: string;
}
export declare const CheckBox: React.FC<CheckBoxProps>;
