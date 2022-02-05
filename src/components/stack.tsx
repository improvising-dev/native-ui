import React from 'react'
import { FlexStyle, View, ViewProps } from 'react-native'

export interface StackProps extends ViewProps {
  direction?: FlexStyle['flexDirection']
  align?: FlexStyle['alignItems']
  justify?: FlexStyle['justifyContent']
  spacing?: number
}

export const Stack: React.FC<StackProps> = ({
  direction,
  align,
  justify,
  style,
  spacing,
  children,
}) => {
  const renderItems = () => {
    if (!spacing) {
      return children
    }

    const builder: React.ReactNode[] = []

    let index = 0

    for (const child of React.Children.toArray(children)) {
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
  }

  return (
    <View
      style={[
        {
          flexDirection: direction,
          alignItems: align,
          justifyContent: justify,
        },
        style,
      ]}
    >
      {renderItems()}
    </View>
  )
}
