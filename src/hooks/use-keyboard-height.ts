import { useEffect, useState } from 'react'
import { Keyboard, KeyboardEventListener, Platform } from 'react-native'

export const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Keyboard.addListener('keyboardWillShow', keyboardShow)
      Keyboard.addListener('keyboardWillHide', keyboardHide)
    } else {
      Keyboard.addListener('keyboardDidShow', keyboardShow)
      Keyboard.addListener('keyboardDidHide', keyboardHide)
    }

    return () => {
      if (Platform.OS === 'ios') {
        Keyboard.removeAllListeners('keyboardWillShow')
        Keyboard.removeAllListeners('keyboardWillHide')
      } else {
        Keyboard.removeAllListeners('keyboardDidShow')
        Keyboard.removeAllListeners('keyboardDidHide')
      }
    }
  }, [])

  const keyboardShow: KeyboardEventListener = frames => {
    setKeyboardHeight(frames.endCoordinates.height)
  }

  const keyboardHide: KeyboardEventListener = () => {
    setKeyboardHeight(0)
  }

  return keyboardHeight
}
