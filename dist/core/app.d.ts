import React from 'react';
import { Route } from './router';
import { Theme, ThemeProviderProps } from './theme';
export interface AppContext {
    appIsReady: boolean;
}
export declare const useApp: () => AppContext;
export interface AppProviderProps extends ThemeProviderProps, RouterRendererProps {
    loadAsync?: () => Promise<void>;
    onReady?: () => void;
}
export interface RouterRendererProps {
    initialRouteName?: string;
    routes?: Route[] | ((theme: Theme) => Route[]);
}
export declare const AppProvider: React.FC<AppProviderProps>;
