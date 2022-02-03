import { FullscreenLoadingController } from '../components/fullscreen-loading';
export declare const showLoading: (controller?: FullscreenLoadingController | undefined) => () => void | undefined;
export declare const handleLoading: <T>(cb: () => T | Promise<T>, controller?: FullscreenLoadingController | undefined) => Promise<T>;
