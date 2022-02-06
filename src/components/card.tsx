import React from 'react'
import { Pressable, View, ViewProps } from 'react-native'
import { HapticFeedback } from '../actions/haptic-feedback'
import { useTheme } from '../core/theme'

export interface Card extends View {}
export interface CardProps extends ViewProps {
  haptic?: boolean
  onPress?: () => void
  onLongPress?: () => void
}

export const Card = React.forwardRef<Card, CardProps>(
  (
    { children, style, haptic = false, onPress, onLongPress, ...viewProps },
    ref,
  ) => {
    const theme = useTheme()
    const disabled = !onPress

    const handlePress = () => {
      if (haptic) {
        HapticFeedback.lightImpact()
      }

      onPress?.()
    }

    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        onPress={handlePress}
        onLongPress={onLongPress}
        style={[
          {
            backgroundColor: theme.backgroundColor.primary,
            borderRadius: theme.borderRadius,
            padding: theme.spacing,
          },
          style,
        ]}
        {...viewProps}
      >
        {children}
      </Pressable>
    )
  },
)
