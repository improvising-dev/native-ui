/// <reference types="react" />
import { FlexStyle } from 'react-native';
export interface StackProps {
    direction?: FlexStyle['flexDirection'];
    align?: FlexStyle['alignItems'];
    justify?: FlexStyle['justifyContent'];
    spacing?: number;
    children: React.ReactNode[];
}
declare const Stack: React.FC<StackProps>;
export default Stack;
