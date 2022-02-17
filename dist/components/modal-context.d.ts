import React from 'react';
import { ModalService } from '../core/modal';
export interface ModalContext {
    modalService: ModalService;
    set: (id: string, node: React.ReactNode) => void;
    delete: (id: string) => void;
}
export declare const useModalContext: () => ModalContext;
export declare const useModalService: () => ModalService;
export interface ModalProviderProps {
    modalService?: ModalService;
}
export declare const ModalProvider: React.FC<ModalProviderProps>;
