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
exports.Button = void 0;
var react_native_1 = require("react-native");
var haptics_1 = require("../actions/haptics");
var animation_1 = require("../core/animation");
var theme_1 = require("../core/theme");
var AnimatedPressable = react_native_1.Animated.createAnimatedComponent(react_native_1.Pressable);
var Button = function (_a) {
    var children = _a.children, style = _a.style, textStyle = _a.textStyle, _b = _a.haptic, haptic = _b === void 0 ? false : _b, onPressed = _a.onPressed;
    var animatedValue = (0, animation_1.useAnimatedValue)(0);
    var theme = (0, theme_1.useTheme)();
    var disabled = !onPressed;
    var handlePress = function () {
        if (haptic) {
            haptics_1.HapticFeedback.lightImpact();
        }
        onPressed === null || onPressed === void 0 ? void 0 : onPressed();
    };
    return (<AnimatedPressable onPress={handlePress} onPressIn={function () {
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
        }} onTouchCancel={function () {
            react_native_1.Animated.timing(animatedValue, {
                toValue: 0,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }} disabled={disabled} style={__assign({ overflow: 'hidden', alignItems: 'center', justifyContent: 'center', borderRadius: theme.borderRadius, padding: theme.spacing, backgroundColor: theme.primaryColor, opacity: disabled ? 0.7 : 1 }, style)}>
      {typeof children === 'string' ? (<react_native_1.Text style={__assign(__assign({ color: theme.primaryContrastingColor }, theme.textTheme.button), textStyle)}>
          {children}
        </react_native_1.Text>) : (children)}
      <react_native_1.Animated.View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            backgroundColor: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: theme.brightness === 'light'
                    ? ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, .05)']
                    : ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, .05)'],
            }),
        }}/>
    </AnimatedPressable>);
};
exports.Button = Button;
//# sourceMappingURL=button.js.map