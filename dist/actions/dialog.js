"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showPrompt = exports.showConfirm = exports.showAlert = void 0;
var event_1 = require("../core/event");
var showAlert = function (options) {
    return new Promise(function (resolve) {
        event_1.globalEvent.fire('Dialog.showAlert', {
            options: options,
            callback: resolve,
        });
    });
};
exports.showAlert = showAlert;
var showConfirm = function (options) {
    return new Promise(function (resolve) {
        event_1.globalEvent.fire('Dialog.showConfirm', {
            options: options,
            callback: resolve,
        });
    });
};
exports.showConfirm = showConfirm;
var showPrompt = function (options) {
    return new Promise(function (resolve) {
        event_1.globalEvent.fire('Dialog.showPrompt', {
            options: options,
            callback: resolve,
        });
    });
};
exports.showPrompt = showPrompt;
//# sourceMappingURL=dialog.js.map