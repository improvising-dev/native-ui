import React from 'react'
import { StyleSheet, View } from 'react-native'

export interface AppLoadingProps {
  loadAsync: () => Promise<void>
  onComplete: () => void
  onError: (reason: any) => void
}

export const AppLoading: React.FC<AppLoadingProps> = ({
  children,
  loadAsync,
  onComplete,
  onError,
}) => {
  const handleLayout = () => {
    loadAsync().then(onComplete).catch(onError)
  }

  return (
    <View
      style={StyleSheet.absoluteFill}
      pointerEvents="box-none"
      onLayout={handleLayout}
    >
      {children}
    </View>
  )
}
