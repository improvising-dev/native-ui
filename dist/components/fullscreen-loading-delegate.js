"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullscreenLoadingDelegate = void 0;
var react_1 = require("react");
var event_1 = require("../core/event");
var fullscreen_loading_1 = require("./fullscreen-loading");
exports.FullscreenLoadingDelegate = (0, react_1.memo)(function () {
    var _a = (0, react_1.useState)(false), visible = _a[0], setVisible = _a[1];
    (0, react_1.useEffect)(function () {
        event_1.globalEvent.on('FullscreenLoading.showLoading', function () { return setVisible(true); });
        event_1.globalEvent.on('FullscreenLoading.hideLoading', function () { return setVisible(false); });
        return function () {
            event_1.globalEvent.off('FullscreenLoading.showLoading');
            event_1.globalEvent.off('FullscreenLoading.hideLoading');
        };
    }, []);
    return <fullscreen_loading_1.FullscreenLoading visible={visible}/>;
});
//# sourceMappingURL=fullscreen-loading-delegate.js.map