/// <reference types="react" />
import { TextStyle } from 'react-native';
export interface TextProps {
    children?: string;
    style?: TextStyle;
}
export declare const Text: React.FC<TextProps>;
