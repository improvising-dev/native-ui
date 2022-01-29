import React from 'react';
import { TextStyle } from 'react-native';
export declare type Brightness = 'light' | 'dark';
export interface TextTheme {
    default: TextStyle;
    body: TextStyle;
    button: TextStyle;
    small: TextStyle;
}
export interface ComponentTheme {
    actionSheet: {
        zIndex: number;
        itemHeight: number;
    };
    checkbox: {
        size: number;
    };
    dialog: {
        zIndex: number;
    };
    fullscreenLoading: {
        zIndex: number;
    };
    picker: {
        titleTextStyle: TextStyle;
        subtitleTextStyle: TextStyle;
    };
}
export interface Theme {
    brightness: Brightness;
    spacing: number;
    borderRadius: number;
    white: string;
    black: string;
    primaryColor: string;
    primaryContrastingColor: string;
    backgroundColor: {
        primary: string;
        secondary: string;
        fill: string;
        modalBarrier: string;
    };
    textColor: {
        primary: string;
        primaryUnselected: string;
        secondary: string;
        secondaryUnselected: string;
        placeholder: string;
    };
    textTheme: TextTheme;
    componentTheme: ComponentTheme;
}
export declare const useTheme: () => Theme;
export interface ThemeProviderProps {
    theme?: Theme;
    darkTheme?: Theme;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
