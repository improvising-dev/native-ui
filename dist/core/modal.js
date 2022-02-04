const generateId = () => {
    return Math.random().toString(36).slice(2, 5);
};
class ModalServiceStatic {
    constructor() {
        this.ids = new Set();
    }
    mount(context) {
        this.context = context;
    }
    unmount() {
        delete this.context;
    }
    create(node) {
        var _a;
        let id = generateId();
        while (this.ids.has(id)) {
            id = generateId();
        }
        if (!this.context) {
            throw new Error('ModalContext is not mounted');
        }
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.set(id, node);
        this.ids.add(id);
        return () => {
            var _a;
            (_a = this.context) === null || _a === void 0 ? void 0 : _a.delete(id);
            this.ids.delete(id);
        };
    }
}
export const ModalService = new ModalServiceStatic();
