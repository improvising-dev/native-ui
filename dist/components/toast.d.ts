import React from 'react';
import { ModalStateProps } from './modal';
export declare type ToastVariant = 'info' | 'success' | 'error';
export interface ToastProps extends ModalStateProps {
    variant?: ToastVariant;
    title?: string;
    message?: string;
    duration?: number;
    onPress?: () => void;
}
export declare const Toast: React.NamedExoticComponent<ToastProps>;
