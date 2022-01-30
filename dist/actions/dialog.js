"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showPrompt = exports.showConfirm = exports.showAlert = void 0;
var dialog_1 = require("../components/dialog");
var modal_1 = require("./modal");
var showAlert = function (options) {
    return new Promise(function (resolve) {
        var disposeModal = (0, modal_1.showModal)(<dialog_1.AlertDialog onDismiss={function () {
                disposeModal();
                resolve();
            }} {...options}/>);
    });
};
exports.showAlert = showAlert;
var showConfirm = function (options) {
    return new Promise(function (resolve) {
        var disposeModal = (0, modal_1.showModal)(<dialog_1.ConfirmDialog onDismiss={function (result) {
                disposeModal();
                resolve(result);
            }} {...options}/>);
    });
};
exports.showConfirm = showConfirm;
var showPrompt = function (options) {
    return new Promise(function (resolve) {
        var disposeModal = (0, modal_1.showModal)(<dialog_1.PromptDialog onDismiss={function (result) {
                disposeModal();
                resolve(result);
            }} {...options}/>);
    });
};
exports.showPrompt = showPrompt;
//# sourceMappingURL=dialog.js.map