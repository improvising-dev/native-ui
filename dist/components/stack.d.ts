import React from 'react';
import { FlexStyle, ViewProps } from 'react-native';
export interface StackProps extends ViewProps {
    direction?: FlexStyle['flexDirection'];
    align?: FlexStyle['alignItems'];
    justify?: FlexStyle['justifyContent'];
    spacing?: number;
}
export declare const Stack: React.FC<StackProps>;
