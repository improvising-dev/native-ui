"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalService = void 0;
var ModalServiceStatic = /** @class */ (function () {
    function ModalServiceStatic() {
    }
    ModalServiceStatic.prototype.mount = function (context) {
        this.context = context;
    };
    ModalServiceStatic.prototype.unmount = function () {
        delete this.context;
    };
    ModalServiceStatic.prototype.create = function (node) {
        var _this = this;
        var _a;
        var id = Math.random().toString(36).slice(2, 5);
        if (!this.context) {
            throw new Error('ModalContext is not mounted');
        }
        (_a = this.context) === null || _a === void 0 ? void 0 : _a.set(id, node);
        return function () { var _a; return (_a = _this.context) === null || _a === void 0 ? void 0 : _a.delete(id); };
    };
    return ModalServiceStatic;
}());
exports.ModalService = new ModalServiceStatic();
//# sourceMappingURL=modal.js.map