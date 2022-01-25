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
exports.Page = void 0;
var expo_status_bar_1 = require("expo-status-bar");
var react_native_1 = require("react-native");
var theme_1 = require("../core/theme");
var Page = function (_a) {
    var _b = _a.scrollable, scrollable = _b === void 0 ? false : _b, style = _a.style, children = _a.children;
    var theme = (0, theme_1.useTheme)();
    var viewStyle = __assign({ flex: 1, backgroundColor: theme.colors.background.secondary }, style);
    if (scrollable) {
        return (<react_native_1.ScrollView style={viewStyle}>
        <expo_status_bar_1.StatusBar style="auto"/>
        {children}
      </react_native_1.ScrollView>);
    }
    return (<react_native_1.View style={viewStyle}>
      <expo_status_bar_1.StatusBar style="auto"/>
      {children}
    </react_native_1.View>);
};
exports.Page = Page;
//# sourceMappingURL=page.js.map