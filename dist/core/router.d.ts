import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationOptions, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
export interface RouteParamList extends ParamListBase {
}
export declare type RouteName = Extract<keyof RouteParamList, string>;
export declare type RouteProps<T extends RouteName> = NativeStackScreenProps<RouteParamList, T>;
export declare const navigationRef: import("@react-navigation/native").NavigationContainerRefWithCurrent<RouteParamList>;
export declare class Router {
    static push<T extends RouteName>(name: T, params?: RouteParamList[T]): void;
    static replace<T extends RouteName>(name: RouteName, params?: RouteParamList[T]): void;
    static reset<T extends RouteName>(name: RouteName, params?: RouteParamList[T]): void;
    static pop(): void;
}
export interface Route {
    name: RouteName;
    component: React.ComponentType<any>;
    options?: NativeStackNavigationOptions;
}
export interface RouterDelegteProps {
    initialRouteName?: RouteName;
    routes?: Route[];
}
export declare const RouterDelegate: React.NamedExoticComponent<RouterDelegteProps>;
