"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showActionSheet = void 0;
var react_1 = __importDefault(require("react"));
var action_sheet_1 = require("../components/action-sheet");
var modal_1 = require("./modal");
var showActionSheet = function (items) {
    var dispose = (0, modal_1.showModal)({
        builder: function (_a) {
            var visible = _a.visible, handleDismiss = _a.handleDismiss;
            return (<action_sheet_1.ActionSheet items={items} visible={visible} onDismiss={handleDismiss} onUnmounted={function () { return dispose(); }}/>);
        },
    }).dispose;
};
exports.showActionSheet = showActionSheet;
//# sourceMappingURL=action-sheet.js.map