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

      return React.Children.toArray(children)
        .filter(Boolean)
        .reduce<React.ReactNode>((builder, element) => {
          if (!builder) {
            return element
          }

          return (
            <>
              {builder}
              <View
                style={
                  direction === 'row' || direction === 'row-reverse'
                    ? { width: spacing }
                    : { height: spacing }
                }
              />
              {element}
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
