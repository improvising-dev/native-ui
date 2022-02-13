import React, { useImperativeHandle, useRef, useState } from 'react'
import {
  LayoutAnimation,
  ScrollView as RNScrollView,
  ScrollViewProps as RNScrollViewProps,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native'
import { useKeyboardHeight } from 'react-native-universal-keyboard'
import { useTheme } from '../core/theme'

export interface ScrollView extends RNScrollView {}
export interface ScrollViewProps extends RNScrollViewProps {
  keyboardAvoiding?: boolean
  keyboardAvoidingDuration?: number
  bottomInset?: number
}

export const ScrollView = React.forwardRef<ScrollView, ScrollViewProps>(
  (
    {
      keyboardAvoiding = false,
      keyboardAvoidingDuration = 200,
      bottomInset: initialBottomInset = 0,
      onMomentumScrollEnd,
      children,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme()
    const dimensions = useWindowDimensions()

    const scrollView = useRef<RNScrollView>(null)
    const scrollPosition = useRef(0)

    const [bottomInset, setBottomInset] = useState(initialBottomInset)

    useImperativeHandle(ref, () => scrollView.current!)

    useKeyboardHeight(keyboardHeight => {
      if (keyboardAvoiding) {
        LayoutAnimation.configureNext({
          ...LayoutAnimation.Presets.easeInEaseOut,
          duration: keyboardAvoidingDuration,
        })

        setBottomInset(keyboardHeight > 0 ? keyboardHeight : initialBottomInset)

        if (keyboardHeight > 0) {
          TextInput.State.currentlyFocusedInput().measureInWindow(
            (_x, y, _width, height) => {
              const offset = y + height + theme.spacing * 2
              const delta = offset - (dimensions.height - keyboardHeight)

              if (delta > 0) {
                setTimeout(() => {
                  scrollView.current?.scrollTo({
                    y: scrollPosition.current + delta,
                  })
                }, keyboardAvoidingDuration)
              }
            },
          )
        }
      }
    })

    return (
      <RNScrollView
        ref={scrollView}
        onMomentumScrollEnd={event => {
          scrollPosition.current = event.nativeEvent.contentOffset.y
          onMomentumScrollEnd?.(event)
        }}
        {...props}
      >
        {children}
        <View style={{ height: bottomInset }} />
      </RNScrollView>
    )
  },
)
