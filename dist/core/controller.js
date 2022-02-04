import { useEffect } from 'react';
export class BaseController {
    mount(methods) {
        this.methods = methods;
    }
    unmount() {
        delete this.methods;
    }
}
export const useMountController = ({ controller, methods, }) => {
    useEffect(() => {
        controller === null || controller === void 0 ? void 0 : controller.mount(methods);
        return () => {
            controller === null || controller === void 0 ? void 0 : controller.unmount();
        };
    }, []);
};
