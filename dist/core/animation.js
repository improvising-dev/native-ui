import { useRef } from 'react';
import { Animated } from 'react-native';
export const useAnimatedValue = (value) => {
    return useRef(new Animated.Value(value)).current;
};
export const useAnimatedValueXY = (value) => {
    return useRef(new Animated.ValueXY(value)).current;
};
