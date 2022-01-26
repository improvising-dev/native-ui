import { Platform } from 'react-native'

export const Performance = {
  animation: {
    useNativeDriver: Platform.OS !== 'android',
  },
}
