/// <reference types="react" />
import { ImageStyle, StyleProp } from 'react-native';
import { ImageProps } from './image';
export interface ImageBackgroundProps extends ImageProps {
    imageStyle?: StyleProp<ImageStyle>;
}
export declare const ImageBackground: import("react").NamedExoticComponent<ImageBackgroundProps>;
