import React from 'react';
import { ModalStateProps } from './modal';
interface FullscreenLoadingMethods {
    setMessage: (value?: string) => void;
}
export declare class FullscreenLoadingController {
    private methods?;
    mount(methods: FullscreenLoadingMethods): void;
    unmount(): void;
    setMessage(message?: string): void;
}
export interface FullscreenLoadingProps extends ModalStateProps {
    controller?: FullscreenLoadingController;
}
export declare const FullscreenLoading: React.FC<FullscreenLoadingProps>;
export {};
