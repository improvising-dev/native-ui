import React, { useEffect, useState } from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useTheme } from '../core/theme'

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
  onBackdropPressed?: () => void
  onDismiss?: () => void
  onUnmounted?: () => void
}

export interface ModalProps extends ModalStateProps {
  zIndex?: number
  dismissible?: boolean
  backdrop?: boolean
  style?: StyleProp<ViewStyle>
  useNativeDriver?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  children,
  zIndex = 100,
  dismissible = true,
  backdrop = true,
  transition = 'fade',
  style,
  visible,
  transitionDuration: duration = 400,
  onBackdropPressed,
  onDismiss,
  onUnmounted,
}) => {
  const theme = useTheme()
  const dimensions = useWindowDimensions()
  const animation = useSharedValue(visible ? 1 : 0)

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

  const handleBackdropPress = () => {
    onBackdropPressed?.()

    if (dismissible) {
      onDismiss?.()
    }
  }

  const animatedBackdropStyles = useAnimatedStyle(() => {
    return { opacity: animation.value }
  })

  const animatedTransitionStyles = useAnimatedStyle(() => {
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
            animatedBackdropStyles,
          ]}
        />
      </TouchableWithoutFeedback>
    )
  }

  const renderContent = () => {
    return (
      <Animated.View style={[{ zIndex: 1 }, animatedTransitionStyles, style]}>
        {children}
      </Animated.View>
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
