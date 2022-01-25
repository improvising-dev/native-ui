import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import { useTheme } from '../core/theme'

export interface ButtonProps {
  children?: string
  style?: ViewStyle
  textStyle?: TextStyle
  onPressed?: () => void
}

export const Button: React.FC<ButtonProps> = ({
  children,
  style,
  textStyle,
  onPressed,
}) => {
  const theme = useTheme()
  const disabled = !onPressed

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.9}
      onPress={onPressed}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        borderRadius: theme.sizes.borderRadius,
        padding: theme.sizes.spacing,
        opacity: disabled ? 0.7 : 1.0,
        ...style,
      }}
    >
      <Text
        style={{
          color: theme.colors.white,
          ...theme.textStyles.button,
          ...textStyle,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  )
}
