import React from 'react'
import { TextInput, TextInputProps, TextStyle } from 'react-native'
import { useTheme } from '../core/theme'

export interface InputProps extends TextInputProps {
  style?: TextStyle
}

export const Input: React.FC<InputProps> = ({ style, ...props }) => {
  const theme = useTheme()

  return (
    <TextInput
      selectionColor={theme.primaryColor}
      style={{
        ...theme.textTheme.default,
        ...style,
      }}
      {...props}
    />
  )
}
