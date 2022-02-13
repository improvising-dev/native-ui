import React from 'react';
import { ModalStateProps } from './modal';
export interface ToastProps extends ModalStateProps {
    title?: string;
    message?: string;
    duration?: number;
    onPress?: () => void;
}
export declare const Toast: React.NamedExoticComponent<ToastProps>;
