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
exports.CheckBox = void 0;
var react_native_1 = require("react-native");
var react_native_eva_icons_1 = require("react-native-eva-icons");
var theme_1 = require("../core/theme");
var CheckBox = function (_a) {
    var value = _a.value, onValueChange = _a.onValueChange, style = _a.style, checkedColor = _a.checkedColor, uncheckedColor = _a.uncheckedColor, iconColor = _a.iconColor;
    var theme = (0, theme_1.useTheme)();
    var size = theme.sizes.checkBoxSize;
    var iconSize = Math.floor(theme.sizes.checkBoxSize * 0.8);
    checkedColor !== null && checkedColor !== void 0 ? checkedColor : (checkedColor = theme.colors.primary);
    uncheckedColor !== null && uncheckedColor !== void 0 ? uncheckedColor : (uncheckedColor = theme.colors.background.primary);
    iconColor !== null && iconColor !== void 0 ? iconColor : (iconColor = theme.colors.white);
    return (<react_native_1.Pressable onPress={function () { return onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(!value); }} style={__assign({ width: size, height: size, borderRadius: size / 2, backgroundColor: value ? checkedColor : uncheckedColor, alignItems: 'center', justifyContent: 'center' }, style)}>
      {value && (<react_native_eva_icons_1.Icon name="checkmark" fill={iconColor} width={iconSize} height={iconSize}/>)}
    </react_native_1.Pressable>);
};
exports.CheckBox = CheckBox;
//# sourceMappingURL=checkbox.js.map