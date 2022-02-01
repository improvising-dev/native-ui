import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from '../core/theme';
import { Modal } from './modal';
export const FullscreenLoading = ({ visible, duration, onBackdropPressed, onDismiss, onUnmounted, }) => {
    const theme = useTheme();
    return (<Modal zIndex={theme.componentTheme.fullscreenLoading.zIndex} dismissible={false} visible={visible} duration={duration} onBackdropPressed={onBackdropPressed} onDismiss={onDismiss} onUnmounted={onUnmounted} style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
      <ActivityIndicator color={theme.white}/>
    </Modal>);
};
