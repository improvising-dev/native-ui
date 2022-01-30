import React from 'react';
export interface ModalContext {
    set: (id: string, node: React.ReactNode) => void;
    delete: (id: string) => void;
}
export declare const modalContext: React.Context<ModalContext>;
export declare const ModalProvider: React.FC;
