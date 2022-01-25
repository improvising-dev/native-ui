"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var fullscreen_loading_1 = __importDefault(require("./fullscreen-loading"));
var event_1 = require("../core/event");
var FullscreenLoadingDelegate = function () {
    var _a = (0, react_1.useState)(false), fullscreenLoadingVisible = _a[0], setFullscreenLoadingVisible = _a[1];
    (0, react_1.useEffect)(function () {
        event_1.globalEvent.on('FullscreenLoading.showLoading', function () {
            setFullscreenLoadingVisible(true);
        });
        event_1.globalEvent.on('FullscreenLoading.hideLoading', function () {
            setFullscreenLoadingVisible(false);
        });
        return function () {
            event_1.globalEvent.off('FullscreenLoading.showLoading');
            event_1.globalEvent.off('FullscreenLoading.hideLoading');
        };
    }, []);
    return <fullscreen_loading_1.default visible={fullscreenLoadingVisible}/>;
};
exports.default = FullscreenLoadingDelegate;
//# sourceMappingURL=fullscreen-loading-delegate.js.map