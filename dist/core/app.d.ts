import React from 'react';
import { RouterViewProps } from './router';
import { ThemeProviderProps } from './theme';
export interface AppContext {
    appIsReady: boolean;
}
export declare const useApp: () => AppContext;
export interface AppProviderProps extends ThemeProviderProps, RouterViewProps {
    loadAsync?: () => Promise<void>;
}
export declare const AppProvider: React.FC<AppProviderProps>;
