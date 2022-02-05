import React from 'react';
import { ViewProps } from 'react-native';
export interface CardProps extends ViewProps {
    haptic?: boolean;
    onPress?: () => void;
    onLongPress?: () => void;
}
export declare const Card: React.FC<CardProps>;
