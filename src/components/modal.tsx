import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  LayoutChangeEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler'
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  SlideInDown,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  SlideOutDown,
  SlideOutLeft,
  SlideOutRight,
  SlideOutUp,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated'
import { useTheme } from '../core/theme'
import { useBackHandler } from '../hooks/use-back-handler'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export type ModalTransition =
  | 'fade'
  | 'zoom'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'

export interface ModalStateProps {
  visible: boolean
  transition?: ModalTransition
  transitionDuration?: number
  onBackdropPress?: () => void
  onDismiss?: () => void
  onUnmounted?: () => void
}

export interface ModalProps extends ModalStateProps {
  zIndex?: number
  dismissible?: boolean
  backdrop?: boolean
  backdropStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  enableDismissGesture?: boolean
  onPress?: () => void
  onHandlerStateChange?: PanGestureHandlerProps['onHandlerStateChange']
}

export const Modal: React.FC<ModalProps> = ({
  children,
  zIndex = 100,
  dismissible = true,
  backdrop = true,
  backdropStyle,
  style,
  visible,
  transition = 'fade',
  transitionDuration: duration = 400,
  enableDismissGesture = false,
  onBackdropPress,
  onDismiss,
  onUnmounted = () => {},
  onPress,
  onHandlerStateChange,
}) => {
  const theme = useTheme()
  const dimensions = useWindowDimensions()

  const gestureX = useSharedValue(0)
  const gestureY = useSharedValue(0)

  const [contentWidth, setContentWidth] = useState(dimensions.width)
  const [contentHeight, setContentHeight] = useState(dimensions.height)

  const mounted = useRef(false)

  const handleContentLayout = (event: LayoutChangeEvent) => {
    if (mounted.current) {
      setContentWidth(event.nativeEvent.layout.width)
      setContentHeight(event.nativeEvent.layout.height)
    }
  }

  const handleGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      startY: number
      startX: number
    }
  >(
    {
      onStart: (_, ctx) => {
        ctx.startX = gestureX.value
        ctx.startY = gestureY.value
      },
      onActive: (event, ctx) => {
        switch (transition) {
          case 'slide-up':
            if (event.translationY > 0) {
              gestureY.value = ctx.startY + event.translationY
            }
            break
          case 'slide-down':
            if (event.translationY < 0) {
              gestureY.value = ctx.startY + event.translationY
            }
            break

          case 'slide-left':
            if (event.translationX > 0) {
              gestureX.value = ctx.startX + event.translationX
            }
            break
          case 'slide-right':
            if (event.translationX < 0) {
              gestureX.value = ctx.startX + event.translationX
            }
            break
        }
      },
      onEnd: () => {
        switch (transition) {
          case 'slide-up':
            if (Math.abs(gestureY.value) > contentHeight / 3) {
              gestureY.value = withTiming(contentHeight, {}, () => {
                'worklet'
                runOnJS(onUnmounted)()
              })
            } else {
              gestureY.value = withTiming(0)
            }
            break
          case 'slide-down':
            if (Math.abs(gestureY.value) > contentHeight / 3) {
              gestureY.value = withTiming(-contentHeight, {}, () => {
                'worklet'
                runOnJS(onUnmounted)()
              })
            } else {
              gestureY.value = withTiming(0)
            }
            break
          case 'slide-left':
            if (Math.abs(gestureX.value) > contentWidth / 3) {
              gestureX.value = withTiming(contentWidth, {}, () => {
                'worklet'
                runOnJS(onUnmounted)()
              })
            } else {
              gestureX.value = withTiming(0)
            }
            break
          case 'slide-right':
            if (Math.abs(gestureX.value) > contentWidth / 3) {
              gestureX.value = withTiming(-contentWidth, {}, () => {
                'worklet'
                runOnJS(onUnmounted)()
              })
            } else {
              gestureX.value = withTiming(0)
            }
            break
        }
      },
    },
    [transition, contentWidth, contentHeight],
  )

  const handleBackdropPress = () => {
    onBackdropPress?.()

    if (dismissible) {
      onDismiss?.()
    }
  }

  const transitionAnimation = useMemo(() => {
    switch (transition) {
      case 'slide-up':
        return {
          entering: SlideInDown.duration(duration),
          exiting: SlideOutDown.duration(duration).withCallback(() => {
            'worklet'
            runOnJS(onUnmounted)()
          }),
        }
      case 'slide-down':
        return {
          entering: SlideInUp.duration(duration),
          exiting: SlideOutUp.duration(duration).withCallback(() => {
            'worklet'
            runOnJS(onUnmounted)()
          }),
        }
      case 'slide-left':
        return {
          entering: SlideInRight.duration(duration),
          exiting: SlideOutRight.duration(duration).withCallback(() => {
            'worklet'
            runOnJS(onUnmounted)()
          }),
        }
      case 'slide-right':
        return {
          entering: SlideInLeft.duration(duration),
          exiting: SlideOutLeft.duration(duration).withCallback(() => {
            'worklet'
            runOnJS(onUnmounted)()
          }),
        }
      case 'zoom':
        return {
          entering: ZoomIn.duration(duration),
          exiting: ZoomOut.duration(duration).withCallback(() => {
            'worklet'
            runOnJS(onUnmounted)()
          }),
        }
      case 'fade':
      default:
        return {
          entering: FadeIn.duration(duration),
          exiting: FadeOut.duration(duration).withCallback(() => {
            'worklet'
            runOnJS(onUnmounted)()
          }),
        }
    }
  }, [transition, duration])

  const animatedGestureStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: gestureX.value },
        { translateY: gestureY.value },
      ],
    }
  })

  const renderBackdrop = () => {
    if (!backdrop) {
      return null
    }

    return (
      <AnimatedPressable
        onPress={handleBackdropPress}
        entering={FadeIn.duration(duration)}
        exiting={FadeOut.duration(duration)}
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: theme.backgroundColor.modalBarrier,
            zIndex: 0,
          },
          backdropStyle,
        ]}
      />
    )
  }

  const renderContent = () => {
    const { entering, exiting } = transitionAnimation

    return (
      <PanGestureHandler
        enabled={enableDismissGesture}
        onGestureEvent={handleGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <AnimatedPressable
          onPress={onPress}
          onLayout={handleContentLayout}
          entering={entering}
          exiting={exiting}
          style={[{ zIndex: 1 }, animatedGestureStyle, style]}
        >
          {children}
        </AnimatedPressable>
      </PanGestureHandler>
    )
  }

  useLayoutEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
  }, [])

  useBackHandler(() => {
    if (dismissible) {
      onDismiss?.()
    }

    return true
  }, [dismissible])

  if (!visible) {
    return null
  }

  return (
    <View
      style={[StyleSheet.absoluteFill, { zIndex }]}
      collapsable={false}
      pointerEvents="box-none"
    >
      {renderBackdrop()}
      {renderContent()}
    </View>
  )
}
