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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portal = exports.PortalProvider = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var use_portalize_key_1 = require("../hooks/use-portalize-key");
var PortalManager = react_1.default.forwardRef(function (_, ref) {
    var _a = (0, react_1.useState)([]), portals = _a[0], setPortals = _a[1];
    (0, react_1.useImperativeHandle)(ref, function () { return ({
        mount: function (key, children) {
            setPortals(function (prev) { return __spreadArray(__spreadArray([], prev, true), [{ key: key, children: children }], false); });
        },
        update: function (key, children) {
            setPortals(function (prev) {
                return prev.map(function (item) {
                    if (item.key === key) {
                        return __assign(__assign({}, item), { children: children });
                    }
                    return item;
                });
            });
        },
        unmount: function (key) {
            setPortals(function (prev) { return prev.filter(function (item) { return item.key !== key; }); });
        },
    }); });
    return (<>
      {portals.map(function (_a, index) {
            var key = _a.key, children = _a.children;
            return (<react_native_1.View key={"react-native-portalize-".concat(key, "-").concat(index)} collapsable={false} pointerEvents="box-none" style={react_native_1.StyleSheet.absoluteFill}>
          {children}
        </react_native_1.View>);
        })}
    </>);
});
var portalContext = react_1.default.createContext({});
var PortalProvider = function (_a) {
    var style = _a.style, children = _a.children;
    var managerRef = react_1.default.useRef(null);
    var queue = [];
    var _b = (0, use_portalize_key_1.usePortalizeKey)(), generateKey = _b.generateKey, removeKey = _b.removeKey;
    react_1.default.useEffect(function () {
        var _a, _b, _c;
        while (queue.length && managerRef.current) {
            var action = queue.pop();
            if (action) {
                switch (action.type) {
                    case 'mount':
                        (_a = managerRef.current) === null || _a === void 0 ? void 0 : _a.mount(action.key, action.children);
                        break;
                    case 'update':
                        (_b = managerRef.current) === null || _b === void 0 ? void 0 : _b.update(action.key, action.children);
                        break;
                    case 'unmount':
                        (_c = managerRef.current) === null || _c === void 0 ? void 0 : _c.unmount(action.key);
                        break;
                }
            }
        }
    }, []);
    var mount = function (children) {
        var key = generateKey();
        if (managerRef.current) {
            managerRef.current.mount(key, children);
        }
        else {
            queue.push({ type: 'mount', key: key, children: children });
        }
        return key;
    };
    var update = function (key, children) {
        if (managerRef.current) {
            managerRef.current.update(key, children);
        }
        else {
            var op = { type: 'mount', key: key, children: children };
            var index = queue.findIndex(function (o) { return o.type === 'mount' || (o.type === 'update' && o.key === key); });
            if (index > -1) {
                queue[index] = op;
            }
            else {
                queue.push(op);
            }
        }
    };
    var unmount = function (key) {
        if (managerRef.current) {
            managerRef.current.unmount(key);
            removeKey(key);
        }
        else {
            queue.push({ type: 'unmount', key: key });
        }
    };
    return (<portalContext.Provider value={{ mount: mount, update: update, unmount: unmount }}>
      <react_native_1.View style={[{ flex: 1 }, style]} collapsable={false} pointerEvents="box-none">
        {children}
      </react_native_1.View>

      <PortalManager ref={managerRef}/>
    </portalContext.Provider>);
};
exports.PortalProvider = PortalProvider;
var Consumer = function (_a) {
    var children = _a.children, context = _a.context;
    var key = (0, react_1.useRef)();
    var checkManager = function () {
        if (!context) {
            throw new Error('No portal context defined');
        }
    };
    var handleInit = function () {
        checkManager();
        key.current = context === null || context === void 0 ? void 0 : context.mount(children);
    };
    (0, react_1.useEffect)(function () {
        checkManager();
        context === null || context === void 0 ? void 0 : context.update(key.current, children);
    }, [children, context]);
    (0, react_1.useEffect)(function () {
        handleInit();
        return function () {
            checkManager();
            context === null || context === void 0 ? void 0 : context.unmount(key.current);
        };
    }, []);
    return null;
};
var Portal = function (_a) {
    var children = _a.children;
    return (<portalContext.Consumer>
    {function (context) { return <Consumer context={context}>{children}</Consumer>; }}
  </portalContext.Consumer>);
};
exports.Portal = Portal;
//# sourceMappingURL=portal.js.map