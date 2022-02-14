import React from 'react';
import { Toast } from '../components/toast';
import { showModal } from './modal';
export const showToast = ({ variant = 'info', title, message, duration, onPress, }) => {
    const { dispose } = showModal({
        transitionDuration: 500,
        builder: ({ visible, transitionDuration, handleDismiss }) => (<Toast variant={variant} title={title} message={message} duration={duration} visible={visible} transitionDuration={transitionDuration} onDismiss={handleDismiss} onUnmounted={() => dispose()} onPress={onPress}/>),
    });
};
