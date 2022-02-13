import React, { memo, useEffect, useImperativeHandle, useState } from 'react';
const ModalTogglerComponent = React.forwardRef(({ transition, transitionDuration = 400, builder }, ref) => {
    const [visible, setVisible] = useState(false);
    const handleDismiss = () => {
        setVisible(false);
    };
    useEffect(() => {
        setVisible(true);
    }, []);
    useImperativeHandle(ref, () => {
        return { handleDismiss };
    });
    return builder({
        visible,
        transition,
        transitionDuration,
        handleDismiss,
    });
});
export const ModalToggler = memo(ModalTogglerComponent);
