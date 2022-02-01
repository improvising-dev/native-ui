import React, { createRef } from 'react';
import { ModalController, } from '../components/modal-controller';
import { ModalService } from '../core/modal';
export const showModal = ({ duration, builder, }) => {
    const controllerRef = createRef();
    const dispose = ModalService.create(<ModalController ref={controllerRef} duration={duration}>
      {builder}
    </ModalController>);
    return {
        dispose,
        handleDismiss: () => { var _a; return (_a = controllerRef.current) === null || _a === void 0 ? void 0 : _a.handleDismiss(); },
    };
};
