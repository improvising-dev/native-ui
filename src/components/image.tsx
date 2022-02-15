import React, { memo } from 'react'
import {
  Image as RNImage,
  ImageLoadEventData,
  ImageProps as RNImageProps,
  NativeSyntheticEvent,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useTheme } from '../core/theme'

export interface ImageProps extends RNImageProps {
  containerStyle?: StyleProp<ViewStyle>
}

const ImageComponentAndroid: React.FC<ImageProps> = ({
  fadeDuration = 200,
  style,
  containerStyle,
  ...imageProps
}) => {
  const theme = useTheme()

  return (
    <View
      style={[
        {
          overflow: 'hidden',
          backgroundColor: theme.backgroundColor.fill,
        },
        containerStyle,
      ]}
    >
      <RNImage
        fadeDuration={fadeDuration}
        style={[StyleSheet.absoluteFill, style]}
        {...imageProps}
      />
    </View>
  )
}

const ImageComponent: React.FC<ImageProps> = ({
  fadeDuration = 200,
  style,
  containerStyle,
  onLoad,
  ...imageProps
}) => {
  const theme = useTheme()
  const animatedOpacity = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
    }
  })

  const handleLoad = (event: NativeSyntheticEvent<ImageLoadEventData>) => {
    const minimumWait = 100
    const staggerNonce = 200 * Math.random()

    setTimeout(() => {
      animatedOpacity.value = withTiming(1, { duration: fadeDuration })
    }, minimumWait + staggerNonce)

    onLoad?.(event)
  }

  return (
    <View
      style={[
        {
          overflow: 'hidden',
          backgroundColor: theme.backgroundColor.fill,
        },
        containerStyle,
      ]}
    >
      <Animated.Image
        style={[StyleSheet.absoluteFill, animatedStyle, style]}
        onLoad={handleLoad}
        {...imageProps}
      />
    </View>
  )
}

export const Image = memo(
  Platform.select({
    android: ImageComponentAndroid,
    default: ImageComponent,
  }),
)
