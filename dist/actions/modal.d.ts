/// <reference types="react" />
import { ModalTransition } from '../components/modal';
import { ModalBuilderParams } from '../components/modal-toggler';
import { ModalService } from '../core/modal';
export declare const showModal: ({ modalService, transition, transitionDuration, builder, }: {
    modalService?: ModalService | undefined;
    transition?: ModalTransition | undefined;
    transitionDuration?: number | undefined;
    builder: (params: ModalBuilderParams) => JSX.Element;
}) => {
    dispose: () => void;
    handleDismiss: () => void | undefined;
};
