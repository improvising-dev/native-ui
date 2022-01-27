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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Picker = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var haptics_1 = require("../actions/haptics");
var theme_1 = require("../core/theme");
var Picker = function (_a) {
    var style = _a.style, _b = _a.items, items = _b === void 0 ? [] : _b, selectedValue = _a.selectedValue, onValueChange = _a.onValueChange, height = _a.height, _c = _a.itemHeight, itemHeight = _c === void 0 ? 50 : _c, props = __rest(_a, ["style", "items", "selectedValue", "onValueChange", "height", "itemHeight"]);
    var theme = (0, theme_1.useTheme)();
    var wrapperHeight = height !== null && height !== void 0 ? height : itemHeight * 5;
    var _d = (0, react_1.useState)(selectedValue), value = _d[0], setValue = _d[1];
    var lastHapticFeedbackIndex = (0, react_1.useRef)();
    var _renderItem = function (item) {
        var isSelected = item.value === value;
        return (<react_native_1.View key={item.value} style={{
                height: itemHeight,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
        <react_native_1.Text style={__assign(__assign({}, theme.textStyles.picker.title), { color: isSelected
                    ? theme.colors.text.primary
                    : theme.colors.text.primaryUnselected })}>
          {item.title}
        </react_native_1.Text>
        {item.subtitle && (<react_native_1.Text style={__assign(__assign({}, theme.textStyles.picker.subtitle), { marginTop: 2, color: isSelected
                        ? theme.colors.text.secondary
                        : theme.colors.text.secondaryUnselected })}>
            {item.subtitle}
          </react_native_1.Text>)}
      </react_native_1.View>);
    };
    var handleScroll = function (event) {
        var y = event.nativeEvent.contentOffset.y;
        var index = Math.round(y / itemHeight);
        var item = items[index];
        if (item && item.value !== value) {
            if (index !== lastHapticFeedbackIndex.current) {
                haptics_1.HapticFeedback.selectionClick();
                lastHapticFeedbackIndex.current = index;
            }
            setValue(item.value);
            onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(item.value);
        }
    };
    var handleMomentumScrollEnd = function (event) {
        var y = event.nativeEvent.contentOffset.y;
        var index = Math.round(y / itemHeight);
        var item = items[index];
        if (item && item.value !== value) {
            setValue(item.value);
            onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(item.value);
        }
    };
    var snapToOffsets = (0, react_1.useMemo)(function () {
        var offsets = [];
        for (var i = 0; i < items.length; i++) {
            offsets.push(i * itemHeight);
        }
        return offsets;
    }, [items, itemHeight]);
    var placeholder = (0, react_1.useMemo)(function () {
        var height = (wrapperHeight - itemHeight) / 2;
        return <react_native_1.View style={{ height: height, flex: 1 }}/>;
    }, [wrapperHeight, itemHeight]);
    return (<react_native_1.View style={__assign({ overflow: 'hidden' }, style)} {...props}>
      <react_native_1.View style={{
            position: 'absolute',
            top: (wrapperHeight - itemHeight) / 2,
            left: theme.sizes.spacing / 2,
            right: theme.sizes.spacing / 2,
            borderRadius: theme.sizes.borderRadius,
            height: itemHeight,
            backgroundColor: '#252525',
        }}/>
      <react_native_1.FlatList showsVerticalScrollIndicator={false} nestedScrollEnabled={true} onScroll={handleScroll} onMomentumScrollEnd={handleMomentumScrollEnd} snapToOffsets={snapToOffsets} ListHeaderComponent={placeholder} ListFooterComponent={placeholder} data={items} renderItem={function (_a) {
        var item = _a.item;
        return _renderItem(item);
    }} keyExtractor={function (item) { return item.value; }}/>
    </react_native_1.View>);
};
exports.Picker = Picker;
//# sourceMappingURL=picker.js.map