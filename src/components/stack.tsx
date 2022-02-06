import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Container, ContainerProps } from './container'

export interface Stack extends Container {}
export interface StackProps extends ContainerProps {
  spacing?: number
}

export const Stack = React.forwardRef<Stack, StackProps>(
  ({ direction, spacing, children, ...viewProps }, ref) => {
    const node = useMemo(() => {
      if (!spacing) {
        return children
      }

      const items = React.Children.toArray(children)

      return items.reduce<React.ReactNode>((children, item, index) => {
        if (index === items.length - 1) {
          return (
            <>
              {children}
              {item}
            </>
          )
        }

        return (
          <>
            {children}
            {item}
            <View
              style={
                direction === 'row' || direction === 'row-reverse'
                  ? { width: spacing }
                  : { height: spacing }
              }
            />
          </>
        )
      }, null)
    }, [direction, spacing, children])

    return (
      <Container ref={ref} direction={direction} {...viewProps}>
        {node}
      </Container>
    )
  },
)
