import React, { useEffect, useState } from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  ViewStyle,
} from 'react-native'
import Animated, {
  interpolate,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useTheme } from '../core/theme'
import { Portal } from './portal'

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
      animation.value = withTiming(0, { duration }, () => {
        setMounted(false)
        onUnmounted?.()
      })
    }
  }, [visible, mounted])

  if (!mounted) {
    return null
  }

  const handleBackdropPress = () => {
    onBackdropPressed?.()

    if (dismissible) {
      onDismiss?.()
    }
  }

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
              zIndex,
              opacity: animation.value,
            },
          ]}
        />
      </TouchableWithoutFeedback>
    )
  }

  const renderContent = () => {
    if (transition.startsWith('slide-')) {
      return (
        <Animated.View
          style={[
            {
              zIndex: zIndex + 1,
              transform: [
                transition === 'slide-up'
                  ? {
                      translateY: interpolate(
                        animation.value,
                        [0, 1],
                        [dimensions.height, 0],
                      ),
                    }
                  : transition === 'slide-down'
                  ? {
                      translateY: interpolate(
                        animation.value,
                        [0, 1],
                        [-dimensions.height, 0],
                      ),
                    }
                  : transition === 'slide-left'
                  ? {
                      translateX: interpolate(
                        animation.value,
                        [0, 1],
                        [dimensions.width, 0],
                      ),
                    }
                  : {
                      translateX: interpolate(
                        animation.value,
                        [0, 1],
                        [-dimensions.width, 0],
                      ),
                    },
              ],
            },
            style,
          ]}
        >
          {children}
        </Animated.View>
      )
    } else if (transition === 'scale') {
      return (
        <Animated.View
          style={[
            {
              zIndex: zIndex + 1,
              opacity: animation.value,
              transform: [
                {
                  scale: interpolate(animation.value, [0, 1], [0.9, 1]),
                },
              ],
            },
            style,
          ]}
        >
          {children}
        </Animated.View>
      )
    } else {
      return (
        <Animated.View
          style={[
            {
              zIndex: zIndex + 1,
              opacity: animation.value,
            },
            style,
          ]}
        >
          {children}
        </Animated.View>
      )
    }
  }

  return (
    <Portal>
      {renderBackdrop()}
      {renderContent()}
    </Portal>
  )
}
