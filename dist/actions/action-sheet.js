import React from 'react';
import { ActionSheet } from '../components/action-sheet';
import { showModal } from './modal';
export const showActionSheet = (items, { header } = {}) => {
    const { dispose } = showModal({
        builder: ({ visible, handleDismiss }) => (<ActionSheet header={header} items={items} visible={visible} onDismiss={handleDismiss} onUnmounted={() => dispose()}/>),
    });
};
