import React from 'react';
import { ControlledModalRef } from './modal';
export interface FullscreenLoadingProps {
    ref?: React.Ref<ControlledModalRef>;
    onDismiss?: () => void;
}
export declare const FullscreenLoading: React.FC<FullscreenLoadingProps>;
