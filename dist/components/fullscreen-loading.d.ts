import React from 'react';
import { BaseController } from '../core/controller';
import { ModalStateProps } from './modal';
interface FullscreenLoadingMethods {
    setMessage: (value?: string) => void;
}
export declare class FullscreenLoadingController extends BaseController<FullscreenLoadingMethods> {
    setMessage(message?: string): void;
}
export interface FullscreenLoadingProps extends ModalStateProps {
    controller?: FullscreenLoadingController;
}
export declare const FullscreenLoading: React.FC<FullscreenLoadingProps>;
export {};
