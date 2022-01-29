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
exports.Modal = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var animation_1 = require("../core/animation");
var performance_1 = require("../core/performance");
var theme_1 = require("../core/theme");
var portal_1 = require("./portal");
var Modal = function (_a) {
    var children = _a.children, visible = _a.visible, _b = _a.dismissible, dismissible = _b === void 0 ? true : _b, _c = _a.zIndex, zIndex = _c === void 0 ? 100 : _c, _d = _a.transition, transition = _d === void 0 ? 'fade' : _d, _e = _a.to, to = _e === void 0 ? 'top' : _e, _f = _a.duration, duration = _f === void 0 ? 400 : _f, style = _a.style, _g = _a.useNativeDriver, useNativeDriver = _g === void 0 ? performance_1.Performance.animation.useNativeDriver : _g, onDismiss = _a.onDismiss;
    var theme = (0, theme_1.useTheme)();
    var dimensions = (0, react_native_1.useWindowDimensions)();
    var _h = (0, react_1.useState)(visible), mounted = _h[0], setMounted = _h[1];
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
    var renderBackdrop = function () {
        return (<react_native_1.TouchableWithoutFeedback onPress={dismissible ? onDismiss : undefined}>
        <react_native_1.Animated.View style={[
                react_native_1.StyleSheet.absoluteFill,
                {
                    backgroundColor: theme.backgroundColor.modalBarrier,
                    zIndex: zIndex,
                    opacity: value,
                },
            ]}/>
      </react_native_1.TouchableWithoutFeedback>);
    };
    var renderContent = function () {
        if (transition === 'slide') {
            return (<react_native_1.Animated.View style={__assign({ zIndex: zIndex + 1, transform: [
                        to === 'top'
                            ? {
                                translateY: value.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [dimensions.height, 0],
                                }),
                            }
                            : to === 'bottom'
                                ? {
                                    translateY: value.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-dimensions.height, 0],
                                    }),
                                }
                                : to === 'left'
                                    ? {
                                        translateX: value.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [dimensions.width, 0],
                                        }),
                                    }
                                    : {
                                        translateX: value.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [-dimensions.width, 0],
                                        }),
                                    },
                    ] }, style)}>
          {children}
        </react_native_1.Animated.View>);
        }
        else {
            return (<react_native_1.Animated.View style={__assign({ zIndex: zIndex + 1, opacity: value }, style)}>
          {children}
        </react_native_1.Animated.View>);
        }
    };
    return (<portal_1.Portal>
      {renderBackdrop()}
      {renderContent()}
    </portal_1.Portal>);
};
exports.Modal = Modal;
//# sourceMappingURL=modal.js.map