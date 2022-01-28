"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DarkTheme = void 0;
var common_1 = require("./common");
var DarkColors = {
    white: '#ffffff',
    black: '#000000',
    primary: '#6d3df4',
    primaryContrasting: '#ffffff',
    background: {
        primary: '#151515',
        secondary: '#000000',
        fill: '#252525',
        modalBarrier: 'rgba(0, 0, 0, .7)',
    },
    text: {
        primary: '#ffffff',
        primaryUnselected: '#8d8d8d',
        secondary: '#8d8d8d',
        secondaryUnselected: '#5d5d5d',
        placeholder: '#8d8d8d',
    },
};
var DarkTextStyles = __assign(__assign({}, common_1.CommonTextStyles), { default: __assign(__assign({}, common_1.CommonTextStyles.default), { color: DarkColors.text.primary }) });
exports.DarkTheme = {
    brightness: 'dark',
    sizes: common_1.CommonSizes,
    colors: DarkColors,
    textStyles: DarkTextStyles,
};
//# sourceMappingURL=dark.js.map