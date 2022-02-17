import React from 'react';
import { ModalContext } from '../components/modal-context';
export declare class ModalService {
    context?: ModalContext;
    private ids;
    constructor();
    mount(context: ModalContext): void;
    unmount(): void;
    create(node: React.ReactNode): () => void;
}
export declare const createModalService: () => ModalService;
export declare const globalModalService: ModalService;
export declare const getCurrentModalService: () => ModalService;
export declare const withModal: <P extends {}>(Component: React.ComponentType<P>) => (props: P) => JSX.Element;
