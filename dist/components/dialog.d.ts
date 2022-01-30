/// <reference types="react" />
import { ModalStateProps } from './modal';
export interface DialogProps extends ModalStateProps {
}
export declare const Dialog: React.FC<DialogProps>;
export interface AlertDialogProps extends DialogProps {
    title: string;
    message: string;
    okButtonText?: string;
}
export declare const AlertDialog: React.FC<AlertDialogProps>;
export interface ConfirmDialogProps extends Omit<DialogProps, 'onDismiss'> {
    title: string;
    message: string;
    cancelButtonText?: string;
    confirmButtonText?: string;
    onDismiss?: (result: boolean) => void;
}
export declare const ConfirmDialog: React.FC<ConfirmDialogProps>;
export interface PromptDialogProps extends Omit<DialogProps, 'onDismiss'> {
    title: string;
    message?: string;
    cancelButtonText?: string;
    confirmButtonText?: string;
    placeholder?: string;
    initialValue?: string;
    onDismiss?: (result?: string) => void;
}
export declare const PromptDialog: React.FC<PromptDialogProps>;
