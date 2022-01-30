import React from 'react';
import { ModalBuilderParams } from '../components/modal-controller';
export declare const showModal: ({ duration, builder, }: {
    duration?: number | undefined;
    builder: (params: ModalBuilderParams) => React.ReactNode;
}) => {
    dispose: () => void | undefined;
    handleDismiss: () => void;
};
