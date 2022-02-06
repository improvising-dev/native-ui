import React from 'react';
import { Container, ContainerProps } from './container';
export interface Stack extends Container {
}
export interface StackProps extends ContainerProps {
    spacing?: number;
}
export declare const Stack: React.FC<StackProps>;
