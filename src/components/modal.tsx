import React, { useEffect, useRef, useState } from 'react'
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useTheme } from '../core/theme'
import { useBackHandler } from '../hooks/use-back-handler'

export type ModalTransition =
  | 'fade'
  | 'scale'
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
  enableDismissGesture,
  onBackdropPress,
  onDismiss,
  onUnmounted,
}) => {
  const theme = useTheme()
  const dimensions = useWindowDimensions()

  const animation = useSharedValue(visible ? 1 : 0)
  const gestureX = useSharedValue(0)
  const gestureY = useSharedValue(0)

  const contentWidth = useRef(dimensions.width)
  const contentHeight = useRef(dimensions.height)

  const [mounted, setMounted] = useState(visible)

  useEffect(() => {
    if (visible) {
      if (mounted) {
        animation.value = withTiming(1, { duration })
      } else {
        requestAnimationFrame(() => setMounted(true))
      }
    } else if (mounted) {
      animation.value = withTiming(0, { duration })

      setTimeout(() => {
        setMounted(false)
        onUnmounted?.()
      }, duration)
    }
  }, [visible, mounted])

  useBackHandler(() => {
    if (dismissible) {
      onDismiss?.()
    }

    return true
  }, [dismissible])

  const handleContentLayout = (event: LayoutChangeEvent) => {
    contentWidth.current = event.nativeEvent.layout.width
    contentHeight.current = event.nativeEvent.layout.height
  }

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      startY: number
      startX: number
    }
  >({
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
          if (Math.abs(gestureY.value) > contentHeight.current / 2) {
            gestureY.value = withSpring(contentHeight.current)
            onDismiss?.()
          } else {
            gestureY.value = withSpring(0)
          }
          break
        case 'slide-down':
          if (Math.abs(gestureY.value) > contentHeight.current / 2) {
            gestureY.value = withSpring(-contentHeight.current)
            onDismiss?.()
          } else {
            gestureY.value = withSpring(0)
          }
          break
        case 'slide-left':
          if (Math.abs(gestureX.value) > contentWidth.current / 2) {
            gestureX.value = withSpring(contentWidth.current)
            onDismiss?.()
          } else {
            gestureX.value = withSpring(0)
          }
          break
        case 'slide-right':
          if (Math.abs(gestureX.value) > contentWidth.current / 2) {
            gestureX.value = withSpring(-contentWidth.current)
            onDismiss?.()
          } else {
            gestureX.value = withSpring(0)
          }
          break
      }
    },
  })

  const handleBackdropPress = () => {
    onBackdropPress?.()

    if (dismissible) {
      onDismiss?.()
    }
  }

  const animatedBackdropStyle = useAnimatedStyle(() => {
    return { opacity: animation.value }
  })

  const animatedGestureStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: gestureY.value,
        },
      ],
    }
  })

  const animatedTransitionStyle = useAnimatedStyle(() => {
    if (transition === 'slide-up') {
      return {
        transform: [
          {
            translateY: interpolate(
              animation.value,
              [0, 1],
              [dimensions.height, 0],
            ),
          },
        ],
      }
    }

    if (transition === 'slide-down') {
      return {
        transform: [
          {
            translateY: interpolate(
              animation.value,
              [0, 1],
              [-dimensions.height, 0],
            ),
          },
        ],
      }
    }

    if (transition === 'slide-left') {
      return {
        transform: [
          {
            translateY: interpolate(
              animation.value,
              [0, 1],
              [dimensions.width, 0],
            ),
          },
        ],
      }
    }

    if (transition === 'slide-right') {
      return {
        transform: [
          {
            translateY: interpolate(
              animation.value,
              [0, 1],
              [-dimensions.width, 0],
            ),
          },
        ],
      }
    }

    if (transition === 'scale') {
      return {
        opacity: animation.value,
        transform: [
          {
            scale: interpolate(animation.value, [0, 1], [0.9, 1]),
          },
        ],
      }
    }

    return { opacity: animation.value }
  })

  const renderBackdrop = () => {
    if (!backdrop) {
      return null
    }

    return (
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: theme.backgroundColor.modalBarrier,
              zIndex: 0,
            },
            backdropStyle,
            animatedBackdropStyle,
          ]}
        />
      </TouchableWithoutFeedback>
    )
  }

  const renderContent = () => {
    return (
      <PanGestureHandler
        enabled={enableDismissGesture}
        onGestureEvent={gestureHandler}
      >
        <Animated.View
          onLayout={handleContentLayout}
          style={[
            { zIndex: 1 },
            animatedTransitionStyle,
            animatedGestureStyle,
            style,
          ]}
        >
          {children}
        </Animated.View>
      </PanGestureHandler>
    )
  }

  if (!mounted) {
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
