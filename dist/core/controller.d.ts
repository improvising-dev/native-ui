export declare class BaseController<T> {
    protected methods?: T;
    mount(methods: T): void;
    unmount(): void;
}
export declare const useMountController: <T>({ controller, methods, }: {
    controller?: BaseController<T> | undefined;
    methods: T;
}) => void;
