import React, { createRef } from 'react';
import { ModalToggler, } from '../components/modal-toggler';
import { getCurrentModalService, globalModalService } from '../core/modal';
export const showModal = ({ global = false, transition, transitionDuration, builder, }) => {
    const togglerRef = createRef();
    const modalService = global ? globalModalService : getCurrentModalService();
    const dispose = modalService.create(<ModalToggler ref={togglerRef} transition={transition} transitionDuration={transitionDuration} builder={builder}/>);
    return {
        dispose,
        handleDismiss: () => { var _a; return (_a = togglerRef.current) === null || _a === void 0 ? void 0 : _a.handleDismiss(); },
    };
};
