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
        titleTextStyle: TextStyle;
        subtitleTextStyle: TextStyle;
    };
    activityIndicator: {
        size: number;
        count: number;
        color: string;
    };
    checkbox: {
        size: number;
    };
    dialog: {
        zIndex: number;
        titleTextStyle: TextStyle;
        messageTextStyle: TextStyle;
    };
    fullscreenLoading: {
        zIndex: number;
    };
    picker: {
        itemHeight: number;
        titleTextStyle: TextStyle;
        subtitleTextStyle: TextStyle;
    };
    toast: {
        zIndex: number;
        variants: {
            info: {
                backgroundColor: string;
                textColor: string;
            };
            success: {
                backgroundColor: string;
                textColor: string;
            };
            error: {
                backgroundColor: string;
                textColor: string;
            };
        };
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
        destructive: string;
        destructiveSecondary: string;
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
