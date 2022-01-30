"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showModal = void 0;
var modal_1 = require("../core/modal");
var showModal = function (node) {
    return modal_1.ModalService.create(node);
};
exports.showModal = showModal;
//# sourceMappingURL=modal.js.map