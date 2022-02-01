"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLoading = void 0;
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var AppLoading = function (_a) {
    var loadAsync = _a.loadAsync, onComplete = _a.onComplete, onError = _a.onError;
    var colorScheme = (0, react_native_1.useColorScheme)();
    var backgroundColor = colorScheme === 'dark' ? '#000000' : '#ffffff';
    var activityIndicatorColor = colorScheme === 'dark' ? '#ffffff' : '#000000';
    var handleLayout = function () {
        loadAsync().then(onComplete).catch(onError);
    };
    return (<react_native_1.View onLayout={handleLayout} style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: backgroundColor,
        }}>
      <react_native_1.ActivityIndicator color={activityIndicatorColor}/>
    </react_native_1.View>);
};
exports.AppLoading = AppLoading;
//# sourceMappingURL=app-loading.js.map