/// <reference types="react" />
import { ViewStyle } from 'react-native';
export interface SlideInModalProps {
    visible: boolean;
    dismissible?: boolean;
    duration?: number;
    to?: 'top' | 'bottom' | 'left' | 'right';
    style?: ViewStyle;
    useNativeDriver?: boolean;
    onDismiss?: () => void;
}
export declare const SlideInModal: React.FC<SlideInModalProps>;
