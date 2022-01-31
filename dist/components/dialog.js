"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptDialog = exports.ConfirmDialog = exports.AlertDialog = exports.Dialog = void 0;
var react_1 = require("react");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var theme_1 = require("../core/theme");
var use_keyboard_height_1 = require("../hooks/use-keyboard-height");
var button_1 = require("./button");
var input_1 = require("./input");
var modal_1 = require("./modal");
var stack_1 = require("./stack");
var text_1 = require("./text");
var Dialog = function (_a) {
    var children = _a.children, visible = _a.visible, onDismiss = _a.onDismiss, onUnmounted = _a.onUnmounted;
    var theme = (0, theme_1.useTheme)();
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var keyboardHeight = (0, use_keyboard_height_1.useKeyboardHeight)();
    return (<modal_1.Modal visible={visible} onDismiss={onDismiss} onUnmounted={onUnmounted} transition="slide" zIndex={theme.componentTheme.dialog.zIndex} style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: theme.spacing,
            paddingBottom: theme.spacing + (keyboardHeight > 0 ? keyboardHeight : insets.bottom),
            borderTopLeftRadius: theme.borderRadius,
            borderTopRightRadius: theme.borderRadius,
            backgroundColor: theme.backgroundColor.primary,
        }}>
      {children}
    </modal_1.Modal>);
};
exports.Dialog = Dialog;
var AlertDialog = function (_a) {
    var title = _a.title, message = _a.message, _b = _a.okButtonText, okButtonText = _b === void 0 ? 'Ok' : _b, visible = _a.visible, onDismiss = _a.onDismiss, onUnmounted = _a.onUnmounted;
    var theme = (0, theme_1.useTheme)();
    return (<exports.Dialog visible={visible} onDismiss={onDismiss} onUnmounted={onUnmounted}>
      <text_1.Text style={{
            fontSize: 20,
            fontWeight: '500',
            marginBottom: theme.spacing,
        }}>
        {title}
      </text_1.Text>
      <text_1.Text style={{
            marginBottom: theme.spacing * 1.5,
        }}>
        {message}
      </text_1.Text>
      <button_1.Button style={{ flex: 1 }} onPressed={onDismiss}>
        {okButtonText}
      </button_1.Button>
    </exports.Dialog>);
};
exports.AlertDialog = AlertDialog;
var ConfirmDialog = function (_a) {
    var title = _a.title, message = _a.message, _b = _a.cancelButtonText, cancelButtonText = _b === void 0 ? 'Cancel' : _b, _c = _a.confirmButtonText, confirmButtonText = _c === void 0 ? 'Confirm' : _c, visible = _a.visible, onDismiss = _a.onDismiss, onUnmounted = _a.onUnmounted;
    var theme = (0, theme_1.useTheme)();
    return (<exports.Dialog visible={visible} onDismiss={function () { return onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss(false); }} onUnmounted={onUnmounted}>
      <text_1.Text style={{
            fontSize: 20,
            fontWeight: '500',
            marginBottom: theme.spacing,
        }}>
        {title}
      </text_1.Text>
      <text_1.Text style={{
            marginBottom: theme.spacing * 1.5,
        }}>
        {message}
      </text_1.Text>
      <stack_1.Stack direction="row" spacing={theme.spacing}>
        <button_1.Button style={{
            flex: 1,
            backgroundColor: theme.backgroundColor.fill,
        }} textStyle={{
            color: theme.textColor.primary,
        }} onPressed={function () { return onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss(false); }}>
          {cancelButtonText}
        </button_1.Button>
        <button_1.Button style={{ flex: 1 }} onPressed={function () { return onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss(true); }}>
          {confirmButtonText}
        </button_1.Button>
      </stack_1.Stack>
    </exports.Dialog>);
};
exports.ConfirmDialog = ConfirmDialog;
var PromptDialog = function (_a) {
    var title = _a.title, message = _a.message, _b = _a.cancelButtonText, cancelButtonText = _b === void 0 ? 'Cancel' : _b, _c = _a.confirmButtonText, confirmButtonText = _c === void 0 ? 'Confirm' : _c, placeholder = _a.placeholder, _d = _a.initialValue, initialValue = _d === void 0 ? '' : _d, visible = _a.visible, onDismiss = _a.onDismiss, onUnmounted = _a.onUnmounted;
    var theme = (0, theme_1.useTheme)();
    var _e = (0, react_1.useState)(initialValue), text = _e[0], setText = _e[1];
    return (<exports.Dialog visible={visible} onDismiss={function () { return onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss(); }} onUnmounted={onUnmounted}>
      <text_1.Text style={[
            theme.componentTheme.dialog.titleTextStyle,
            {
                marginBottom: theme.spacing,
            },
        ]}>
        {title}
      </text_1.Text>
      {message && (<text_1.Text style={[
                theme.componentTheme.dialog.messageTextStyle,
                {
                    marginBottom: theme.spacing,
                },
            ]}>
          {message}
        </text_1.Text>)}
      <input_1.Input autoFocus={true} returnKeyType="done" defaultValue={text} onChangeText={setText} placeholder={placeholder} style={{
            padding: theme.spacing,
            borderRadius: theme.borderRadius,
            backgroundColor: theme.backgroundColor.fill,
            marginBottom: theme.spacing,
        }}/>
      <stack_1.Stack direction="row" spacing={theme.spacing}>
        <button_1.Button style={{
            flex: 1,
            backgroundColor: theme.backgroundColor.fill,
        }} textStyle={{
            color: theme.textColor.primary,
        }} onPressed={function () { return onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss(); }}>
          {cancelButtonText}
        </button_1.Button>
        <button_1.Button style={{ flex: 1 }} onPressed={function () { return onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss(); }}>
          {confirmButtonText}
        </button_1.Button>
      </stack_1.Stack>
    </exports.Dialog>);
};
exports.PromptDialog = PromptDialog;
//# sourceMappingURL=dialog.js.map