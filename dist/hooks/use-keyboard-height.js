"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKeyboardHeight = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var useKeyboardHeight = function () {
    var _a = (0, react_1.useState)(0), keyboardHeight = _a[0], setKeyboardHeight = _a[1];
    (0, react_1.useEffect)(function () {
        if (react_native_1.Platform.OS === 'ios') {
            react_native_1.Keyboard.addListener('keyboardWillShow', keyboardShow);
            react_native_1.Keyboard.addListener('keyboardWillHide', keyboardHide);
        }
        else {
            react_native_1.Keyboard.addListener('keyboardDidShow', keyboardShow);
            react_native_1.Keyboard.addListener('keyboardDidHide', keyboardHide);
        }
        return function () {
            if (react_native_1.Platform.OS === 'ios') {
                react_native_1.Keyboard.removeAllListeners('keyboardWillShow');
                react_native_1.Keyboard.removeAllListeners('keyboardWillHide');
            }
            else {
                react_native_1.Keyboard.removeAllListeners('keyboardDidShow');
                react_native_1.Keyboard.removeAllListeners('keyboardDidHide');
            }
        };
    }, []);
    var keyboardShow = function (frames) {
        setKeyboardHeight(frames.endCoordinates.height);
    };
    var keyboardHide = function () {
        setKeyboardHeight(0);
    };
    return keyboardHeight;
};
exports.useKeyboardHeight = useKeyboardHeight;
//# sourceMappingURL=use-keyboard-height.js.map