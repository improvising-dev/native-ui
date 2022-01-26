import { useEffect, useState } from 'react'
import {
  Animated,
  TouchableWithoutFeedback,
  useWindowDimensions,
  ViewStyle,
} from 'react-native'
import { Portal } from 'react-native-portalize'
import { useAnimatedValue } from '../core/animation'

export interface SlideInModalProps {
  visible: boolean
  dismissible?: boolean
  duration?: number
  to?: 'top' | 'bottom' | 'left' | 'right'
  style?: ViewStyle
  useNativeDriver?: boolean
  onDismiss?: () => void
}

export const SlideInModal: React.FC<SlideInModalProps> = ({
  children,
  visible,
  dismissible = true,
  duration = 400,
  to = 'top',
  style,
  useNativeDriver = true,
  onDismiss,
}) => {
  const [mounted, setMounted] = useState(visible)

  const dimensions = useWindowDimensions()
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

  return (
    <Portal>
      <Animated.View
        style={{
          backgroundColor: 'rgba(0, 0, 0, .6)',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
          opacity: value,
        }}
      />

      <TouchableWithoutFeedback onPress={dismissible ? onDismiss : undefined}>
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 101,
            transform: [
              to === 'bottom'
                ? {
                    translateY: value.interpolate({
                      inputRange: [0, 1],
                      outputRange: [dimensions.height, 0],
                    }),
                  }
                : to === 'top'
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
          <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Portal>
  )
}
