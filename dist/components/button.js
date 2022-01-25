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
var react_native_1 = require("react-native");
var theme_1 = require("../core/theme");
var Button = function (_a) {
    var children = _a.children, style = _a.style, textStyle = _a.textStyle, onPressed = _a.onPressed;
    var theme = (0, theme_1.useTheme)();
    var disabled = !onPressed;
    return (<react_native_1.TouchableOpacity disabled={disabled} activeOpacity={0.9} onPress={onPressed} style={__assign({ alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.primary, borderRadius: theme.sizes.borderRadius, padding: theme.sizes.spacing, opacity: disabled ? 0.7 : 1.0 }, style)}>
      <react_native_1.Text style={__assign(__assign({ color: theme.colors.white }, theme.textStyles.button), textStyle)}>
        {children}
      </react_native_1.Text>
    </react_native_1.TouchableOpacity>);
};
exports.default = Button;
//# sourceMappingURL=button.js.map