import React, { useImperativeHandle, useRef, useState } from 'react'
import {
  Pressable,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native'
import { useTheme } from '../core/theme'

export interface Input extends TextInput {}

export interface InputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

export const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      multiline,
      style,
      textStyle,
      placeholderTextColor,
      underlineColorAndroid = 'transparent',
      onContentSizeChange,
      ...textInputProps
    },
    ref,
  ) => {
    const theme = useTheme()
    const textInput = useRef<TextInput>(null)

    const [height, setHeight] = useState<number>()

    useImperativeHandle(ref, () => textInput.current!)

    return (
      <Pressable
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
          },
          style,
        ]}
        onPress={() => textInput.current?.focus()}
      >
        <TextInput
          ref={textInput}
          multiline={multiline}
          selectionColor={theme.primaryColor}
          style={[
            theme.textTheme.default,
            {
              flex: 1,
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 0,
              paddingRight: 0,
              height,
            },
            textStyle,
          ]}
          placeholderTextColor={
            placeholderTextColor ?? theme.textColor.placeholder
          }
          underlineColorAndroid={underlineColorAndroid}
          onContentSizeChange={event => {
            if (multiline) {
              setHeight(event.nativeEvent.contentSize.height)
            }

            onContentSizeChange?.(event)
          }}
          {...textInputProps}
        />
      </Pressable>
    )
  },
)
