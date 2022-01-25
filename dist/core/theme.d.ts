import React from 'react';
import { TextStyle } from 'react-native';
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
    };
    text: {
        primary: string;
        secondary: string;
        placeholder: string;
        unselected: string;
    };
}
export interface TextStyles {
    default: TextStyle;
    body: TextStyle;
    button: TextStyle;
    small: TextStyle;
    tab: TextStyle;
}
export interface Theme {
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
