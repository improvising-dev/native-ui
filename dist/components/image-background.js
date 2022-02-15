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
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from './image';
export const ImageBackground = (_a) => {
    var { style, imageStyle, children } = _a, imageProps = __rest(_a, ["style", "imageStyle", "children"]);
    const flattenedStyle = StyleSheet.flatten(style);
    return (<View accessibilityIgnoresInvertColors={true} style={style}>
      <Image style={[
            StyleSheet.absoluteFill,
            {
                width: flattenedStyle === null || flattenedStyle === void 0 ? void 0 : flattenedStyle.width,
                height: flattenedStyle === null || flattenedStyle === void 0 ? void 0 : flattenedStyle.height,
            },
            imageStyle,
        ]} {...imageProps}/>
      <View>{children}</View>
    </View>);
};
