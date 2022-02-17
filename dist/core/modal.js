import React, { useRef } from 'react';
import { ModalProvider } from '../components/modal-context';
export class ModalService {
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
        const id = Date.now().toString();
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
export const createModalService = () => new ModalService();
export const withModal = (Component) => (props) => {
    const modalService = useRef(new ModalService()).current;
    return (<ModalProvider modalService={modalService}>
        <Component {...props}/>
      </ModalProvider>);
};
export const globalModalService = new ModalService();
