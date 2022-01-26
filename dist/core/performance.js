"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Performance = void 0;
var react_native_1 = require("react-native");
exports.Performance = {
    animation: {
        useNativeDriver: react_native_1.Platform.OS !== 'android',
    },
};
//# sourceMappingURL=performance.js.map