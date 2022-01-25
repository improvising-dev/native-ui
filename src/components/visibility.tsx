import React, { useEffect, useState } from 'react'
import { Animated, ViewStyle } from 'react-native'
import { useAnimatedValue } from '../core/animation'

export interface VisibilityProps {
  visible: boolean
  children?: any
  duration?: number
  style?: ViewStyle
  useNativeDriver?: boolean
}

const Visibility: React.FC<VisibilityProps> = ({
  visible,
  duration = 0,
  style,
  useNativeDriver = true,
  children,
}) => {
  const [mounted, setMounted] = useState(visible)
  const opacity = useAnimatedValue(visible ? 1 : 0)

  useEffect(() => {
    if (duration > 0) {
      if (visible && !mounted) {
        setMounted(true)
      }

      requestAnimationFrame(() => {
        Animated.timing(opacity, {
          toValue: visible ? 1 : 0,
          duration: duration,
          useNativeDriver: useNativeDriver,
        }).start()
      })

      if (!visible) {
        setTimeout(() => setMounted(false), duration)
      }
    } else {
      if (visible) {
        setMounted(true)
      } else {
        setMounted(false)
      }
    }
  }, [visible, duration, setMounted])

  if (!mounted) {
    return <></>
  }

  return <Animated.View style={{ ...style, opacity }}>{children}</Animated.View>
}

export default Visibility
