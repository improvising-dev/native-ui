"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppProvider = exports.useApp = void 0;
var expo_app_loading_1 = __importDefault(require("expo-app-loading"));
var react_1 = __importStar(require("react"));
var react_native_portalize_1 = require("react-native-portalize");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var fullscreen_loading_delegate_1 = __importDefault(require("../components/fullscreen-loading-delegate"));
var router_1 = require("./router");
var theme_1 = require("./theme");
var appContext = react_1.default.createContext({});
var useApp = function () { return (0, react_1.useContext)(appContext); };
exports.useApp = useApp;
exports.AppProvider = (0, react_1.memo)(function (_a) {
    var _b = _a.loadAsync, loadAsync = _b === void 0 ? function () { return Promise.resolve(); } : _b, theme = _a.theme, darkTheme = _a.darkTheme, initialRouteName = _a.initialRouteName, routes = _a.routes;
    var _c = (0, react_1.useState)(false), appIsReady = _c[0], setAppIsReady = _c[1];
    if (!appIsReady) {
        return (<appContext.Provider value={{ appIsReady: appIsReady }}>
          <expo_app_loading_1.default startAsync={loadAsync} onFinish={function () { return setAppIsReady(true); }} onError={console.warn}/>
        </appContext.Provider>);
    }
    return (<appContext.Provider value={{ appIsReady: appIsReady }}>
        <react_native_safe_area_context_1.SafeAreaProvider>
          <theme_1.ThemeProvider theme={theme} darkTheme={darkTheme}>
            <react_native_portalize_1.Host>
              <router_1.RouterView initialRouteName={initialRouteName} routes={routes}/>
              <fullscreen_loading_delegate_1.default />
            </react_native_portalize_1.Host>
          </theme_1.ThemeProvider>
        </react_native_safe_area_context_1.SafeAreaProvider>
      </appContext.Provider>);
});
//# sourceMappingURL=app.js.map