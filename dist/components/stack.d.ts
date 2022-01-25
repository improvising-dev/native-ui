/// <reference types="react" />
import { FlexStyle } from 'react-native';
export interface StackProps {
    direction?: FlexStyle['flexDirection'];
    align?: FlexStyle['alignItems'];
    justify?: FlexStyle['justifyContent'];
    spacing?: number;
    children: React.ReactNode[];
}
export declare const Stack: React.FC<StackProps>;
