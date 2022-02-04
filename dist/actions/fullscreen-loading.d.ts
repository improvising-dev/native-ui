import { FullscreenLoadingController } from '../controllers/fullscreen-loading';
export interface FullscreenLoadingParams {
    controller?: FullscreenLoadingController;
    message?: string;
}
export declare const showLoading: ({ controller, message, }?: FullscreenLoadingParams) => () => void | undefined;
export declare const handleLoading: <T>(cb: () => T | Promise<T>, params?: FullscreenLoadingParams) => Promise<T>;
