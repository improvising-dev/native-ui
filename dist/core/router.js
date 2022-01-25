"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterView = exports.Router = exports.navigationRef = void 0;
var native_1 = require("@react-navigation/native");
var native_stack_1 = require("@react-navigation/native-stack");
var react_1 = __importDefault(require("react"));
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
var RouterView = function (_a) {
    var initialRouteName = _a.initialRouteName, _b = _a.routes, routes = _b === void 0 ? [] : _b;
    return (<native_1.NavigationContainer ref={exports.navigationRef}>
      <Stack.Navigator initialRouteName={initialRouteName}>
        {routes.map(function (route) { return (<Stack.Screen key={route.name} name={route.name} component={route.component} options={route.options}/>); })}
      </Stack.Navigator>
    </native_1.NavigationContainer>);
};
exports.RouterView = RouterView;
//# sourceMappingURL=router.js.map