import React from 'react';
import { TextInputProps } from 'react-native';
import { TextPadding } from '../core/layout';
export interface InputProps extends TextInputProps {
    textPadding?: TextPadding;
}
export declare const Input: React.FC<InputProps>;
