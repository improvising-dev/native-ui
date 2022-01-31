"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var animation_1 = require("../core/animation");
var performance_1 = require("../core/performance");
var theme_1 = require("../core/theme");
var portal_1 = require("./portal");
var Modal = function (_a) {
    var children = _a.children, _b = _a.zIndex, zIndex = _b === void 0 ? 100 : _b, _c = _a.dismissible, dismissible = _c === void 0 ? true : _c, _d = _a.backdrop, backdrop = _d === void 0 ? true : _d, _e = _a.transition, transition = _e === void 0 ? 'fade' : _e, _f = _a.to, to = _f === void 0 ? 'top' : _f, style = _a.style, _g = _a.useNativeDriver, useNativeDriver = _g === void 0 ? performance_1.Performance.animation.useNativeDriver : _g, visible = _a.visible, _h = _a.duration, duration = _h === void 0 ? 400 : _h, onBackdropPressed = _a.onBackdropPressed, onDismiss = _a.onDismiss, onUnmounted = _a.onUnmounted;
    var theme = (0, theme_1.useTheme)();
    var dimensions = (0, react_native_1.useWindowDimensions)();
    var value = (0, animation_1.useAnimatedValue)(visible ? 1 : 0);
    var _j = (0, react_1.useState)(visible), mounted = _j[0], setMounted = _j[1];
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
            setTimeout(function () {
                setMounted(false);
                onUnmounted === null || onUnmounted === void 0 ? void 0 : onUnmounted();
            }, duration);
        }
    }, [visible, mounted]);
    if (!mounted) {
        return <></>;
    }
    var handleBackdropPress = function () {
        onBackdropPressed === null || onBackdropPressed === void 0 ? void 0 : onBackdropPressed();
        if (dismissible) {
            onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
        }
    };
    var renderBackdrop = function () {
        if (!backdrop) {
            return <></>;
        }
        return (<react_native_1.TouchableWithoutFeedback onPress={handleBackdropPress}>
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
            return (<react_native_1.Animated.View style={[
                    {
                        zIndex: zIndex + 1,
                        transform: [
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
                        ],
                    },
                    style,
                ]}>
          {children}
        </react_native_1.Animated.View>);
        }
        else if (transition === 'scale') {
            return (<react_native_1.Animated.View style={[
                    {
                        zIndex: zIndex + 1,
                        opacity: value,
                        transform: [
                            {
                                scale: value.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.8, 1],
                                }),
                            },
                        ],
                    },
                    style,
                ]}>
          {children}
        </react_native_1.Animated.View>);
        }
        else {
            return (<react_native_1.Animated.View style={[
                    {
                        zIndex: zIndex + 1,
                        opacity: value,
                    },
                    style,
                ]}>
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