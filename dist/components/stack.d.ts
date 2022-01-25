/// <reference types="react" />
import { FlexStyle, ViewStyle } from 'react-native';
export interface StackProps {
    direction?: FlexStyle['flexDirection'];
    align?: FlexStyle['alignItems'];
    justify?: FlexStyle['justifyContent'];
    style?: ViewStyle;
    spacing?: number;
    children: React.ReactNode[];
}
export declare const Stack: React.FC<StackProps>;
