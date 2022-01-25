import { memo, useEffect, useState } from 'react'
import { Animated, TouchableWithoutFeedback, ViewStyle } from 'react-native'
import { Portal } from 'react-native-portalize'
import { useAnimatedValue } from '../core/animation'

export interface FadeInModalProps {
  visible: boolean
  dismissible?: boolean
  duration?: number
  style?: ViewStyle
  useNativeDriver?: boolean
  onDismiss?: () => void
}

export const FadeInModal: React.FC<FadeInModalProps> = memo(
  ({
    children,
    visible,
    dismissible = true,
    duration = 250,
    style,
    useNativeDriver = true,
    onDismiss,
  }) => {
    const [mounted, setMounted] = useState(visible)
    const opacity = useAnimatedValue(visible ? 1 : 0)

    useEffect(() => {
      if (visible) {
        if (mounted) {
          Animated.timing(opacity, {
            toValue: 1,
            duration: duration,
            useNativeDriver: useNativeDriver,
          }).start()
        } else {
          requestAnimationFrame(() => setMounted(true))
        }
      } else if (mounted) {
        Animated.timing(opacity, {
          toValue: 0,
          duration: duration,
          useNativeDriver: useNativeDriver,
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
              zIndex: 1000,
              opacity,
              ...style,
            }}
          >
            {children}
          </Animated.View>
        </TouchableWithoutFeedback>
      </Portal>
    )
  },
)
