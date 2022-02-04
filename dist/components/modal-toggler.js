import React, { useEffect, useImperativeHandle, useMemo, useState } from 'react';
export const ModalToggler = React.forwardRef(({ transition, transitionDuration = 400, children }, ref) => {
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
    const node = useMemo(() => {
        return children({
            visible,
            transition,
            transitionDuration,
            handleDismiss,
        });
    }, [visible]);
    return <>{node}</>;
});
