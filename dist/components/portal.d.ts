import React from 'react';
import { ViewStyle } from 'react-native';
export interface PortalProviderProps {
    children: React.ReactNode;
    style?: ViewStyle;
}
export declare const PortalProvider: React.FC<PortalProviderProps>;
export declare const Portal: React.FC;
