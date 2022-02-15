import React, { memo } from 'react'
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

  const handleLoadEnd = () => {
    const minimumWait = 100
    const staggerNonce = 200 * Math.random()

    setTimeout(() => {
      animatedOpacity.value = withTiming(1, { duration: fadeDuration })
    }, minimumWait + staggerNonce)

    onLoadEnd?.()
  }

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
