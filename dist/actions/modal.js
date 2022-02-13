import React, { createRef } from 'react';
import { ModalToggler, } from '../components/modal-toggler';
import { ModalService } from '../core/modal';
export const showModal = ({ transition, transitionDuration, builder, }) => {
    const togglerRef = createRef();
    const dispose = ModalService.create(<ModalToggler ref={togglerRef} transition={transition} transitionDuration={transitionDuration} builder={builder}/>);
    return {
        dispose,
        handleDismiss: () => { var _a; return (_a = togglerRef.current) === null || _a === void 0 ? void 0 : _a.handleDismiss(); },
    };
};
