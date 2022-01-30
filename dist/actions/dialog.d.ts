import { ModalStateProps } from '../components/modal';
import { AlertDialogProps, ConfirmDialogProps, PromptDialogProps } from '../components/dialog';
export declare type AlertOptions = Omit<AlertDialogProps, keyof ModalStateProps>;
export declare type ConfirmOptions = Omit<ConfirmDialogProps, keyof ModalStateProps>;
export declare type PromptOptions = Omit<PromptDialogProps, keyof ModalStateProps>;
export declare const showAlert: (options: AlertOptions) => Promise<void>;
export declare const showConfirm: (options: ConfirmOptions) => Promise<boolean>;
export declare const showPrompt: (options: PromptOptions) => Promise<string | undefined>;
