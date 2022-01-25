/// <reference types="react" />
import { ViewStyle } from 'react-native';
export interface FadeInUpModalProps {
    visible: boolean;
    dismissible?: boolean;
    duration?: number;
    style?: ViewStyle;
    useNativeDriver?: boolean;
    onDismiss?: () => void;
}
export declare const FadeInUpModal: React.FC<FadeInUpModalProps>;
