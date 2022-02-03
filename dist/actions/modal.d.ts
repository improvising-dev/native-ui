import React from 'react';
import { ModalTransition } from '../components/modal';
import { ModalBuilderParams } from '../components/modal-toggler';
export declare const showModal: ({ transition, transitionDuration, builder, }: {
    transition?: ModalTransition | undefined;
    transitionDuration?: number | undefined;
    builder: (params: ModalBuilderParams) => React.ReactNode;
}) => {
    dispose: () => void | undefined;
    handleDismiss: () => void | undefined;
};
