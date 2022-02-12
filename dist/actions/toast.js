import React from 'react';
import { Toast } from '../components/toast';
import { showModal } from './modal';
export const showToast = ({ title, message, duration, onPress, }) => {
    const { dispose } = showModal({
        builder: ({ visible, handleDismiss }) => (<Toast title={title} message={message} duration={duration} visible={visible} onDismiss={handleDismiss} onUnmounted={() => dispose()} onPress={onPress}/>),
    });
};
