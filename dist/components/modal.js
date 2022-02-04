import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideInLeft, SlideInRight, SlideInUp, SlideOutDown, SlideOutLeft, SlideOutRight, SlideOutUp, ZoomIn, ZoomOut, } from 'react-native-reanimated';
import { useTheme } from '../core/theme';
import { Portal } from './portal';
export const Modal = ({ children, zIndex = 100, dismissible = true, backdrop = true, transition = 'fade', style, visible, transitionDuration = 400, onBackdropPressed, onDismiss, onUnmounted, }) => {
    const theme = useTheme();
    if (!visible) {
        return null;
    }
    const handleBackdropPress = () => {
        onBackdropPressed === null || onBackdropPressed === void 0 ? void 0 : onBackdropPressed();
        if (dismissible) {
            onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
        }
    };
    const renderBackdrop = () => {
        if (!backdrop) {
            return null;
        }
        return (<TouchableWithoutFeedback onPress={handleBackdropPress}>
        <Animated.View entering={FadeIn.duration(transitionDuration)} exiting={FadeOut.duration(transitionDuration)} style={[
                StyleSheet.absoluteFill,
                {
                    backgroundColor: theme.backgroundColor.modalBarrier,
                    zIndex,
                },
            ]}/>
      </TouchableWithoutFeedback>);
    };
    const renderContent = () => {
        let entering;
        let exiting;
        switch (transition) {
            case 'slide-up':
            case 'slide-down':
            case 'slide-left':
            case 'slide-right':
                {
                    entering =
                        transition === 'slide-up'
                            ? new SlideInUp()
                            : transition === 'slide-down'
                                ? new SlideInDown()
                                : transition === 'slide-left'
                                    ? new SlideInLeft()
                                    : new SlideInRight();
                    exiting =
                        transition === 'slide-up'
                            ? new SlideOutDown()
                            : transition === 'slide-down'
                                ? new SlideOutUp()
                                : transition === 'slide-left'
                                    ? new SlideOutRight()
                                    : new SlideOutLeft();
                }
                break;
            case 'scale':
                {
                    entering = new ZoomIn();
                    exiting = new ZoomOut();
                }
                break;
            case 'fade':
            default:
                {
                    entering = new FadeIn();
                    exiting = new FadeOut();
                }
                break;
        }
        entering = entering.duration(transitionDuration);
        exiting = entering.duration(transitionDuration);
        if (onUnmounted) {
            exiting = exiting.withCallback(onUnmounted);
        }
        return (<Animated.View entering={entering} exiting={exiting} style={[{ zIndex: zIndex + 1 }, style]}>
        {children}
      </Animated.View>);
    };
    return (<Portal>
      {renderBackdrop()}
      {renderContent()}
    </Portal>);
};
