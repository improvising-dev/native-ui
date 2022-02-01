import { NativeStackNavigationOptions, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
export interface RouteParamList {
}
export declare const navigationRef: import("@react-navigation/native").NavigationContainerRefWithCurrent<RouteParamList>;
export declare class Router {
    static push(name: string, params?: any): void;
    static replace(name: string, params?: any): void;
    static reset(name: string, params?: any): void;
    static pop(): void;
}
export declare type RouteProps<T extends keyof RouteParamList> = NativeStackScreenProps<T>;
export interface Route {
    name: keyof RouteParamList;
    component: React.ComponentType;
    options?: NativeStackNavigationOptions;
}
export interface RouterViewProps {
    initialRouteName?: keyof RouteParamList;
    routes?: Route[];
}
export declare const RouterView: React.FC<RouterViewProps>;
