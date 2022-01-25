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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Stack = function (_a) {
    var direction = _a.direction, align = _a.align, justify = _a.justify, style = _a.style, spacing = _a.spacing, children = _a.children;
    var items = (0, react_1.useMemo)(function () {
        if (!spacing) {
            return children;
        }
        var builder = [];
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            builder.push(<react_native_1.View style={direction === 'row' || direction === 'row-reverse'
                    ? { width: spacing }
                    : { height: spacing }}/>);
            builder.push(child);
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