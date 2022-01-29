"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightTheme = void 0;
var lodash_1 = require("lodash");
var common_1 = require("./common");
var BackgroundColor = {
    primary: '#ffffff',
    secondary: '#f0f0f0',
    fill: '#f0f0f0',
    modalBarrier: 'rgba(0, 0, 0, .6)',
};
var TextColor = {
    primary: '#ffffff',
    primaryUnselected: '#8d8d8d',
    secondary: '#8d8d8d',
    secondaryUnselected: '#5d5d5d',
    placeholder: '#8d8d8d',
};
exports.LightTheme = (0, lodash_1.merge)(common_1.DefaultTheme, {
    brightness: 'light',
    white: '#ffffff',
    black: '#000000',
    primaryColor: '#6d3df4',
    primaryContrastingColor: '#ffffff',
    backgroundColor: BackgroundColor,
    textColor: TextColor,
    textTheme: {
        default: {
            color: TextColor.primary,
        },
    },
});
//# sourceMappingURL=light.js.map