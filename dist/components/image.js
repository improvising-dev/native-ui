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
import React, { memo } from 'react';
import { Image as RNImage, Platform, StyleSheet, View, } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated';
import { useTheme } from '../core/theme';
const ImageComponentAndroid = (_a) => {
    var { fadeDuration = 200, style, containerStyle } = _a, imageProps = __rest(_a, ["fadeDuration", "style", "containerStyle"]);
    const theme = useTheme();
    return (<View style={[
            {
                overflow: 'hidden',
                backgroundColor: theme.backgroundColor.fill,
            },
            containerStyle,
        ]}>
      <RNImage fadeDuration={fadeDuration} style={[StyleSheet.absoluteFill, style]} {...imageProps}/>
    </View>);
};
const ImageComponent = (_a) => {
    var { fadeDuration = 200, style, containerStyle, onLoad } = _a, imageProps = __rest(_a, ["fadeDuration", "style", "containerStyle", "onLoad"]);
    const theme = useTheme();
    const animatedOpacity = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: animatedOpacity.value,
        };
    });
    const handleLoad = (event) => {
        const minimumWait = 100;
        const staggerNonce = 200 * Math.random();
        setTimeout(() => {
            animatedOpacity.value = withTiming(1, { duration: fadeDuration });
        }, minimumWait + staggerNonce);
        onLoad === null || onLoad === void 0 ? void 0 : onLoad(event);
    };
    return (<View style={[
            {
                overflow: 'hidden',
                backgroundColor: theme.backgroundColor.fill,
            },
            containerStyle,
        ]}>
      <Animated.Image style={[StyleSheet.absoluteFill, animatedStyle, style]} onLoad={handleLoad} {...imageProps}/>
    </View>);
};
export const Image = memo(Platform.select({
    android: ImageComponentAndroid,
    default: ImageComponent,
}));
