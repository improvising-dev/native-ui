import { AlertDialogOptions, ConfirmDialogOptions, PromptDialogOptions } from '../components/dialog-delegate';
export declare const showAlert: (options: AlertDialogOptions) => Promise<void>;
export declare const showConfirm: (options: ConfirmDialogOptions) => Promise<boolean>;
export declare const showPrompt: (options: PromptDialogOptions) => Promise<string | undefined>;
