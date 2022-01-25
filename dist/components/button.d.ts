/// <reference types="react" />
import { TextStyle, ViewStyle } from 'react-native';
export interface ButtonProps {
    children?: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
    haptic?: boolean;
    onPressed?: () => void;
}
export declare const Button: React.FC<ButtonProps>;
