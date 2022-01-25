import React, { useMemo } from 'react'
import { FlexStyle, View, ViewStyle } from 'react-native'

export interface StackProps {
  direction?: FlexStyle['flexDirection']
  align?: FlexStyle['alignItems']
  justify?: FlexStyle['justifyContent']
  style?: ViewStyle
  spacing?: number
  children: React.ReactNode[]
}

export const Stack: React.FC<StackProps> = ({
  direction,
  align,
  justify,
  style,
  spacing,
  children,
}) => {
  const items = useMemo(() => {
    if (!spacing) {
      return children
    }

    const builder: React.ReactNode[] = []

    for (let index = 0; index < children.length; index++) {
      builder.push(
        <View
          key={index}
          style={
            direction === 'row' || direction === 'row-reverse'
              ? { width: spacing }
              : { height: spacing }
          }
        />,
      )

      builder.push(
        <React.Fragment key={index}>{children[index]}</React.Fragment>,
      )
    }

    builder.shift()

    return builder
  }, [children])

  return (
    <View
      style={{
        flexDirection: direction,
        alignItems: align,
        justifyContent: justify,
        ...style,
      }}
    >
      {items}
    </View>
  )
}
