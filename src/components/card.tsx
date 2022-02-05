import React from 'react'
import { Pressable, ViewProps } from 'react-native'
import { HapticFeedback } from '../actions/haptic-feedback'
import { useTheme } from '../core/theme'

export interface CardProps extends ViewProps {
  haptic?: boolean
  onPress?: () => void
  onLongPress?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  haptic = false,
  onPress,
  onLongPress,
  ...viewProps
}) => {
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
}
