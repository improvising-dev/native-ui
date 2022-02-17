import React from 'react';
import { RouteName } from '..';
import { Route } from './router';
import { Theme, ThemeProviderProps } from './theme';
export interface AppProviderProps extends ThemeProviderProps, RouterRendererProps {
    splashScreen?: React.ReactNode;
    loadAsync?: () => Promise<void>;
    onReady?: () => void;
    onError?: (reason: any) => void;
}
export interface RouterRendererProps {
    initialRouteName?: RouteName;
    routes?: Route[] | ((theme: Theme) => Route[]);
}
export declare const AppProvider: React.NamedExoticComponent<AppProviderProps>;
