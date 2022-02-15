import React from 'react'
import { ImageStyle, StyleProp, StyleSheet, View } from 'react-native'
import { Image, ImageProps } from './image'

export interface ImageBackgroundProps extends ImageProps {
  imageStyle?: StyleProp<ImageStyle>
}

export const ImageBackground: React.FC<ImageBackgroundProps> = ({
  style,
  imageStyle,
  children,
  ...imageProps
}) => {
  const flattenedStyle = StyleSheet.flatten(style)

  return (
    <View accessibilityIgnoresInvertColors={true} style={style}>
      <Image
        style={[
          StyleSheet.absoluteFill,
          {
            width: flattenedStyle?.width,
            height: flattenedStyle?.height,
          },
          imageStyle,
        ]}
        {...imageProps}
      />
      <View>{children}</View>
    </View>
  )
}
