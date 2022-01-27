import { useEffect, useState } from 'react'
import {
  Animated,
  TouchableWithoutFeedback,
  useWindowDimensions,
  ViewStyle,
} from 'react-native'
import { Portal } from 'react-native-portalize'
import { useAnimatedValue } from '../core/animation'
import { Performance } from '../core/performance'
import { useTheme } from '../core/theme'

export interface ModalProps {
  visible: boolean
  dismissible?: boolean
  transition?: 'fade' | 'slide'
  to?: 'top' | 'bottom' | 'left' | 'right'
  duration?: number
  style?: ViewStyle
  useNativeDriver?: boolean
  onDismiss?: () => void
}

export const Modal: React.FC<ModalProps> = ({
  children,
  visible,
  dismissible = true,
  transition = 'fade',
  to = 'top',
  duration = 400,
  style,
  useNativeDriver = Performance.animation.useNativeDriver,
  onDismiss,
}) => {
  const theme = useTheme()
  const dimensions = useWindowDimensions()

  const [mounted, setMounted] = useState(visible)
  const value = useAnimatedValue(visible ? 1 : 0)

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

      setTimeout(() => setMounted(false), duration)
    }
  }, [visible, mounted])

  if (!mounted) {
    return <></>
  }

  const renderBackdrop = () => {
    return (
      <TouchableWithoutFeedback onPress={dismissible ? onDismiss : undefined}>
        <Animated.View
          style={{
            backgroundColor: theme.colors.background.modalBarrier,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 100,
            opacity: value,
          }}
        />
      </TouchableWithoutFeedback>
    )
  }

  const renderContent = () => {
    if (transition === 'slide') {
      return (
        <Animated.View
          style={{
            zIndex: 101,
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
            ...style,
          }}
        >
          {children}
        </Animated.View>
      )
    } else {
      return (
        <Animated.View
          style={{
            zIndex: 101,
            opacity: value,
            ...style,
          }}
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
