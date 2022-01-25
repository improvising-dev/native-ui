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
var common_1 = require("./common");
var DarkColors = {
    white: '#ffffff',
    black: '#000000',
    primary: '#6d3df4',
    background: {
        primary: '#151515',
        secondary: '#000000',
    },
    text: {
        primary: '#ffffff',
        secondary: '#8d8d8d',
        placeholder: '#8d8d8d',
        unselected: '#8d8d8d',
    },
};
var DarkTextStyles = __assign(__assign({}, common_1.CommonTextStyles), { default: __assign(__assign({}, common_1.CommonTextStyles.default), { color: DarkColors.text.primary }) });
var DarkTheme = {
    sizes: common_1.CommonSizes,
    colors: DarkColors,
    textStyles: DarkTextStyles,
};
exports.default = DarkTheme;
//# sourceMappingURL=dark.js.map