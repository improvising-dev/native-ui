class ModalServiceStatic {
    mount(context) {
        this.context = context;
    }
    unmount() {
        delete this.context;
    }
    create(node) {
        var _a;
        const id = Math.random().toString(36).slice(2, 5);
        if (!this.context) {
            throw new Error('ModalContext is not mounted');
        }
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.set(id, node);
        return () => { var _a; return (_a = this.context) === null || _a === void 0 ? void 0 : _a.delete(id); };
    }
}
export const ModalService = new ModalServiceStatic();
