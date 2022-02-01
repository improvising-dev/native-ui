class ModalServiceStatic {
    context;
    mount(context) {
        this.context = context;
    }
    unmount() {
        delete this.context;
    }
    create(node) {
        const id = Math.random().toString(36).slice(2, 5);
        if (!this.context) {
            throw new Error('ModalContext is not mounted');
        }
        this.context?.set(id, node);
        return () => this.context?.delete(id);
    }
}
export const ModalService = new ModalServiceStatic();
