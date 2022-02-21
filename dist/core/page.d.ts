import React from 'react';
import { RouteProps } from './router';
export declare const createPage: <T extends string>(Component: React.ComponentType<any>) => React.ComponentType<RouteProps<T>>;
