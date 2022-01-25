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
declare const FadeInUpModal: React.FC<FadeInUpModalProps>;
export default FadeInUpModal;
