import { useEffect, useState } from 'react'
import { Keyboard, KeyboardEventListener } from 'react-native'

export const useKeyboardHeight = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', keyboardShow)
    Keyboard.addListener('keyboardWillHide', keyboardHide)
    Keyboard.addListener('keyboardDidShow', keyboardShow)
    Keyboard.addListener('keyboardDidHide', keyboardHide)

    return () => {
      Keyboard.removeAllListeners('keyboardWillShow')
      Keyboard.removeAllListeners('keyboardWillHide')
      Keyboard.removeAllListeners('keyboardDidShow')
      Keyboard.removeAllListeners('keyboardDidHide')
    }
  }, [])

  const keyboardShow: KeyboardEventListener = frames => {
    if (frames.endCoordinates.height > 0) {
      setKeyboardHeight(frames.endCoordinates.height)
    }
  }

  const keyboardHide: KeyboardEventListener = frames => {
    if (frames.endCoordinates.height === 0) {
      setKeyboardHeight(0)
    }
  }

  return keyboardHeight
}
