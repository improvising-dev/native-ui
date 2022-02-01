import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import { useTheme } from '../core/theme'

export interface TextProps extends RNTextProps {
  children?: string
}

export const Text: React.FC<TextProps> = ({
  children,
  style,
  ...textProps
}) => {
  const theme = useTheme()

  return (
    <RNText style={[theme.textTheme.default, style]} {...textProps}>
      {children}
    </RNText>
  )
}
