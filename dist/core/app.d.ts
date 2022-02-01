import React from 'react';
import { Route, RouteParamList } from './router';
import { Theme, ThemeProviderProps } from './theme';
export interface AppProviderProps extends ThemeProviderProps, RouterRendererProps {
    loadAsync?: () => Promise<void>;
    onReady?: () => void;
}
export interface RouterRendererProps {
    initialRouteName?: keyof RouteParamList;
    routes?: Route[] | ((theme: Theme) => Route[]);
}
export declare const AppProvider: React.FC<AppProviderProps>;
