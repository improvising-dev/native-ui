import { Text as RNText, TextStyle } from 'react-native'
import { useTheme } from '../core/theme'

export interface TextProps {
  children?: string
  style?: TextStyle
}

export const Text: React.FC<TextProps> = ({ children, style }) => {
  const theme = useTheme()

  return (
    <RNText
      style={{
        ...theme.textStyles.default,
        ...style,
      }}
    >
      {children}
    </RNText>
  )
}
