import React from 'react';
import { ModalContext } from '../components/modal-context';
declare class ModalServiceStatic {
    context?: ModalContext;
    private ids;
    constructor();
    mount(context: ModalContext): void;
    unmount(): void;
    create(node: React.ReactNode): () => void;
}
export declare const ModalService: ModalServiceStatic;
export {};
