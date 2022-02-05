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
import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { TextPadding } from '../core/layout';
import { useTheme } from '../core/theme';
export const Input = (_a) => {
    var _b;
    var { multiline, style, textPadding = TextPadding.zero, placeholderTextColor, underlineColorAndroid = 'transparent', onContentSizeChange } = _a, props = __rest(_a, ["multiline", "style", "textPadding", "placeholderTextColor", "underlineColorAndroid", "onContentSizeChange"]);
    const theme = useTheme();
    const [height, setHeight] = useState();
    const updateLayoutHeight = (contentHeight) => {
        setHeight(contentHeight + textPadding.vertical);
    };
    return (<TextInput multiline={multiline} selectionColor={theme.primaryColor} style={[theme.textTheme.default, style, textPadding.build(), { height }]} placeholderTextColor={(_b = theme.textColor.placeholder) !== null && _b !== void 0 ? _b : placeholderTextColor} underlineColorAndroid={underlineColorAndroid} onContentSizeChange={event => {
            if (multiline) {
                updateLayoutHeight(event.nativeEvent.contentSize.height);
            }
            onContentSizeChange === null || onContentSizeChange === void 0 ? void 0 : onContentSizeChange(event);
        }} {...props}/>);
};
