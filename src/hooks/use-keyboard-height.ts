import { useEffect, useState } from 'react'
import { Keyboard, KeyboardEventListener, Platform } from 'react-native'

export const useKeyboardHeight = (onChange?: (height: number) => void) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const showSub = Keyboard.addListener('keyboardWillShow', keyboardShow)
      const hideSub = Keyboard.addListener('keyboardWillHide', keyboardHide)

      return () => {
        showSub.remove()
        hideSub.remove()
      }
    } else {
      const showSub = Keyboard.addListener('keyboardDidShow', keyboardShow)
      const hideSub = Keyboard.addListener('keyboardDidHide', keyboardHide)

      return () => {
        showSub.remove()
        hideSub.remove()
      }
    }
  }, [])

  const keyboardShow: KeyboardEventListener = frames => {
    setKeyboardHeight(frames.endCoordinates.height)
    onChange?.(frames.endCoordinates.height)
  }

  const keyboardHide: KeyboardEventListener = () => {
    setKeyboardHeight(0)
    onChange?.(0)
  }

  return keyboardHeight
}
