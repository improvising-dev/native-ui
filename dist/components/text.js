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
exports.Text = void 0;
var react_native_1 = require("react-native");
var theme_1 = require("../core/theme");
var Text = function (_a) {
    var children = _a.children, style = _a.style, textProps = __rest(_a, ["children", "style"]);
    var theme = (0, theme_1.useTheme)();
    return (<react_native_1.Text style={[theme.textTheme.default, style]} {...textProps}>
      {children}
    </react_native_1.Text>);
};
exports.Text = Text;
//# sourceMappingURL=text.js.map