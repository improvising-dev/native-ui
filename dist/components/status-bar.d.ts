import React from 'react';
import { ColorSchemeName, StatusBarProps as RNStatusBarProps } from 'react-native';
export declare type StatusBarStyle = 'auto' | 'inverted' | 'light' | 'dark';
export interface StatusBarProps {
    style?: StatusBarStyle;
    animated?: boolean;
    translucent?: boolean;
    hidden?: boolean;
    backgroundColor?: string;
}
export declare const resolveStatusBarStyle: (style: StatusBarStyle, colorScheme: ColorSchemeName) => RNStatusBarProps['barStyle'];
export declare const StatusBar: React.FC<StatusBarProps>;
