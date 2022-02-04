import { BaseController } from '../core/controller';
interface FullscreenLoadingMethods {
    setMessage: (value?: string) => void;
}
export declare class FullscreenLoadingController extends BaseController<FullscreenLoadingMethods> {
    setMessage(message?: string): void;
}
export {};
