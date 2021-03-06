import { useEffect } from 'react'
import { BackHandler, Platform } from 'react-native'

export const useBackHandler = (
  handler: () => boolean,
  deps: React.DependencyList = [],
) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', handler)
    }

    return () => {
      if (Platform.OS === 'android') {
        BackHandler.removeEventListener('hardwareBackPress', handler)
      }
    }
  }, deps)
}
