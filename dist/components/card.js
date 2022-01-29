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
exports.Card = void 0;
var react_native_1 = require("react-native");
var theme_1 = require("../core/theme");
var Card = function (_a) {
    var children = _a.children, style = _a.style, onPressed = _a.onPressed;
    var theme = (0, theme_1.useTheme)();
    return (<react_native_1.Pressable onPress={onPressed} style={__assign({ backgroundColor: theme.backgroundColor.primary, borderRadius: theme.borderRadius, padding: theme.spacing }, style)}>
      {children}
    </react_native_1.Pressable>);
};
exports.Card = Card;
//# sourceMappingURL=card.js.map