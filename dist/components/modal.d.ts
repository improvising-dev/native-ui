/// <reference types="react" />
import { ViewStyle } from 'react-native';
export interface ModalStateProps {
    visible: boolean;
    onDismiss?: () => void;
    onUnmounted?: () => void;
}
export interface ModalProps extends ModalStateProps {
    dismissible?: boolean;
    zIndex?: number;
    transition?: 'fade' | 'slide';
    to?: 'top' | 'bottom' | 'left' | 'right';
    duration?: number;
    style?: ViewStyle;
    useNativeDriver?: boolean;
}
export declare const Modal: React.FC<ModalProps>;
