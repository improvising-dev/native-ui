import React from 'react';
export interface ModalBuilderParams {
    visible: boolean;
    transitionDuration: number;
    handleDismiss: () => void;
}
export interface ModalTogglerRef {
    handleDismiss: () => void;
}
export interface ModalTogglerProps {
    transitionDuration?: number;
    children: (params: ModalBuilderParams) => React.ReactNode;
}
export declare const ModalToggler: React.ForwardRefExoticComponent<ModalTogglerProps & React.RefAttributes<ModalTogglerRef>>;
