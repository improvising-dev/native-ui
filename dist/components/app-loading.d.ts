import React from 'react';
export interface AppLoadingProps {
    loadAsync: () => Promise<void>;
    onComplete: () => void;
    onError: (reason: any) => void;
}
export declare const AppLoading: React.FC<AppLoadingProps>;
