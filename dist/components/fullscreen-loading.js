"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var react_native_portalize_1 = require("react-native-portalize");
var theme_1 = require("../core/theme");
var visibility_1 = __importDefault(require("./visibility"));
var FullscreenLoading = function (_a) {
    var visible = _a.visible;
    var theme = (0, theme_1.useTheme)();
    return (<react_native_portalize_1.Portal>
      <visibility_1.default visible={visible} duration={250} style={{
            backgroundColor: 'rgba(0, 0, 0, .6)',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
        }}>
        <react_native_1.ActivityIndicator color={theme.colors.white}/>
      </visibility_1.default>
    </react_native_portalize_1.Portal>);
};
exports.default = FullscreenLoading;
//# sourceMappingURL=fullscreen-loading.js.map