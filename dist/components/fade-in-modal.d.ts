/// <reference types="react" />
import { ViewStyle } from 'react-native';
export interface FadeInModalProps {
    visible: boolean;
    dismissible?: boolean;
    duration?: number;
    style?: ViewStyle;
    useNativeDriver?: boolean;
    onDismiss?: () => void;
}
declare const FadeInModal: React.FC<FadeInModalProps>;
export default FadeInModal;
