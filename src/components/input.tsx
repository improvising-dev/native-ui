import React, {
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import {
  Pressable,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native'
import { useTheme } from '../core/theme'

export type OverlayVisibilityMode =
  | 'always'
  | 'editing'
  | 'not-editing'
  | 'never'

export interface Input extends TextInput {}
export interface InputProps extends TextInputProps {
  autoFocusDelay?: number
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  prefix?: React.ReactNode
  prefixMode?: OverlayVisibilityMode
  suffix?: React.ReactNode
  suffixMode?: OverlayVisibilityMode
}

const InputComponent = React.forwardRef<TextInput, InputProps>(
  (
    {
      autoFocus,
      autoFocusDelay = 0,
      multiline,
      style,
      textStyle,
      prefix,
      prefixMode = 'always',
      suffix,
      suffixMode = 'always',
      value: controlledValue,
      defaultValue,
      placeholderTextColor,
      underlineColorAndroid = 'transparent',
      onChangeText,
      onContentSizeChange,
      ...textInputProps
    },
    ref,
  ) => {
    const theme = useTheme()
    const textInput = useRef<TextInput>(null)

    const [value, setValue] = useState(controlledValue ?? defaultValue ?? '')
    const [height, setHeight] = useState<number>()

    useImperativeHandle(ref, () => textInput.current!)

    useEffect(() => {
      if (controlledValue !== undefined && value !== controlledValue) {
        setValue(controlledValue)
      }
    }, [controlledValue])

    useEffect(() => {
      if (autoFocusDelay > 0 && autoFocus) {
        setTimeout(() => textInput.current?.focus(), autoFocusDelay)
      }
    }, [autoFocus, autoFocusDelay])

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
        {prefixMode === 'always' ||
        (prefixMode === 'editing' && value.length > 0) ||
        (prefixMode === 'not-editing' && value.length === 0)
          ? prefix
          : null}

        <TextInput
          ref={textInput}
          autoFocus={autoFocusDelay > 0 ? false : autoFocus}
          value={controlledValue}
          defaultValue={defaultValue}
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
          onChangeText={value => {
            setValue(value)
            onChangeText?.(value)
          }}
          onContentSizeChange={event => {
            if (multiline) {
              setHeight(event.nativeEvent.contentSize.height)
            }

            onContentSizeChange?.(event)
          }}
          {...textInputProps}
        />

        {suffixMode === 'always' ||
        (suffixMode === 'editing' && value.length > 0) ||
        (suffixMode === 'not-editing' && value.length === 0)
          ? suffix
          : null}
      </Pressable>
    )
  },
)

export const Input = memo(InputComponent)
