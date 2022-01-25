import { useRef } from 'react'
import { Animated } from 'react-native'

export const useAnimatedValue = (value: number) => {
  return useRef(new Animated.Value(value)).current
}

export const useAnimatedValueXY = (value: { x: number; y: number }) => {
  return useRef(new Animated.ValueXY(value)).current
}
