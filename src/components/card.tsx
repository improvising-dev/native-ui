import { Pressable, ViewProps } from 'react-native'
import { HapticFeedback } from '../actions/haptics'
import { useTheme } from '../core/theme'

export interface CardProps extends ViewProps {
  haptic?: boolean
  onPressed?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  haptic = false,
  onPressed,
  ...viewProps
}) => {
  const theme = useTheme()
  const disabled = !onPressed

  const handlePress = () => {
    if (haptic) {
      HapticFeedback.lightImpact()
    }

    onPressed?.()
  }

  return (
    <Pressable
      disabled={disabled}
      onPress={handlePress}
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
