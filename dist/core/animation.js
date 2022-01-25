"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAnimatedValueXY = exports.useAnimatedValue = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var useAnimatedValue = function (value) {
    return (0, react_1.useRef)(new react_native_1.Animated.Value(value)).current;
};
exports.useAnimatedValue = useAnimatedValue;
var useAnimatedValueXY = function (x, y) {
    return (0, react_1.useRef)(new react_native_1.Animated.ValueXY({ x: x, y: y })).current;
};
exports.useAnimatedValueXY = useAnimatedValueXY;
//# sourceMappingURL=animation.js.map