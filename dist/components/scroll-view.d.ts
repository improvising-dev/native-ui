import React from 'react';
import { ScrollView as RNScrollView, ScrollViewProps as RNScrollViewProps } from 'react-native';
export interface ScrollView extends RNScrollView {
}
export interface ScrollViewProps extends RNScrollViewProps {
    keyboardAvoiding?: boolean;
    keyboardAvoidingDuration?: number;
    bottomInset?: number;
}
export declare const ScrollView: React.ForwardRefExoticComponent<ScrollViewProps & React.RefAttributes<ScrollView>>;
