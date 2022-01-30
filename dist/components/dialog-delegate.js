"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogDelegate = void 0;
var react_1 = __importStar(require("react"));
var event_1 = require("../core/event");
var dialog_1 = require("./dialog");
var AlertDialogDelegate = (0, react_1.memo)(function () {
    var _a = (0, react_1.useState)(false), visible = _a[0], setVisible = _a[1];
    var _b = (0, react_1.useState)({}), options = _b[0], setOptions = _b[1];
    var callbackRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        event_1.globalEvent.on('Dialog.showAlert', function (event) {
            var _a = event.data, options = _a.options, callback = _a.callback;
            callbackRef.current = callback;
            setOptions(options);
            setVisible(true);
        });
        return function () {
            event_1.globalEvent.off('Dialog.showAlert');
        };
    }, []);
    return (<dialog_1.AlertDialog visible={visible} onDismiss={function () {
            var _a;
            setVisible(false);
            (_a = callbackRef.current) === null || _a === void 0 ? void 0 : _a.call(callbackRef);
        }} {...options}/>);
});
var ConfirmDialogDelegate = (0, react_1.memo)(function () {
    var _a = (0, react_1.useState)(false), visible = _a[0], setVisible = _a[1];
    var _b = (0, react_1.useState)({}), options = _b[0], setOptions = _b[1];
    var callbackRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        event_1.globalEvent.on('Dialog.showConfirm', function (event) {
            var _a = event.data, options = _a.options, callback = _a.callback;
            callbackRef.current = callback;
            setOptions(options);
            setVisible(true);
        });
        return function () {
            event_1.globalEvent.off('Dialog.showConfirm');
        };
    }, []);
    return (<dialog_1.ConfirmDialog visible={visible} onDismiss={function (result) {
            var _a;
            setVisible(false);
            (_a = callbackRef.current) === null || _a === void 0 ? void 0 : _a.call(callbackRef, result);
        }} {...options}/>);
});
var PromptDialogDelegate = (0, react_1.memo)(function () {
    var _a = (0, react_1.useState)(false), visible = _a[0], setVisible = _a[1];
    var _b = (0, react_1.useState)({}), options = _b[0], setOptions = _b[1];
    var callbackRef = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        event_1.globalEvent.on('Dialog.showPrompt', function (event) {
            var _a = event.data, options = _a.options, callback = _a.callback;
            callbackRef.current = callback;
            setOptions(options);
            setVisible(true);
        });
        return function () {
            event_1.globalEvent.off('Dialog.showPrompt');
        };
    }, []);
    return (<dialog_1.PromptDialog visible={visible} onDismiss={function (result) {
            var _a;
            setVisible(false);
            (_a = callbackRef.current) === null || _a === void 0 ? void 0 : _a.call(callbackRef, result);
        }} {...options}/>);
});
var DialogDelegate = function () {
    return (<>
      <AlertDialogDelegate />
      <ConfirmDialogDelegate />
      <PromptDialogDelegate />
    </>);
};
exports.DialogDelegate = DialogDelegate;
//# sourceMappingURL=dialog-delegate.js.map