import React from 'react';
import { ViewProps } from 'react-native';
export interface PickerItem {
    title: string;
    subtitle?: string;
    value: string;
}
export interface PickerProps extends ViewProps {
    items?: PickerItem[];
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    height?: number;
    itemHeight?: number;
}
export declare const Picker: React.NamedExoticComponent<PickerProps>;
