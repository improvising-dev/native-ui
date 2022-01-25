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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterView = exports.Router = exports.navigationRef = void 0;
var native_1 = require("@react-navigation/native");
var react_1 = __importStar(require("react"));
var native_stack_1 = require("@react-navigation/native-stack");
exports.navigationRef = (0, native_1.createNavigationContainerRef)();
var Router = /** @class */ (function () {
    function Router() {
    }
    Router.push = function (name, params) {
        if (exports.navigationRef.isReady()) {
            exports.navigationRef.dispatch(native_1.StackActions.push(name, params));
        }
    };
    Router.replace = function (name, params) {
        if (exports.navigationRef.isReady()) {
            exports.navigationRef.dispatch(native_1.StackActions.replace(name, params));
        }
    };
    Router.reset = function (name, params) {
        if (exports.navigationRef.isReady()) {
            exports.navigationRef.dispatch(native_1.StackActions.popToTop());
            exports.navigationRef.dispatch(native_1.StackActions.replace(name, params));
        }
    };
    Router.pop = function () {
        if (exports.navigationRef.isReady()) {
            exports.navigationRef.dispatch(native_1.StackActions.pop());
        }
    };
    return Router;
}());
exports.Router = Router;
var Stack = (0, native_stack_1.createNativeStackNavigator)();
exports.RouterView = (0, react_1.memo)(function (_a) {
    var initialRouteName = _a.initialRouteName, _b = _a.routes, routes = _b === void 0 ? [] : _b;
    return (<native_1.NavigationContainer ref={exports.navigationRef}>
        <Stack.Navigator initialRouteName={initialRouteName}>
          {routes.map(function (route) { return (<Stack.Screen name={route.name} component={route.component} options={route.options}/>); })}
        </Stack.Navigator>
      </native_1.NavigationContainer>);
});
//# sourceMappingURL=router.js.map