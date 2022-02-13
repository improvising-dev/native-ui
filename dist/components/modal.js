import React, { useRef } from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View, } from 'react-native';
import { PanGestureHandler, } from 'react-native-gesture-handler';
import Animated, { FadeIn, FadeOut, runOnJS, SlideInDown, SlideInLeft, SlideInRight, SlideInUp, SlideOutDown, SlideOutLeft, SlideOutRight, SlideOutUp, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming, ZoomIn, ZoomOut, } from 'react-native-reanimated';
import { useTheme } from '../core/theme';
import { useBackHandler } from '../hooks/use-back-handler';
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
export const Modal = ({ children, zIndex = 100, dismissible = true, backdrop = true, backdropStyle, style, visible, transition = 'fade', transitionDuration: duration = 400, enableDismissGesture, onBackdropPress, onDismiss, onUnmounted = () => { }, onPress, }) => {
    const theme = useTheme();
    const dimensions = useWindowDimensions();
    const gestureX = useSharedValue(0);
    const gestureY = useSharedValue(0);
    const contentWidth = useRef(dimensions.width);
    const contentHeight = useRef(dimensions.height);
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
    const handleGestureEvent = useAnimatedGestureHandler({
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
                        gestureY.value = withTiming(contentHeight.current, {}, () => {
                            'worklet';
                            runOnJS(onUnmounted)();
                        });
                    }
                    else {
                        gestureY.value = withTiming(0);
                    }
                    break;
                case 'slide-down':
                    if (Math.abs(gestureY.value) > contentHeight.current / 3) {
                        gestureY.value = withTiming(-contentHeight.current, {}, () => {
                            'worklet';
                            runOnJS(onUnmounted)();
                        });
                    }
                    else {
                        gestureY.value = withTiming(0);
                    }
                    break;
                case 'slide-left':
                    if (Math.abs(gestureX.value) > contentWidth.current / 3) {
                        gestureX.value = withTiming(contentWidth.current, {}, () => {
                            'worklet';
                            runOnJS(onUnmounted)();
                        });
                    }
                    else {
                        gestureX.value = withTiming(0);
                    }
                    break;
                case 'slide-right':
                    if (Math.abs(gestureX.value) > contentWidth.current / 3) {
                        gestureX.value = withTiming(-contentWidth.current, {}, () => {
                            'worklet';
                            runOnJS(onUnmounted)();
                        });
                    }
                    else {
                        gestureX.value = withTiming(0);
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
    const getAnimation = () => {
        switch (transition) {
            case 'slide-up':
                return {
                    entering: SlideInDown.duration(duration),
                    exiting: SlideOutDown.duration(duration).withCallback(() => {
                        'worklet';
                        runOnJS(onUnmounted)();
                    }),
                };
            case 'slide-down':
                return {
                    entering: SlideInUp.duration(duration),
                    exiting: SlideOutUp.duration(duration).withCallback(() => {
                        'worklet';
                        runOnJS(onUnmounted)();
                    }),
                };
            case 'slide-left':
                return {
                    entering: SlideInRight.duration(duration),
                    exiting: SlideOutRight.duration(duration).withCallback(() => {
                        'worklet';
                        runOnJS(onUnmounted)();
                    }),
                };
            case 'slide-right':
                return {
                    entering: SlideInLeft.duration(duration),
                    exiting: SlideOutLeft.duration(duration).withCallback(() => {
                        'worklet';
                        runOnJS(onUnmounted)();
                    }),
                };
            case 'zoom':
                return {
                    entering: ZoomIn.duration(duration),
                    exiting: ZoomOut.duration(duration).withCallback(() => {
                        'worklet';
                        runOnJS(onUnmounted)();
                    }),
                };
            case 'fade':
            default:
                return {
                    entering: FadeIn.duration(duration),
                    exiting: FadeOut.duration(duration).withCallback(() => {
                        'worklet';
                        runOnJS(onUnmounted)();
                    }),
                };
        }
    };
    const animatedGestureStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: gestureX.value },
                { translateY: gestureY.value },
            ],
        };
    });
    const renderBackdrop = () => {
        if (!backdrop) {
            return null;
        }
        return (<AnimatedPressable onPress={handleBackdropPress} entering={FadeIn.duration(duration)} exiting={FadeOut.duration(duration)} style={[
                StyleSheet.absoluteFill,
                {
                    backgroundColor: theme.backgroundColor.modalBarrier,
                    zIndex: 0,
                },
                backdropStyle,
            ]}/>);
    };
    const renderContent = () => {
        const { entering, exiting } = getAnimation();
        return (<PanGestureHandler enabled={enableDismissGesture} onGestureEvent={handleGestureEvent}>
        <AnimatedPressable onPress={onPress} onLayout={handleContentLayout} entering={entering} exiting={exiting} style={[{ zIndex: 1 }, animatedGestureStyle, style]}>
          {children}
        </AnimatedPressable>
      </PanGestureHandler>);
    };
    if (!visible) {
        return null;
    }
    return (<View style={[StyleSheet.absoluteFill, { zIndex }]} collapsable={false} pointerEvents="box-none">
      {renderBackdrop()}
      {renderContent()}
    </View>);
};
