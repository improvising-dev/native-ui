import { Pressable, ViewStyle } from 'react-native'
import { useTheme } from '../core/theme'

export interface CardProps {
  style?: ViewStyle
  onPressed?: () => void
}

export const Card: React.FC<CardProps> = ({ children, style, onPressed }) => {
  const theme = useTheme()

  return (
    <Pressable
      onPress={onPressed}
      style={{
        backgroundColor: theme.colors.background.primary,
        borderRadius: theme.sizes.borderRadius,
        padding: theme.sizes.spacing,
        ...style,
      }}
    >
      {children}
    </Pressable>
  )
}
