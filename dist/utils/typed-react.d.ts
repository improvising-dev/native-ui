import React from 'react';
export declare const typedMemo: <T>(component: T) => T;
export declare const typedForwardRef: <T, P = {}>(render: (props: P, ref: React.ForwardedRef<T>) => React.ReactElement | null) => (props: P & React.RefAttributes<T>) => React.ReactElement | null;
