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
exports.FadeInUpModal = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_portalize_1 = require("react-native-portalize");
var animation_1 = require("../core/animation");
var FadeInUpModal = function (_a) {
    var children = _a.children, visible = _a.visible, _b = _a.dismissible, dismissible = _b === void 0 ? true : _b, _c = _a.duration, duration = _c === void 0 ? 300 : _c, style = _a.style, _d = _a.useNativeDriver, useNativeDriver = _d === void 0 ? true : _d, onDismiss = _a.onDismiss;
    var _e = (0, react_1.useState)(visible), mounted = _e[0], setMounted = _e[1];
    var dimensions = (0, react_native_1.useWindowDimensions)();
    var value = (0, animation_1.useAnimatedValue)(visible ? 1 : 0);
    (0, react_1.useEffect)(function () {
        if (visible) {
            if (mounted) {
                react_native_1.Animated.timing(value, {
                    toValue: 1,
                    duration: duration,
                    useNativeDriver: useNativeDriver,
                }).start();
            }
            else {
                requestAnimationFrame(function () { return setMounted(true); });
            }
        }
        else if (mounted) {
            react_native_1.Animated.timing(value, {
                toValue: 0,
                duration: duration,
                useNativeDriver: useNativeDriver,
            }).start();
            setTimeout(function () { return setMounted(false); }, duration);
        }
    }, [visible, mounted]);
    if (!mounted) {
        return <></>;
    }
    return (<react_native_portalize_1.Portal>
      <react_native_1.TouchableWithoutFeedback onPress={dismissible ? onDismiss : undefined}>
        <react_native_1.Animated.View style={{
            backgroundColor: 'rgba(0, 0, 0, .6)',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 1000,
            opacity: value,
        }}>
          <react_native_1.Animated.View style={__assign({ flex: 1, transform: [
                {
                    translateY: value.interpolate({
                        inputRange: [0, 1],
                        outputRange: [dimensions.height, 0],
                    }),
                },
            ] }, style)}>
            <react_native_1.TouchableWithoutFeedback>{children}</react_native_1.TouchableWithoutFeedback>
          </react_native_1.Animated.View>
        </react_native_1.Animated.View>
      </react_native_1.TouchableWithoutFeedback>
    </react_native_portalize_1.Portal>);
};
exports.FadeInUpModal = FadeInUpModal;
//# sourceMappingURL=fade-in-up-modal.js.map