import React, { useEffect, useImperativeHandle, useState } from 'react';
export const ModalToggler = React.forwardRef(({ duration = 400, children }, ref) => {
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
            duration,
            visible,
            handleDismiss,
        })}
    </>);
});
