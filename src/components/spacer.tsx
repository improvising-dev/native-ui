import React, { memo } from 'react'
import { View } from 'react-native'

export interface SpacerProps {
  width?: number
  height?: number
}

export const Spacer: React.FC<SpacerProps> = memo(({ width, height }) => {
  if (width || height) {
    return <View style={{ width, height }} />
  }

  return <View style={{ flex: 1 }} />
})
