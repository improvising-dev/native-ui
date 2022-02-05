import React, { useState } from 'react'
import { TextInput, TextInputProps } from 'react-native'
import { TextPadding } from '../core/layout'
import { useTheme } from '../core/theme'

export interface InputProps extends TextInputProps {
  textPadding?: TextPadding
}

export const Input: React.FC<InputProps> = ({
  multiline,
  style,
  textPadding = TextPadding.zero,
  placeholderTextColor,
  underlineColorAndroid = 'transparent',
  onContentSizeChange,
  ...props
}) => {
  const theme = useTheme()
  const [height, setHeight] = useState<number>()

  const updateLayoutHeight = (contentHeight: number) => {
    setHeight(contentHeight + textPadding.vertical)
  }

  return (
    <TextInput
      multiline={multiline}
      selectionColor={theme.primaryColor}
      style={[theme.textTheme.default, style, textPadding.build(), { height }]}
      placeholderTextColor={theme.textColor.placeholder ?? placeholderTextColor}
      underlineColorAndroid={underlineColorAndroid}
      onContentSizeChange={event => {
        if (multiline) {
          updateLayoutHeight(event.nativeEvent.contentSize.height)
        }

        onContentSizeChange?.(event)
      }}
      {...props}
    />
  )
}
