import React from 'react';
import { FullscreenLoadingController } from '../controllers/fullscreen-loading';
import { ModalStateProps } from './modal';
export interface FullscreenLoadingProps extends ModalStateProps {
    controller?: FullscreenLoadingController;
    message?: string;
}
export declare const FullscreenLoading: React.NamedExoticComponent<FullscreenLoadingProps>;
