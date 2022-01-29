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
        backgroundColor: theme.backgroundColor.primary,
        borderRadius: theme.borderRadius,
        padding: theme.spacing,
        ...style,
      }}
    >
      {children}
    </Pressable>
  )
}
