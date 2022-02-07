import React from 'react';
import { Modal } from './modal';
export const Toast = ({ visible, transitionDuration, onDismiss, onUnmounted, }) => {
    return (<Modal visible={visible} transitionDuration={transitionDuration} backdrop={false} onDismiss={onDismiss} onUnmounted={onUnmounted}></Modal>);
};
