import React from 'react';
import { ViewProps, ViewStyle } from 'react-native';
export interface PickerItem {
    title: string;
    subtitle?: string;
    value: string;
}
export interface PickerProps extends ViewProps {
    style?: ViewStyle;
    items?: PickerItem[];
    selectedValue?: string;
    onValueChange?: (value: string) => void;
    height?: number;
    itemHeight?: number;
}
export declare const Picker: React.FC<PickerProps>;
