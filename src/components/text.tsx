import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import { useTheme } from '../core/theme'

export interface Text extends RNText {}
export interface TextProps extends RNTextProps {}

export const Text = React.forwardRef<Text, TextProps>(
  ({ style, ...textProps }, ref) => {
    const theme = useTheme()

    return (
      <RNText
        ref={ref}
        style={[theme.textTheme.default, style]}
        {...textProps}
      />
    )
  },
)
