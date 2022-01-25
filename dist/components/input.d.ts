/// <reference types="react" />
import { TextInputProps, TextStyle } from 'react-native';
export interface InputProps extends TextInputProps {
    style?: TextStyle;
}
declare const Input: React.FC<InputProps>;
export default Input;
