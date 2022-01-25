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
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var animation_1 = require("../core/animation");
var Visibility = function (_a) {
    var visible = _a.visible, _b = _a.duration, duration = _b === void 0 ? 0 : _b, style = _a.style, _c = _a.useNativeDriver, useNativeDriver = _c === void 0 ? true : _c, children = _a.children;
    var _d = (0, react_1.useState)(visible), mounted = _d[0], setMounted = _d[1];
    var opacity = (0, animation_1.useAnimatedValue)(visible ? 1 : 0);
    (0, react_1.useEffect)(function () {
        if (duration > 0) {
            if (visible && !mounted) {
                setMounted(true);
            }
            requestAnimationFrame(function () {
                react_native_1.Animated.timing(opacity, {
                    toValue: visible ? 1 : 0,
                    duration: duration,
                    useNativeDriver: useNativeDriver,
                }).start();
            });
            if (!visible) {
                setTimeout(function () { return setMounted(false); }, duration);
            }
        }
        else {
            if (visible) {
                setMounted(true);
            }
            else {
                setMounted(false);
            }
        }
    }, [visible, duration, setMounted]);
    if (!mounted) {
        return <></>;
    }
    return <react_native_1.Animated.View style={__assign(__assign({}, style), { opacity: opacity })}>{children}</react_native_1.Animated.View>;
};
exports.default = Visibility;
//# sourceMappingURL=visibility.js.map