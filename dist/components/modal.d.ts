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
export interface ControlledModalProps extends Omit<ModalProps, 'visible'> {
}
export interface ControlledModalRef {
    dismiss: () => void;
}
export declare const ControlledModal: import("react").ForwardRefExoticComponent<ControlledModalProps & {
    children?: import("react").ReactNode;
} & import("react").RefAttributes<ControlledModalRef>>;
