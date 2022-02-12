import React from 'react';
import { ModalStateProps } from './modal';
export interface ToastProps extends ModalStateProps {
    title?: string;
    message?: string;
}
export declare const Toast: React.FC<ToastProps>;
