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
import React, { useImperativeHandle, useRef, useState } from 'react';
import { LayoutAnimation, ScrollView as RNScrollView, TextInput, useWindowDimensions, View, } from 'react-native';
import { useKeyboardHeight } from 'react-native-universal-keyboard';
import { useTheme } from '../core/theme';
export const ScrollView = React.forwardRef((_a, ref) => {
    var { keyboardAvoiding = false, keyboardAvoidingDuration = 200, bottomInset: initialBottomInset = 0, onMomentumScrollEnd, children } = _a, props = __rest(_a, ["keyboardAvoiding", "keyboardAvoidingDuration", "bottomInset", "onMomentumScrollEnd", "children"]);
    const theme = useTheme();
    const dimensions = useWindowDimensions();
    const scrollView = useRef(null);
    const scrollPosition = useRef(0);
    const [bottomInset, setBottomInset] = useState(initialBottomInset);
    useImperativeHandle(ref, () => scrollView.current);
    useKeyboardHeight(keyboardHeight => {
        if (keyboardAvoiding) {
            LayoutAnimation.configureNext(Object.assign(Object.assign({}, LayoutAnimation.Presets.easeInEaseOut), { duration: keyboardAvoidingDuration }));
            setBottomInset(keyboardHeight > 0 ? keyboardHeight : initialBottomInset);
            if (keyboardHeight > 0) {
                TextInput.State.currentlyFocusedInput().measureInWindow((_x, y, _width, height) => {
                    const offset = y + height + theme.spacing * 2;
                    const delta = offset - (dimensions.height - keyboardHeight);
                    if (delta > 0) {
                        setTimeout(() => {
                            var _a;
                            (_a = scrollView.current) === null || _a === void 0 ? void 0 : _a.scrollTo({
                                y: scrollPosition.current + delta,
                            });
                        }, keyboardAvoidingDuration);
                    }
                });
            }
        }
    });
    return (<RNScrollView ref={scrollView} onMomentumScrollEnd={event => {
            scrollPosition.current = event.nativeEvent.contentOffset.y;
            onMomentumScrollEnd === null || onMomentumScrollEnd === void 0 ? void 0 : onMomentumScrollEnd(event);
        }} {...props}>
        {children}
        <View style={{ height: bottomInset }}/>
      </RNScrollView>);
});
