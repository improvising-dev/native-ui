import React from 'react';
import { ModalService } from '../core/modal';
export interface ModalContext {
    set: (id: string, node: React.ReactNode) => void;
    delete: (id: string) => void;
}
export interface ModalProviderProps {
    modalService?: ModalService;
}
export declare const ModalProvider: React.FC<ModalProviderProps>;
