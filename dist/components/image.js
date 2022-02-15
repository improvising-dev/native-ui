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
import { Image as RNImage, Platform, } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated';
const ImageComponentAndroid = (_a) => {
    var { fadeDuration = 200 } = _a, imageProps = __rest(_a, ["fadeDuration"]);
    return <RNImage fadeDuration={fadeDuration} {...imageProps}/>;
};
const ImageComponent = (_a) => {
    var { fadeDuration = 200, style, onLoadEnd } = _a, imageProps = __rest(_a, ["fadeDuration", "style", "onLoadEnd"]);
    const animatedOpacity = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: animatedOpacity.value,
        };
    });
    const handleLoadEnd = () => {
        const minimumWait = 100;
        const staggerNonce = 200 * Math.random();
        setTimeout(() => {
            animatedOpacity.value = withTiming(1, { duration: fadeDuration });
        }, minimumWait + staggerNonce);
        onLoadEnd === null || onLoadEnd === void 0 ? void 0 : onLoadEnd();
    };
    return (<Animated.Image style={[animatedStyle, style]} onLoadEnd={handleLoadEnd} {...imageProps}/>);
};
export const Image = memo(Platform.select({
    android: ImageComponentAndroid,
    default: ImageComponent,
}));
