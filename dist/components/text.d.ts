/// <reference types="react" />
import { TextStyle } from 'react-native';
export interface TextProps {
    children?: string;
    style?: TextStyle;
}
declare const Text: React.FC<TextProps>;
export default Text;
