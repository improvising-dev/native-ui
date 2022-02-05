import React from 'react'
import { View } from 'react-native'

export interface SpacerProps {
  width?: number
  height?: number
}

export const Spacer: React.FC<SpacerProps> = ({ width, height }) => {
  if (width || height) {
    return <View pointerEvents="box-none" style={{ width, height }} />
  }

  return <View pointerEvents="box-none" style={{ flex: 1 }} />
}
