import { TextInput, TextInputProps, TextStyle } from 'react-native'
import { useTheme } from '../core/theme'

export interface InputProps extends TextInputProps {
  style?: TextStyle
}

export const Input: React.FC<InputProps> = ({ style, ...props }) => {
  const theme = useTheme()

  return (
    <TextInput
      selectionColor={theme.colors.primary}
      style={{
        ...theme.textStyles.default,
        ...style,
      }}
      {...props}
    />
  )
}
