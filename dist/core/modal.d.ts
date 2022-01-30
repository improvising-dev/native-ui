import React from 'react';
import { ModalContext } from '../components/modal-context';
declare class ModalServiceStatic {
    context?: ModalContext;
    mount(context: ModalContext): void;
    unmount(): void;
    create(node: React.ReactNode): () => void | undefined;
}
export declare const ModalService: ModalServiceStatic;
export {};
