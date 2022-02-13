/// <reference types="react" />
import { ModalTransition } from '../components/modal';
import { ModalBuilderParams } from '../components/modal-toggler';
export declare const showModal: ({ transition, transitionDuration, builder, }: {
    transition?: ModalTransition | undefined;
    transitionDuration?: number | undefined;
    builder: (params: ModalBuilderParams) => JSX.Element;
}) => {
    dispose: () => void;
    handleDismiss: () => void | undefined;
};
