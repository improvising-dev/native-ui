/// <reference types="react" />
import { TextInputProps, TextStyle } from 'react-native';
export interface InputProps extends TextInputProps {
    style?: TextStyle;
}
export declare const Input: React.FC<InputProps>;
