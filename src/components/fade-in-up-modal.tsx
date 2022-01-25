import { useEffect, useState } from 'react'
import {
  Animated,
  TouchableWithoutFeedback,
  useWindowDimensions,
  ViewStyle,
} from 'react-native'
import { Portal } from 'react-native-portalize'
import { useAnimatedValue } from '../core/animation'

export interface FadeInUpModalProps {
  visible: boolean
  dismissible?: boolean
  duration?: number
  style?: ViewStyle
  useNativeDriver?: boolean
  onDismiss?: () => void
}

export const FadeInUpModal: React.FC<FadeInUpModalProps> = ({
  children,
  visible,
  dismissible = true,
  duration = 300,
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
          duration: duration,
          useNativeDriver: useNativeDriver,
        }).start()
      } else {
        requestAnimationFrame(() => setMounted(true))
      }
    } else if (mounted) {
      Animated.timing(value, {
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
            opacity: value,
          }}
        >
          <Animated.View
            style={{
              flex: 1,
              transform: [
                {
                  translateY: value.interpolate({
                    inputRange: [0, 1],
                    outputRange: [dimensions.height, 0],
                  }),
                },
              ],
              ...style,
            }}
          >
            <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Portal>
  )
}
