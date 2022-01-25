import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';
export declare const navigationRef: import("@react-navigation/native").NavigationContainerRefWithCurrent<ParamListBase>;
export declare class Router {
    static push(name: string, params?: any): void;
    static replace(name: string, params?: any): void;
    static reset(name: string, params?: any): void;
    static pop(): void;
}
export interface Route {
    name: string;
    component: React.ComponentType;
    options?: NativeStackNavigationOptions;
}
export interface RouterViewProps {
    initialRouteName?: string;
    routes?: Route[];
}
export declare const RouterView: React.FC<RouterViewProps>;
