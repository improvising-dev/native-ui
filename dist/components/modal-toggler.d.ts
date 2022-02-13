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
    builder: (params: ModalBuilderParams) => JSX.Element;
}
export declare const ModalToggler: React.MemoExoticComponent<React.ForwardRefExoticComponent<ModalTogglerProps & React.RefAttributes<ModalTogglerRef>>>;
