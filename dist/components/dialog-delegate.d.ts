import React from 'react';
import { AlertDialogProps, ConfirmDialogProps, PromptDialogProps } from './dialog';
declare type MakeOptions<T> = Omit<T, 'visible' | 'onDismiss'>;
export declare type AlertDialogOptions = MakeOptions<AlertDialogProps>;
export declare type ConfirmDialogOptions = MakeOptions<ConfirmDialogProps>;
export declare type PromptDialogOptions = MakeOptions<PromptDialogProps>;
export declare const DialogDelegate: React.FC;
export {};
