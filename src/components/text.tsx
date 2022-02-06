import React from 'react'
import { Text as RNText, TextProps as RNTextProps } from 'react-native'
import { useTheme } from '../core/theme'

export interface Text extends RNText {}
export interface TextProps extends RNTextProps {
  expand?: boolean
}

export const Text = React.forwardRef<Text, TextProps>(
  ({ expand, style, ...textProps }, ref) => {
    const theme = useTheme()

    return (
      <RNText
        ref={ref}
        style={[theme.textTheme.default, expand && { flex: 1 }, style]}
        {...textProps}
      />
    )
  },
)
