import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, useWindowDimensions, } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated';
import { useTheme } from '../core/theme';
import { Portal } from './portal';
export const Modal = ({ children, zIndex = 100, dismissible = true, backdrop = true, transition = 'fade', style, visible, transitionDuration: duration = 400, onBackdropPressed, onDismiss, onUnmounted, }) => {
    const theme = useTheme();
    const dimensions = useWindowDimensions();
    const animation = useSharedValue(visible ? 1 : 0);
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
            animation.value = withTiming(0, { duration }, () => {
                setMounted(false);
                onUnmounted === null || onUnmounted === void 0 ? void 0 : onUnmounted();
            });
        }
    }, [visible, mounted]);
    const handleBackdropPress = () => {
        onBackdropPressed === null || onBackdropPressed === void 0 ? void 0 : onBackdropPressed();
        if (dismissible) {
            onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
        }
    };
    const animatedBackdropStyles = useAnimatedStyle(() => {
        return { opacity: animation.value };
    });
    const animatedTransitionStyles = useAnimatedStyle(() => {
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
                    zIndex,
                },
                animatedBackdropStyles,
            ]}/>
      </TouchableWithoutFeedback>);
    };
    const renderContent = () => {
        return (<Animated.View style={[
                {
                    zIndex: zIndex + 1,
                },
                animatedTransitionStyles,
                style,
            ]}>
        {children}
      </Animated.View>);
    };
    if (!mounted) {
        return null;
    }
    return (<Portal>
      {renderBackdrop()}
      {renderContent()}
    </Portal>);
};
