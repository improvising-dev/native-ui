"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullscreenLoading = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var theme_1 = require("../core/theme");
var modal_1 = require("./modal");
exports.FullscreenLoading = (0, react_1.memo)(function (_a) {
    var visible = _a.visible;
    var theme = (0, theme_1.useTheme)();
    return (<modal_1.Modal visible={visible} dismissible={false} zIndex={theme.componentTheme.fullscreenLoading.zIndex} style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
        <react_native_1.ActivityIndicator color={theme.white}/>
      </modal_1.Modal>);
});
//# sourceMappingURL=fullscreen-loading.js.map