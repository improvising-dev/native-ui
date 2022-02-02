import React from 'react';
export interface Constraints {
    maxWidth?: number;
    maxHeight?: number;
}
export declare const useConstraints: () => {
    maxWidth: number;
    maxHeight: number;
};
export interface ConstraintsProviderProps {
    maxWidth?: number;
    maxHeight?: number;
}
export declare const ConstraintsProvider: React.FC<ConstraintsProviderProps>;
