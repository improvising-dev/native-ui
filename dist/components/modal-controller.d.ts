import React from 'react';
export interface ModalBuilderParams {
    visible: boolean;
    duration: number;
    handleDismiss: () => void;
}
export interface ModalControllerRef {
    handleDismiss: () => void;
}
export interface ModalControllerProps {
    duration?: number;
    children: (params: ModalBuilderParams) => React.ReactNode;
}
export declare const ModalController: React.ForwardRefExoticComponent<ModalControllerProps & React.RefAttributes<ModalControllerRef>>;
