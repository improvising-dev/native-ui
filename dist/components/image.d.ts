import React from 'react';
import { ImageProps as RNImageProps, StyleProp, ViewStyle } from 'react-native';
export interface ImageProps extends RNImageProps {
    containerStyle?: StyleProp<ViewStyle>;
}
export declare const Image: React.NamedExoticComponent<ImageProps>;
