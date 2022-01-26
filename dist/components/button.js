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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
var color_1 = __importDefault(require("color"));
var react_native_1 = require("react-native");
var haptics_1 = require("../actions/haptics");
var animation_1 = require("../core/animation");
var theme_1 = require("../core/theme");
var Button = function (_a) {
    var children = _a.children, backgroundColor = _a.backgroundColor, textColor = _a.textColor, style = _a.style, textStyle = _a.textStyle, _b = _a.haptic, haptic = _b === void 0 ? false : _b, onPressed = _a.onPressed;
    var animatedValue = (0, animation_1.useAnimatedValue)(0);
    var theme = (0, theme_1.useTheme)();
    var disabled = !onPressed;
    var resolvedBackgroundColor = backgroundColor !== null && backgroundColor !== void 0 ? backgroundColor : theme.colors.primary;
    var activeBackgroundColor = (0, color_1.default)(resolvedBackgroundColor).isDark()
        ? (0, color_1.default)(resolvedBackgroundColor).lighten(0.2).string()
        : (0, color_1.default)(resolvedBackgroundColor).darken(0.2).string();
    var resolvedTextColor = textColor !== null && textColor !== void 0 ? textColor : ((0, color_1.default)(resolvedBackgroundColor).isDark()
        ? theme.colors.white
        : theme.colors.black);
    var handlePress = function () {
        if (haptic) {
            haptics_1.HapticFeedback.lightImpact();
        }
        onPressed === null || onPressed === void 0 ? void 0 : onPressed();
    };
    return (<react_native_1.Pressable onPress={handlePress} onPressIn={function () {
            react_native_1.Animated.timing(animatedValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: false,
            }).start();
        }} onPressOut={function () {
            setTimeout(function () {
                react_native_1.Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: false,
                }).start();
            }, 200);
        }} disabled={disabled}>
      <react_native_1.Animated.View style={__assign({ alignItems: 'center', justifyContent: 'center', backgroundColor: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [resolvedBackgroundColor, activeBackgroundColor],
            }), borderRadius: theme.sizes.borderRadius, padding: theme.sizes.spacing, opacity: disabled ? 0.7 : 1.0 }, style)}>
        {typeof children === 'string' ? (<react_native_1.Text style={__assign(__assign({ color: resolvedTextColor }, theme.textStyles.button), textStyle)}>
            {children}
          </react_native_1.Text>) : (children)}
      </react_native_1.Animated.View>
    </react_native_1.Pressable>);
};
exports.Button = Button;
//# sourceMappingURL=button.js.map