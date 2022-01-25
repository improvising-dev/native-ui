import React from 'react';
import { ViewStyle } from 'react-native';
export interface VisibilityProps {
    visible: boolean;
    children?: any;
    duration?: number;
    style?: ViewStyle;
    useNativeDriver?: boolean;
}
declare const Visibility: React.FC<VisibilityProps>;
export default Visibility;
