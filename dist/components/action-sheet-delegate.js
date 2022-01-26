"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionSheetDelegate = void 0;
var react_1 = require("react");
var event_1 = require("../core/event");
var action_sheet_1 = require("./action-sheet");
exports.ActionSheetDelegate = (0, react_1.memo)(function () {
    var _a = (0, react_1.useState)(false), visible = _a[0], setVisible = _a[1];
    var _b = (0, react_1.useState)([]), items = _b[0], setItems = _b[1];
    (0, react_1.useEffect)(function () {
        event_1.globalEvent.on('ActionSheet.showActionSheet', function (event) {
            setItems(event.data);
            setVisible(true);
        });
        return function () {
            event_1.globalEvent.off('ActionSheet.showActionSheet');
        };
    }, []);
    return (<action_sheet_1.ActionSheet items={items} visible={visible} onDismiss={function () { return setVisible(false); }}/>);
});
//# sourceMappingURL=action-sheet-delegate.js.map