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
    var disposeModal = (0, modal_1.showModal)(<action_sheet_1.ActionSheet items={items} onDismiss={function () { return disposeModal(); }}/>);
};
exports.showActionSheet = showActionSheet;
//# sourceMappingURL=action-sheet.js.map