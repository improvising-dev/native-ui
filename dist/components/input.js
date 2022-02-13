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
import React, { memo, useEffect, useImperativeHandle, useRef, useState, } from 'react';
import { Pressable, TextInput, } from 'react-native';
import { useTheme } from '../core/theme';
const InputComponent = React.forwardRef((_a, ref) => {
    var _b;
    var { autoFocus, autoFocusDelay = 0, multiline, style, textStyle, prefix, prefixMode = 'always', suffix, suffixMode = 'always', value: controlledValue, defaultValue, placeholderTextColor, underlineColorAndroid = 'transparent', onChangeText, onContentSizeChange } = _a, textInputProps = __rest(_a, ["autoFocus", "autoFocusDelay", "multiline", "style", "textStyle", "prefix", "prefixMode", "suffix", "suffixMode", "value", "defaultValue", "placeholderTextColor", "underlineColorAndroid", "onChangeText", "onContentSizeChange"]);
    const theme = useTheme();
    const textInput = useRef(null);
    const [value, setValue] = useState((_b = controlledValue !== null && controlledValue !== void 0 ? controlledValue : defaultValue) !== null && _b !== void 0 ? _b : '');
    const [height, setHeight] = useState();
    useImperativeHandle(ref, () => textInput.current);
    useEffect(() => {
        if (controlledValue !== undefined && value !== controlledValue) {
            setValue(controlledValue);
        }
    }, [controlledValue]);
    useEffect(() => {
        if (autoFocusDelay > 0 && autoFocus) {
            setTimeout(() => { var _a; return (_a = textInput.current) === null || _a === void 0 ? void 0 : _a.focus(); }, autoFocusDelay);
        }
    }, [autoFocus, autoFocusDelay]);
    return (<Pressable style={[
            {
                flexDirection: 'row',
                alignItems: 'center',
            },
            style,
        ]} onPress={() => { var _a; return (_a = textInput.current) === null || _a === void 0 ? void 0 : _a.focus(); }}>
        {prefixMode === 'always' ||
            (prefixMode === 'editing' && value.length > 0) ||
            (prefixMode === 'not-editing' && value.length === 0)
            ? prefix
            : null}

        <TextInput ref={textInput} autoFocus={autoFocusDelay > 0 ? false : autoFocus} value={controlledValue} defaultValue={defaultValue} multiline={multiline} selectionColor={theme.primaryColor} style={[
            theme.textTheme.default,
            {
                flex: 1,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                height,
            },
            textStyle,
        ]} placeholderTextColor={placeholderTextColor !== null && placeholderTextColor !== void 0 ? placeholderTextColor : theme.textColor.placeholder} underlineColorAndroid={underlineColorAndroid} onChangeText={value => {
            setValue(value);
            onChangeText === null || onChangeText === void 0 ? void 0 : onChangeText(value);
        }} onContentSizeChange={event => {
            if (multiline) {
                setHeight(event.nativeEvent.contentSize.height);
            }
            onContentSizeChange === null || onContentSizeChange === void 0 ? void 0 : onContentSizeChange(event);
        }} {...textInputProps}/>

        {suffixMode === 'always' ||
            (suffixMode === 'editing' && value.length > 0) ||
            (suffixMode === 'not-editing' && value.length === 0)
            ? suffix
            : null}
      </Pressable>);
});
export const Input = memo(InputComponent);
