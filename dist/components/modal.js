import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, TouchableWithoutFeedback, useWindowDimensions, View, } from 'react-native';
import { PanGestureHandler, } from 'react-native-gesture-handler';
import Animated, { interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming, } from 'react-native-reanimated';
import { useTheme } from '../core/theme';
import { useBackHandler } from '../hooks/use-back-handler';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const Modal = ({ children, zIndex = 100, dismissible = true, backdrop = true, backdropStyle, style, visible, transition = 'fade', transitionDuration: duration = 400, enableDismissGesture, onBackdropPress, onDismiss, onUnmounted, onPress, }) => {
    const theme = useTheme();
    const dimensions = useWindowDimensions();
    const animation = useSharedValue(visible ? 1 : 0);
    const gestureX = useSharedValue(0);
    const gestureY = useSharedValue(0);
    const contentWidth = useRef(dimensions.width);
    const contentHeight = useRef(dimensions.height);
    const [mounted, setMounted] = useState(visible);
    useEffect(() => {
        if (visible) {
            if (mounted) {
                animation.value = withTiming(1, { duration });
            }
            else {
                requestAnimationFrame(() => setMounted(true));
            }
        }
        else if (mounted) {
            animation.value = withTiming(0, { duration });
            setTimeout(() => {
                setMounted(false);
                onUnmounted === null || onUnmounted === void 0 ? void 0 : onUnmounted();
            }, duration);
        }
    }, [visible, mounted]);
    useBackHandler(() => {
        if (dismissible) {
            onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
        }
        return true;
    }, [dismissible]);
    const handleContentLayout = (event) => {
        contentWidth.current = event.nativeEvent.layout.width;
        contentHeight.current = event.nativeEvent.layout.height;
    };
    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = gestureX.value;
            ctx.startY = gestureY.value;
        },
        onActive: (event, ctx) => {
            switch (transition) {
                case 'slide-up':
                    if (event.translationY > 0) {
                        gestureY.value = ctx.startY + event.translationY;
                    }
                    break;
                case 'slide-down':
                    if (event.translationY < 0) {
                        gestureY.value = ctx.startY + event.translationY;
                    }
                    break;
                case 'slide-left':
                    if (event.translationX > 0) {
                        gestureX.value = ctx.startX + event.translationX;
                    }
                    break;
                case 'slide-right':
                    if (event.translationX < 0) {
                        gestureX.value = ctx.startX + event.translationX;
                    }
                    break;
            }
        },
        onEnd: () => {
            switch (transition) {
                case 'slide-up':
                    if (Math.abs(gestureY.value) > contentHeight.current / 3) {
                        gestureY.value = withSpring(contentHeight.current);
                        runOnJS(() => onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss());
                    }
                    else {
                        gestureY.value = withSpring(0);
                    }
                    break;
                case 'slide-down':
                    if (Math.abs(gestureY.value) > contentHeight.current / 3) {
                        gestureY.value = withSpring(-contentHeight.current);
                        runOnJS(() => onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss());
                    }
                    else {
                        gestureY.value = withSpring(0);
                    }
                    break;
                case 'slide-left':
                    if (Math.abs(gestureX.value) > contentWidth.current / 3) {
                        gestureX.value = withSpring(contentWidth.current);
                        runOnJS(() => onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss());
                    }
                    else {
                        gestureX.value = withSpring(0);
                    }
                    break;
                case 'slide-right':
                    if (Math.abs(gestureX.value) > contentWidth.current / 3) {
                        gestureX.value = withSpring(-contentWidth.current);
                        runOnJS(() => onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss());
                    }
                    else {
                        gestureX.value = withSpring(0);
                    }
                    break;
            }
        },
    });
    const handleBackdropPress = () => {
        onBackdropPress === null || onBackdropPress === void 0 ? void 0 : onBackdropPress();
        if (dismissible) {
            onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
        }
    };
    const animatedBackdropStyle = useAnimatedStyle(() => {
        return { opacity: animation.value };
    });
    const animatedGestureStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: gestureY.value,
                },
            ],
        };
    });
    const animatedTransitionStyle = useAnimatedStyle(() => {
        if (transition === 'slide-up') {
            return {
                transform: [
                    {
                        translateY: interpolate(animation.value, [0, 1], [dimensions.height, 0]),
                    },
                ],
            };
        }
        if (transition === 'slide-down') {
            return {
                transform: [
                    {
                        translateY: interpolate(animation.value, [0, 1], [-dimensions.height, 0]),
                    },
                ],
            };
        }
        if (transition === 'slide-left') {
            return {
                transform: [
                    {
                        translateY: interpolate(animation.value, [0, 1], [dimensions.width, 0]),
                    },
                ],
            };
        }
        if (transition === 'slide-right') {
            return {
                transform: [
                    {
                        translateY: interpolate(animation.value, [0, 1], [-dimensions.width, 0]),
                    },
                ],
            };
        }
        if (transition === 'scale') {
            return {
                opacity: animation.value,
                transform: [
                    {
                        scale: interpolate(animation.value, [0, 1], [0.9, 1]),
                    },
                ],
            };
        }
        return { opacity: animation.value };
    });
    const renderBackdrop = () => {
        if (!backdrop) {
            return null;
        }
        return (<TouchableWithoutFeedback onPress={handleBackdropPress}>
        <Animated.View style={[
                StyleSheet.absoluteFill,
                {
                    backgroundColor: theme.backgroundColor.modalBarrier,
                    zIndex: 0,
                },
                backdropStyle,
                animatedBackdropStyle,
            ]}/>
      </TouchableWithoutFeedback>);
    };
    const renderContent = () => {
        return (<PanGestureHandler enabled={enableDismissGesture} onGestureEvent={gestureHandler}>
        <AnimatedPressable onPress={onPress} onLayout={handleContentLayout} style={[
                { zIndex: 1 },
                animatedTransitionStyle,
                animatedGestureStyle,
                style,
            ]}>
          {children}
        </AnimatedPressable>
      </PanGestureHandler>);
    };
    if (!mounted) {
        return null;
    }
    return (<View style={[StyleSheet.absoluteFill, { zIndex }]} collapsable={false} pointerEvents="box-none">
      {renderBackdrop()}
      {renderContent()}
    </View>);
};
