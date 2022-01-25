import React, { useEffect } from 'react'
import { Animated, ViewStyle } from 'react-native'
import { useAnimatedValue } from '../core/animation'

const DEFAULT_DURATION = 300

export interface FadeInOutViewProps {
  visible: boolean
  children?: any
  duration?: number
  style?: ViewStyle
  useNativeDriver?: boolean
}

const FadeInOutView: React.FC<FadeInOutViewProps> = ({
  visible,
  duration = DEFAULT_DURATION,
  style,
  useNativeDriver = true,
  children,
}) => {
  const opacity = useAnimatedValue(visible ? 1 : 0)

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: duration,
      useNativeDriver: useNativeDriver,
    }).start()
  }, [visible])

  return <Animated.View style={{ ...style, opacity }}>{children}</Animated.View>
}

export default FadeInOutView
