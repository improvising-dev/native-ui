import React from 'react';
import { FlexStyle, View, ViewProps } from 'react-native';
export interface Container extends View {
}
export interface ContainerProps extends ViewProps {
    expand?: boolean;
    width?: number;
    height?: number;
    direction?: FlexStyle['flexDirection'];
    align?: FlexStyle['alignItems'];
    justify?: FlexStyle['justifyContent'];
    overflow?: FlexStyle['overflow'];
}
export declare const Container: React.ForwardRefExoticComponent<ContainerProps & React.RefAttributes<Container>>;
