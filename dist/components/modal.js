import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, useWindowDimensions, } from 'react-native';
import { useAnimatedValue } from '../core/animation';
import { Performance } from '../core/performance';
import { useTheme } from '../core/theme';
import { Portal } from './portal';
export const Modal = ({ children, zIndex = 100, dismissible = true, backdrop = true, transition = 'fade', to = 'top', style, useNativeDriver = Performance.animation.useNativeDriver, visible, duration = 400, onBackdropPressed, onDismiss, onUnmounted, }) => {
    const theme = useTheme();
    const dimensions = useWindowDimensions();
    const value = useAnimatedValue(visible ? 1 : 0);
    const [mounted, setMounted] = useState(visible);
    useEffect(() => {
        if (visible) {
            if (mounted) {
                Animated.timing(value, {
                    toValue: 1,
                    duration,
                    useNativeDriver,
                }).start();
            }
            else {
                requestAnimationFrame(() => setMounted(true));
            }
        }
        else if (mounted) {
            Animated.timing(value, {
                toValue: 0,
                duration,
                useNativeDriver,
            }).start();
            setTimeout(() => {
                setMounted(false);
                onUnmounted?.();
            }, duration);
        }
    }, [visible, mounted]);
    if (!mounted) {
        return <></>;
    }
    const handleBackdropPress = () => {
        onBackdropPressed?.();
        if (dismissible) {
            onDismiss?.();
        }
    };
    const renderBackdrop = () => {
        if (!backdrop) {
            return <></>;
        }
        return (<TouchableWithoutFeedback onPress={handleBackdropPress}>
        <Animated.View style={[
                StyleSheet.absoluteFill,
                {
                    backgroundColor: theme.backgroundColor.modalBarrier,
                    zIndex,
                    opacity: value,
                },
            ]}/>
      </TouchableWithoutFeedback>);
    };
    const renderContent = () => {
        if (transition === 'slide') {
            return (<Animated.View style={[
                    {
                        zIndex: zIndex + 1,
                        transform: [
                            to === 'top'
                                ? {
                                    translateY: value.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [dimensions.height, 0],
                                    }),
                                }
                                : to === 'bottom'
                                    ? {
                                        translateY: value.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [-dimensions.height, 0],
                                        }),
                                    }
                                    : to === 'left'
                                        ? {
                                            translateX: value.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [dimensions.width, 0],
                                            }),
                                        }
                                        : {
                                            translateX: value.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [-dimensions.width, 0],
                                            }),
                                        },
                        ],
                    },
                    style,
                ]}>
          {children}
        </Animated.View>);
        }
        else if (transition === 'scale') {
            return (<Animated.View style={[
                    {
                        zIndex: zIndex + 1,
                        opacity: value,
                        transform: [
                            {
                                scale: value.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.8, 1],
                                }),
                            },
                        ],
                    },
                    style,
                ]}>
          {children}
        </Animated.View>);
        }
        else {
            return (<Animated.View style={[
                    {
                        zIndex: zIndex + 1,
                        opacity: value,
                    },
                    style,
                ]}>
          {children}
        </Animated.View>);
        }
    };
    return (<Portal>
      {renderBackdrop()}
      {renderContent()}
    </Portal>);
};
