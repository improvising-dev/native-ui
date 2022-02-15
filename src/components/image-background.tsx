import { memo } from 'react'
import { ImageStyle, StyleProp, StyleSheet, View } from 'react-native'
import { Image, ImageProps } from './image'

export interface ImageBackgroundProps extends ImageProps {
  imageStyle?: StyleProp<ImageStyle>
}

const ImageBackgroundComponent: React.FC<ImageBackgroundProps> = ({
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

export const ImageBackground = memo(ImageBackgroundComponent)
