import React from 'react'
import { FlexStyle, View, ViewProps } from 'react-native'

export interface Container extends View {}
export interface ContainerProps extends ViewProps {
  expand?: boolean
  width?: number
  height?: number
  direction?: FlexStyle['flexDirection']
  align?: FlexStyle['alignItems']
  justify?: FlexStyle['justifyContent']
  overflow?: FlexStyle['overflow']
}

export const Container = React.forwardRef<Container, ContainerProps>(
  (
    {
      expand,
      width,
      height,
      direction,
      align,
      justify,
      overflow,
      style,
      ...viewProps
    },
    ref,
  ) => {
    return (
      <View
        ref={ref}
        style={[
          {
            width,
            height,
            flexDirection: direction,
            alignItems: align,
            justifyContent: justify,
            overflow,
          },
          expand && { flex: 1 },
          style,
        ]}
        {...viewProps}
      />
    )
  },
)
