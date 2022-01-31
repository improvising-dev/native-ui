/// <reference types="react" />
import { TextProps as RNTextProps } from 'react-native';
export interface TextProps extends RNTextProps {
    children?: string;
}
export declare const Text: React.FC<TextProps>;
