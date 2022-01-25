import { useMemo } from 'react'
import { FlexStyle, View } from 'react-native'

export interface StackProps {
  direction?: FlexStyle['flexDirection']
  align?: FlexStyle['alignItems']
  justify?: FlexStyle['justifyContent']
  spacing?: number
  children: React.ReactNode[]
}

export const Stack: React.FC<StackProps> = ({
  direction,
  align,
  justify,
  spacing,
  children,
}) => {
  const items = useMemo(() => {
    if (!spacing) {
      return children
    }

    const builder: React.ReactNode[] = []

    for (const child of children) {
      builder.push(
        <View
          style={
            direction === 'row' || direction === 'row-reverse'
              ? { width: spacing }
              : { height: spacing }
          }
        />,
      )
      builder.push(child)
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
      }}
    >
      {items}
    </View>
  )
}
