import { useEffect, useState } from 'react'
import {
  Animated,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  ViewStyle,
} from 'react-native'
import { useAnimatedValue } from '../core/animation'
import { Performance } from '../core/performance'
import { useTheme } from '../core/theme'
import { Portal } from './portal'

export type ModalTransition = 'fade' | 'slide' | 'scale'
export type ModalSlideTo = 'top' | 'bottom' | 'left' | 'right'

export interface ModalStateProps {
  visible: boolean
  onDismiss?: () => void
  onUnmounted?: () => void
}

export interface ModalProps extends ModalStateProps {
  zIndex?: number
  dismissible?: boolean
  backdrop?: boolean
  transition?: ModalTransition
  to?: ModalSlideTo
  duration?: number
  style?: StyleProp<ViewStyle>
  useNativeDriver?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  children,
  zIndex = 100,
  dismissible = true,
  backdrop = true,
  transition = 'fade',
  to = 'top',
  duration = 400,
  style,
  useNativeDriver = Performance.animation.useNativeDriver,
  visible,
  onDismiss,
  onUnmounted,
}) => {
  const theme = useTheme()
  const dimensions = useWindowDimensions()
  const value = useAnimatedValue(visible ? 1 : 0)

  const [mounted, setMounted] = useState(visible)

  useEffect(() => {
    if (visible) {
      if (mounted) {
        Animated.timing(value, {
          toValue: 1,
          duration,
          useNativeDriver,
        }).start()
      } else {
        requestAnimationFrame(() => setMounted(true))
      }
    } else if (mounted) {
      Animated.timing(value, {
        toValue: 0,
        duration,
        useNativeDriver,
      }).start()

      setTimeout(() => {
        setMounted(false)
        onUnmounted?.()
      }, duration)
    }
  }, [visible, mounted])

  if (!mounted) {
    return <></>
  }

  const renderBackdrop = () => {
    if (!backdrop) {
      return <></>
    }

    return (
      <TouchableWithoutFeedback onPress={dismissible ? onDismiss : undefined}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: theme.backgroundColor.modalBarrier,
              zIndex,
              opacity: value,
            },
          ]}
        />
      </TouchableWithoutFeedback>
    )
  }

  const renderContent = () => {
    if (transition === 'slide') {
      return (
        <Animated.View
          style={[
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
              opacity: value,
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
