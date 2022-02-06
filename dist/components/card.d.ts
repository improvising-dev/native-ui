import React from 'react';
import { View, ViewProps } from 'react-native';
export interface Card extends View {
}
export interface CardProps extends ViewProps {
    haptic?: boolean;
    onPress?: () => void;
    onLongPress?: () => void;
}
export declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<Card>>;
