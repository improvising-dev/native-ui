import React from 'react';
import { Animated, Pressable, Text, } from 'react-native';
import { HapticFeedback } from '../actions/haptic-feedback';
import { useAnimatedValue } from '../core/animation';
import { useTheme } from '../core/theme';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const Button = ({ children, style, textStyle, haptic = false, disabled = false, onPressed, }) => {
    const animatedValue = useAnimatedValue(0);
    const theme = useTheme();
    const handlePress = () => {
        if (haptic) {
            HapticFeedback.lightImpact();
        }
        onPressed === null || onPressed === void 0 ? void 0 : onPressed();
    };
    return (<AnimatedPressable onPress={handlePress} onPressIn={() => {
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: false,
            }).start();
        }} onPressOut={() => {
            setTimeout(() => {
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: false,
                }).start();
            }, 200);
        }} onTouchCancel={() => {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }} disabled={disabled} style={[
            {
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: theme.borderRadius,
                padding: theme.spacing,
                backgroundColor: theme.primaryColor,
                opacity: disabled ? 0.7 : 1,
            },
            style,
        ]}>
      {typeof children === 'string' ? (<Text style={Object.assign(Object.assign({ color: theme.primaryContrastingColor }, theme.textTheme.button), textStyle)}>
          {children}
        </Text>) : (children)}
      <Animated.View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            backgroundColor: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: theme.brightness === 'light'
                    ? ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, .05)']
                    : ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, .05)'],
            }),
        }}/>
    </AnimatedPressable>);
};
