import React from 'react'
import { View } from 'react-native'

export interface AppLoadingProps {
  loadAsync: () => Promise<void>
  onComplete: () => void
  onError: (reason: any) => void
}

export const AppLoading: React.FC<AppLoadingProps> = ({
  loadAsync,
  onComplete,
  onError,
}) => {
  const handleLayout = () => {
    loadAsync().then(onComplete).catch(onError)
  }

  return <View onLayout={handleLayout} />
}
