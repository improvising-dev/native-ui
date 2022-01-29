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
    primary: '#000000',
    primaryUnselected: '#8d8d8d',
    secondary: '#8d8d8d',
    secondaryUnselected: '#adadad',
    placeholder: '#adadad',
};
exports.LightTheme = (0, lodash_1.merge)((0, lodash_1.cloneDeep)(common_1.DefaultTheme), {
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