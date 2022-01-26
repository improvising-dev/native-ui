"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showActionSheet = void 0;
var event_1 = require("../core/event");
var showActionSheet = function (items) {
    event_1.globalEvent.fire('ActionSheet.showActionSheet', items);
};
exports.showActionSheet = showActionSheet;
//# sourceMappingURL=action-sheet.js.map