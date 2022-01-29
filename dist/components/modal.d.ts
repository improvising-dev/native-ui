/// <reference types="react" />
import { ViewStyle } from 'react-native';
export interface ModalProps {
    visible: boolean;
    dismissible?: boolean;
    zIndex?: number;
    transition?: 'fade' | 'slide';
    to?: 'top' | 'bottom' | 'left' | 'right';
    duration?: number;
    style?: ViewStyle;
    useNativeDriver?: boolean;
    onDismiss?: () => void;
}
export declare const Modal: React.FC<ModalProps>;
