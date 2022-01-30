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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlledModal = exports.Modal = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var animation_1 = require("../core/animation");
var performance_1 = require("../core/performance");
var theme_1 = require("../core/theme");
var Modal = function (_a) {
    var children = _a.children, visible = _a.visible, _b = _a.dismissible, dismissible = _b === void 0 ? true : _b, _c = _a.zIndex, zIndex = _c === void 0 ? 100 : _c, _d = _a.transition, transition = _d === void 0 ? 'fade' : _d, _e = _a.to, to = _e === void 0 ? 'top' : _e, _f = _a.duration, duration = _f === void 0 ? 400 : _f, style = _a.style, _g = _a.useNativeDriver, useNativeDriver = _g === void 0 ? performance_1.Performance.animation.useNativeDriver : _g, onDismiss = _a.onDismiss;
    var theme = (0, theme_1.useTheme)();
    var dimensions = (0, react_native_1.useWindowDimensions)();
    var value = (0, animation_1.useAnimatedValue)(visible ? 1 : 0);
    (0, react_1.useEffect)(function () {
        react_native_1.Animated.timing(value, {
            toValue: visible ? 1 : 0,
            duration: duration,
            useNativeDriver: useNativeDriver,
        }).start();
    }, [visible]);
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
    return (<react_native_1.View style={react_native_1.StyleSheet.absoluteFill}>
      {renderBackdrop()}
      {renderContent()}
    </react_native_1.View>);
};
exports.Modal = Modal;
exports.ControlledModal = (0, react_1.forwardRef)(function (_a, ref) {
    var _b = _a.duration, duration = _b === void 0 ? 400 : _b, onDismiss = _a.onDismiss, modalProps = __rest(_a, ["duration", "onDismiss"]);
    var _c = (0, react_1.useState)(false), visible = _c[0], setVisible = _c[1];
    var handleDismiss = function () {
        setVisible(false);
        setTimeout(function () { return onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss(); }, duration);
    };
    (0, react_1.useEffect)(function () {
        setVisible(true);
    }, []);
    (0, react_1.useImperativeHandle)(ref, function () {
        return {
            dismiss: handleDismiss,
        };
    });
    return (<exports.Modal duration={duration} visible={visible} onDismiss={handleDismiss} {...modalProps}/>);
});
//# sourceMappingURL=modal.js.map