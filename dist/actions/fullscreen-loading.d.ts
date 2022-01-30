export declare const showLoading: () => () => void | undefined;
export declare const handleLoading: <T>(cb: () => T | Promise<T>) => Promise<T>;
