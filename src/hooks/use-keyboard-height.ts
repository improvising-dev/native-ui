import { useEffect, useState } from 'react'
import { Keyboard, KeyboardEventListener, Platform } from 'react-native'
import {
  AndroidKeyboard,
  AndroidKeyboardEventListener,
} from 'react-native-android-keyboard'

export const useKeyboardHeight = (onChange?: (height: number) => void) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  const handleAndroidKeyboardEvent: AndroidKeyboardEventListener = height => {
    setKeyboardHeight(height)
    onChange?.(height)
  }

  const handleKeyboardShow: KeyboardEventListener = event => {
    setKeyboardHeight(event.endCoordinates.height)
    onChange?.(event.endCoordinates.height)
  }

  const handleKeyboardHide: KeyboardEventListener = () => {
    setKeyboardHeight(0)
    onChange?.(0)
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      AndroidKeyboard.addListener(handleAndroidKeyboardEvent)

      return () => {
        AndroidKeyboard.removeListener(handleAndroidKeyboardEvent)
      }
    } else {
      const [keyboardWillShowSub, keyboardWillHideSub] = [
        Keyboard.addListener('keyboardWillShow', handleKeyboardShow),
        Keyboard.addListener('keyboardWillHide', handleKeyboardHide),
      ]

      return () => {
        keyboardWillShowSub.remove()
        keyboardWillHideSub.remove()
      }
    }
  }, [])

  return keyboardHeight
}
