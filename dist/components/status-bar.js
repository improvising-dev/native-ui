"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusBar = exports.resolveStatusBarStyle = void 0;
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var resolveStatusBarStyle = function (style, colorScheme) {
    var resolvedStyle = style;
    if (style === 'auto') {
        resolvedStyle = colorScheme === 'light' ? 'dark' : 'light';
    }
    else if (style === 'inverted') {
        resolvedStyle = colorScheme === 'light' ? 'light' : 'dark';
    }
    return resolvedStyle === 'light' ? 'light-content' : 'dark-content';
};
exports.resolveStatusBarStyle = resolveStatusBarStyle;
var StatusBar = function (_a) {
    var _b = _a.style, style = _b === void 0 ? 'auto' : _b, _c = _a.animated, animated = _c === void 0 ? true : _c, _d = _a.translucent, translucent = _d === void 0 ? true : _d, _e = _a.hidden, hidden = _e === void 0 ? false : _e;
    var colorScheme = (0, react_native_1.useColorScheme)();
    var barStyle = (0, exports.resolveStatusBarStyle)(style, colorScheme);
    return (<react_native_1.StatusBar barStyle={barStyle} animated={animated} translucent={translucent} hidden={hidden}/>);
};
exports.StatusBar = StatusBar;
//# sourceMappingURL=status-bar.js.map