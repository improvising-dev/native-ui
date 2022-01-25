/// <reference types="react" />
import { TextStyle, ViewStyle } from 'react-native';
export interface ButtonProps {
    children?: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
    onPressed?: () => void;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
