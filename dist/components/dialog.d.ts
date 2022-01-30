/// <reference types="react" />
export interface DialogProps {
    onDismiss?: () => void;
}
export declare const Dialog: React.FC<DialogProps>;
export interface AlertDialogProps {
    title: string;
    message: string;
    okButtonText?: string;
    onDismiss?: () => void;
}
export declare const AlertDialog: React.FC<AlertDialogProps>;
export interface ConfirmDialogProps {
    title: string;
    message: string;
    cancelButtonText?: string;
    confirmButtonText?: string;
    onDismiss?: (result: boolean) => void;
}
export declare const ConfirmDialog: React.FC<ConfirmDialogProps>;
export interface PromptDialogProps {
    title: string;
    message?: string;
    cancelButtonText?: string;
    confirmButtonText?: string;
    placeholder?: string;
    initialValue?: string;
    onDismiss?: (result?: string) => void;
}
export declare const PromptDialog: React.FC<PromptDialogProps>;
