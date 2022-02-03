import React from 'react';
import { ViewProps } from 'react-native';
export interface PageProps extends ViewProps {
    scrollable?: boolean;
    keyboardAvoiding?: boolean;
}
export declare const Page: React.FC<PageProps>;
