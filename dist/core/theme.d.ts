import React from 'react';
import { TextStyle } from 'react-native';
export declare type Brightness = 'light' | 'dark';
export interface Sizes {
    spacing: number;
    borderRadius: number;
}
export interface Colors {
    white: string;
    black: string;
    primary: string;
    background: {
        primary: string;
        secondary: string;
        fill: string;
        modalBarrier: string;
    };
    text: {
        primary: string;
        primaryUnselected: string;
        secondary: string;
        secondaryUnselected: string;
        placeholder: string;
    };
}
export interface TextStyles {
    default: TextStyle;
    body: TextStyle;
    button: TextStyle;
    small: TextStyle;
    tab: TextStyle;
    picker: {
        title: TextStyle;
        subtitle: TextStyle;
    };
}
export interface Theme {
    brightness: Brightness;
    sizes: Sizes;
    colors: Colors;
    textStyles: TextStyles;
}
export declare const useTheme: () => Theme;
export interface ThemeProviderProps {
    theme?: Theme;
    darkTheme?: Theme;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
