import React from 'react';
export interface ConstraintsContext {
    maxWidth: number;
    maxHeight: number;
}
export declare const useConstraints: () => ConstraintsContext;
export interface ConstraintsProviderProps {
    maxWidth?: number;
    maxHeight?: number;
}
export declare const ConstraintsProvider: React.FC<ConstraintsProviderProps>;
