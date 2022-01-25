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

    let index = 0

    for (const child of children) {
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

      index++

      builder.push(<React.Fragment key={index}>{child}</React.Fragment>)

      index++
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
