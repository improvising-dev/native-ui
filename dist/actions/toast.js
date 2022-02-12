import React from 'react';
import { Toast } from '../components/toast';
import { showModal } from './modal';
export const showToast = ({ title, message, }) => {
    const { dispose } = showModal({
        transitionDuration: 250,
        builder: ({ visible, transitionDuration, handleDismiss }) => (<Toast title={title} message={message} transitionDuration={transitionDuration} visible={visible} onDismiss={handleDismiss} onUnmounted={() => dispose()}/>),
    });
};
