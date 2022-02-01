"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckBox = void 0;
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var react_native_eva_icons_1 = require("react-native-eva-icons");
var theme_1 = require("../core/theme");
var CheckBox = function (_a) {
    var value = _a.value, onValueChange = _a.onValueChange, customSize = _a.size, style = _a.style, customCheckedColor = _a.checkedColor, customUncheckedColor = _a.uncheckedColor, customIconColor = _a.iconColor;
    var theme = (0, theme_1.useTheme)();
    var size = customSize !== null && customSize !== void 0 ? customSize : theme.componentTheme.checkbox.size;
    var iconSize = Math.floor(size * 0.8);
    var checkedColor = customCheckedColor !== null && customCheckedColor !== void 0 ? customCheckedColor : theme.primaryColor;
    var uncheckedColor = customUncheckedColor !== null && customUncheckedColor !== void 0 ? customUncheckedColor : theme.backgroundColor.primary;
    var iconColor = customIconColor !== null && customIconColor !== void 0 ? customIconColor : theme.primaryContrastingColor;
    return (<react_native_1.Pressable onPress={function () { return onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(!value); }} style={[
            {
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: value ? checkedColor : uncheckedColor,
                alignItems: 'center',
                justifyContent: 'center',
            },
            style,
        ]}>
      {value && (<react_native_eva_icons_1.Icon name="checkmark" fill={iconColor} width={iconSize} height={iconSize}/>)}
    </react_native_1.Pressable>);
};
exports.CheckBox = CheckBox;
//# sourceMappingURL=checkbox.js.map