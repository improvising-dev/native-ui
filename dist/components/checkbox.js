"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckBox = void 0;
var react_native_1 = require("react-native");
var react_native_eva_icons_1 = require("react-native-eva-icons");
var theme_1 = require("../core/theme");
var CheckBox = function (_a) {
    var value = _a.value, onValueChange = _a.onValueChange;
    var theme = (0, theme_1.useTheme)();
    var size = theme.sizes.checkBoxSize;
    var iconSize = Math.floor(theme.sizes.checkBoxSize * 0.7);
    return (<react_native_1.Pressable onPress={function () { return onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(!value); }} style={{
            width: size,
            height: size,
            borderWidth: 1,
            borderRadius: size / 4,
            borderColor: value
                ? theme.colors.primary
                : theme.colors.text.primaryUnselected,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
      {value && (<react_native_eva_icons_1.Icon name="checkmark" fill={theme.colors.primary} width={iconSize} height={iconSize}/>)}
    </react_native_1.Pressable>);
};
exports.CheckBox = CheckBox;
//# sourceMappingURL=checkbox.js.map