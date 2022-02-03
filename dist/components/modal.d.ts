import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export declare type ModalTransition = 'fade' | 'scale' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';
export interface ModalStateProps {
    visible: boolean;
    transitionDuration?: number;
    onBackdropPressed?: () => void;
    onDismiss?: () => void;
    onUnmounted?: () => void;
}
export interface ModalProps extends ModalStateProps {
    zIndex?: number;
    dismissible?: boolean;
    backdrop?: boolean;
    transition?: ModalTransition;
    style?: StyleProp<ViewStyle>;
    useNativeDriver?: boolean;
}
export declare const Modal: React.FC<ModalProps>;
