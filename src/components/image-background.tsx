import { StyleSheet, View } from 'react-native'
import { Image, ImageProps } from './image'

export interface ImageBackgroundProps extends ImageProps {}

export const ImageBackground: React.FC<ImageBackgroundProps> = ({
  children,
  ...imageProps
}) => {
  return (
    <View pointerEvents="box-none">
      <Image {...imageProps} />
      <View style={StyleSheet.absoluteFill}>{children}</View>
    </View>
  )
}
