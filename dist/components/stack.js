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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var Stack = function (_a) {
    var direction = _a.direction, align = _a.align, justify = _a.justify, style = _a.style, spacing = _a.spacing, children = _a.children;
    var items = (0, react_1.useMemo)(function () {
        if (!spacing) {
            return children;
        }
        var builder = [];
        var index = 0;
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            builder.push(<react_native_1.View key={index} style={direction === 'row' || direction === 'row-reverse'
                    ? { width: spacing }
                    : { height: spacing }}/>);
            index++;
            builder.push(<react_1.default.Fragment key={index}>{child}</react_1.default.Fragment>);
            index++;
        }
        builder.shift();
        return builder;
    }, [children]);
    return (<react_native_1.View style={__assign({ flexDirection: direction, alignItems: align, justifyContent: justify }, style)}>
      {items}
    </react_native_1.View>);
};
exports.Stack = Stack;
//# sourceMappingURL=stack.js.map