import React from 'react';
import { ViewProps } from 'react-native';
export interface CardProps extends ViewProps {
    haptic?: boolean;
    onPressed?: () => void;
}
export declare const Card: React.FC<CardProps>;
