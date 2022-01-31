/// <reference types="react" />
import { StyleProp, ViewStyle } from 'react-native';
export declare type ModalTransition = 'fade' | 'slide' | 'scale';
export declare type ModalSlideTo = 'top' | 'bottom' | 'left' | 'right';
export interface ModalStateProps {
    visible: boolean;
    onDismiss?: () => void;
    onUnmounted?: () => void;
}
export interface ModalProps extends ModalStateProps {
    zIndex?: number;
    dismissible?: boolean;
    backdrop?: boolean;
    transition?: ModalTransition;
    to?: ModalSlideTo;
    duration?: number;
    style?: StyleProp<ViewStyle>;
    useNativeDriver?: boolean;
}
export declare const Modal: React.FC<ModalProps>;
