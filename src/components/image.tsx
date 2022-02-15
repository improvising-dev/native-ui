import React, { memo, useEffect, useRef } from 'react'
import {
  Image as RNImage,
  ImageProps as RNImageProps,
  Platform,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export interface ImageProps extends RNImageProps {}

const ImageComponentAndroid: React.FC<ImageProps> = ({
  fadeDuration = 200,
  ...imageProps
}) => {
  return <RNImage fadeDuration={fadeDuration} {...imageProps} />
}

const ImageComponent: React.FC<ImageProps> = ({
  fadeDuration = 200,
  style,
  onLoadEnd,
  ...imageProps
}) => {
  const animatedOpacity = useSharedValue(0)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
    }
  })

  const timestamp = useRef(Date.now())
  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleLoadEnd = () => {
    if (Date.now() - timestamp.current < 100) {
      animatedOpacity.value = withTiming(1, { duration: 0 })
    } else {
      const minimumWait = 100
      const staggerNonce = 200 * Math.random()

      timeoutRef.current = setTimeout(() => {
        animatedOpacity.value = withTiming(1, { duration: fadeDuration })
      }, minimumWait + staggerNonce)
    }

    onLoadEnd?.()
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <Animated.Image
      style={[animatedStyle, style]}
      onLoadEnd={handleLoadEnd}
      {...imageProps}
    />
  )
}

export const Image = memo(
  Platform.select({
    android: ImageComponentAndroid,
    default: ImageComponent,
  }),
)
