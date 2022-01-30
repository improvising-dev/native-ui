import { AlertDialogProps, ConfirmDialogProps, PromptDialogProps } from '../components/dialog';
export declare type AlertOptions = Omit<AlertDialogProps, 'onDismiss'>;
export declare type ConfirmOptions = Omit<ConfirmDialogProps, 'onDismiss'>;
export declare type PromptOptions = Omit<PromptDialogProps, 'onDismiss'>;
export declare const showAlert: (options: AlertOptions) => Promise<void>;
export declare const showConfirm: (options: ConfirmOptions) => Promise<boolean>;
export declare const showPrompt: (options: PromptOptions) => Promise<string | undefined>;
