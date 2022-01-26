import { useEffect, useState } from 'react'
import { Animated, TouchableWithoutFeedback, ViewStyle } from 'react-native'
import { Portal } from 'react-native-portalize'
import { useAnimatedValue } from '../core/animation'
import { Performance } from '../core/performance'

export interface FadeInModalProps {
  children?: React.ReactChild
  visible: boolean
  dismissible?: boolean
  duration?: number
  style?: ViewStyle
  useNativeDriver?: boolean
  onDismiss?: () => void
}

export const FadeInModal: React.FC<FadeInModalProps> = ({
  children,
  visible,
  dismissible = true,
  duration = 400,
  style,
  useNativeDriver = Performance.animation.useNativeDriver,
  onDismiss,
}) => {
  const [mounted, setMounted] = useState(visible)
  const opacity = useAnimatedValue(visible ? 1 : 0)

  useEffect(() => {
    if (visible) {
      if (mounted) {
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          useNativeDriver,
        }).start()
      } else {
        requestAnimationFrame(() => setMounted(true))
      }
    } else if (mounted) {
      Animated.timing(opacity, {
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
      <TouchableWithoutFeedback onPress={dismissible ? onDismiss : undefined}>
        <Animated.View
          style={{
            backgroundColor: 'rgba(0, 0, 0, .6)',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 100,
            opacity,
            ...style,
          }}
        >
          <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Portal>
  )
}
