import React from 'react';
import { Pressable, Text, } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withDelay, withTiming, } from 'react-native-reanimated';
import { HapticFeedback } from '../actions/haptic-feedback';
import { useTheme } from '../core/theme';
export const Button = React.forwardRef(({ children, style, textStyle, haptic = false, disabled = false, onPress }, ref) => {
    const theme = useTheme();
    const touchableProgress = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(touchableProgress.value, [0, 1], theme.brightness === 'light'
                ? ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, .05)']
                : ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, .05)']),
        };
    });
    const handlePress = () => {
        if (haptic) {
            HapticFeedback.lightImpact();
        }
        onPress === null || onPress === void 0 ? void 0 : onPress();
    };
    const handlePressIn = () => {
        touchableProgress.value = withTiming(1, { duration: 100 });
    };
    const handlePressOut = () => {
        touchableProgress.value = withDelay(200, withTiming(0, { duration: 150 }));
    };
    const handleTouchCancel = () => {
        touchableProgress.value = withTiming(0, { duration: 100 });
    };
    return (<Pressable ref={ref} onPress={handlePress} onPressIn={handlePressIn} onPressOut={handlePressOut} onTouchCancel={handleTouchCancel} disabled={disabled} style={[
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
        {typeof children === 'string' ? (<Text style={[
                theme.textTheme.button,
                {
                    color: theme.primaryContrastingColor,
                },
                textStyle,
            ]}>
            {children}
          </Text>) : (children)}
        <Animated.View style={[
            {
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1,
            },
            animatedStyles,
        ]}/>
      </Pressable>);
});
