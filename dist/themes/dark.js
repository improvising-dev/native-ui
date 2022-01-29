"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DarkTheme = void 0;
var lodash_1 = require("lodash");
var common_1 = require("./common");
var BackgroundColor = {
    primary: '#151515',
    secondary: '#000000',
    fill: '#252525',
    modalBarrier: 'rgba(0, 0, 0, .7)',
};
var TextColor = {
    primary: '#ffffff',
    primaryUnselected: '#8d8d8d',
    secondary: '#8d8d8d',
    secondaryUnselected: '#5d5d5d',
    placeholder: '#5d5d5d',
};
exports.DarkTheme = (0, lodash_1.merge)(common_1.DefaultTheme, {
    brightness: 'dark',
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
//# sourceMappingURL=dark.js.map