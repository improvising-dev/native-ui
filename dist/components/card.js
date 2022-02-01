"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var react_native_1 = require("react-native");
var haptic_feedback_1 = require("../actions/haptic-feedback");
var theme_1 = require("../core/theme");
var Card = function (_a) {
    var children = _a.children, style = _a.style, _b = _a.haptic, haptic = _b === void 0 ? false : _b, onPressed = _a.onPressed, viewProps = __rest(_a, ["children", "style", "haptic", "onPressed"]);
    var theme = (0, theme_1.useTheme)();
    var disabled = !onPressed;
    var handlePress = function () {
        if (haptic) {
            haptic_feedback_1.HapticFeedback.lightImpact();
        }
        onPressed === null || onPressed === void 0 ? void 0 : onPressed();
    };
    return (<react_native_1.Pressable disabled={disabled} onPress={handlePress} style={[
            {
                backgroundColor: theme.backgroundColor.primary,
                borderRadius: theme.borderRadius,
                padding: theme.spacing,
            },
            style,
        ]} {...viewProps}>
      {children}
    </react_native_1.Pressable>);
};
exports.Card = Card;
//# sourceMappingURL=card.js.map