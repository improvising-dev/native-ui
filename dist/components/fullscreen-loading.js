"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullscreenLoading = void 0;
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var theme_1 = require("../core/theme");
var modal_1 = require("./modal");
var FullscreenLoading = function (_a) {
    var visible = _a.visible, duration = _a.duration, onBackdropPressed = _a.onBackdropPressed, onDismiss = _a.onDismiss, onUnmounted = _a.onUnmounted;
    var theme = (0, theme_1.useTheme)();
    return (<modal_1.Modal zIndex={theme.componentTheme.fullscreenLoading.zIndex} dismissible={false} visible={visible} duration={duration} onBackdropPressed={onBackdropPressed} onDismiss={onDismiss} onUnmounted={onUnmounted} style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
      <react_native_1.ActivityIndicator color={theme.white}/>
    </modal_1.Modal>);
};
exports.FullscreenLoading = FullscreenLoading;
//# sourceMappingURL=fullscreen-loading.js.map