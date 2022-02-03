import React, { useEffect, useImperativeHandle, useState } from 'react';
export const ModalToggler = React.forwardRef(({ transitionDuration = 400, children }, ref) => {
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
    return (<>
      {children({
            visible,
            transitionDuration,
            handleDismiss,
        })}
    </>);
});
