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
exports.LightTheme = void 0;
var common_1 = require("./common");
var LightColors = {
    white: '#ffffff',
    black: '#000000',
    primary: '#6d3df4',
    primaryContrasting: '#ffffff',
    background: {
        primary: '#ffffff',
        secondary: '#f0f0f0',
        fill: '#f0f0f0',
        modalBarrier: 'rgba(0, 0, 0, .6)',
    },
    text: {
        primary: '#000000',
        primaryUnselected: '#8d8d8d',
        secondary: '#8d8d8d',
        secondaryUnselected: '#adadad',
        placeholder: '#8d8d8d',
    },
};
var LightTextStyles = __assign(__assign({}, common_1.CommonTextStyles), { default: __assign(__assign({}, common_1.CommonTextStyles.default), { color: LightColors.text.primary }) });
exports.LightTheme = {
    brightness: 'light',
    sizes: common_1.CommonSizes,
    colors: LightColors,
    textStyles: LightTextStyles,
};
//# sourceMappingURL=light.js.map