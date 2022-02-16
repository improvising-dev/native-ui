import React from 'react';
export interface AppLoadingProps {
    splashScreen?: React.ReactNode;
    loadAsync: () => Promise<void>;
    onReady?: () => void;
    onError?: (reason: any) => void;
}
export declare const AppLoading: React.FC<AppLoadingProps>;
