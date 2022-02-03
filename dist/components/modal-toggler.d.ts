import React from 'react';
import { ModalTransition } from './modal';
export interface ModalBuilderParams {
    visible: boolean;
    transition?: ModalTransition;
    transitionDuration: number;
    handleDismiss: () => void;
}
export interface ModalTogglerRef {
    handleDismiss: () => void;
}
export interface ModalTogglerProps {
    transition?: ModalTransition;
    transitionDuration?: number;
    children: (params: ModalBuilderParams) => React.ReactNode;
}
export declare const ModalToggler: React.ForwardRefExoticComponent<ModalTogglerProps & React.RefAttributes<ModalTogglerRef>>;
