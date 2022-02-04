import React from 'react';
import { AlertDialog, ConfirmDialog, PromptDialog, } from '../components/dialog';
import { showModal } from './modal';
export const showAlert = (options) => {
    return new Promise(resolve => {
        const { dispose } = showModal({
            builder: ({ visible, handleDismiss }) => (<AlertDialog visible={visible} onDismiss={handleDismiss} onDisappered={() => resolve(dispose())} {...options}/>),
        });
    });
};
export const showConfirm = (options) => {
    return new Promise(resolve => {
        let value;
        const { dispose } = showModal({
            builder: ({ visible, handleDismiss }) => (<ConfirmDialog visible={visible} onDismiss={result => {
                    value = result;
                    handleDismiss();
                }} onDisappered={() => {
                    dispose();
                    resolve(value);
                }} {...options}/>),
        });
    });
};
export const showPrompt = (options) => {
    return new Promise(resolve => {
        let value;
        const { dispose } = showModal({
            builder: ({ visible, handleDismiss }) => (<PromptDialog visible={visible} onDismiss={result => {
                    value = result;
                    handleDismiss();
                }} onDisappered={() => {
                    dispose();
                    resolve(value);
                }} {...options}/>),
        });
    });
};
