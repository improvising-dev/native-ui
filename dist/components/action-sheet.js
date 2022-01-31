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
exports.ActionSheet = void 0;
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var theme_1 = require("../core/theme");
var button_1 = require("./button");
var modal_1 = require("./modal");
var ActionSheet = function (_a) {
    var items = _a.items, visible = _a.visible, duration = _a.duration, onBackdropPressed = _a.onBackdropPressed, onDismiss = _a.onDismiss, onUnmounted = _a.onUnmounted;
    var theme = (0, theme_1.useTheme)();
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    return (<modal_1.Modal zIndex={theme.componentTheme.actionSheet.zIndex} visible={visible} duration={duration} onBackdropPressed={onBackdropPressed} onDismiss={onDismiss} onUnmounted={onUnmounted} transition="slide" style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: theme.backgroundColor.primary,
            borderTopLeftRadius: theme.borderRadius,
            borderTopRightRadius: theme.borderRadius,
            overflow: 'hidden',
            paddingBottom: insets.bottom,
        }}>
      {items.map(function (item, index) {
            return (<button_1.Button key={item.title} style={__assign({ backgroundColor: theme.backgroundColor.primary, height: theme.componentTheme.actionSheet.itemHeight, borderRadius: 0 }, (index === 0 && {
                    borderTopLeftRadius: theme.borderRadius,
                    borderTopRightRadius: theme.borderRadius,
                }))} textStyle={{
                    color: theme.textColor.primary,
                }} onPressed={function () {
                    var _a;
                    (_a = item.onPressed) === null || _a === void 0 ? void 0 : _a.call(item);
                    onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
                }}>
            {item.title}
          </button_1.Button>);
        })}
    </modal_1.Modal>);
};
exports.ActionSheet = ActionSheet;
//# sourceMappingURL=action-sheet.js.map