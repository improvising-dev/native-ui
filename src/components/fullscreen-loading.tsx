import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Portal } from 'react-native-portalize'
import { useTheme } from '../core/theme'
import Visibility from './visibility'

export interface FullscreenLoadingProps {
  visible: boolean
}

const FullscreenLoading: React.FC<FullscreenLoadingProps> = ({ visible }) => {
  const theme = useTheme()

  return (
    <Portal>
      <Visibility
        visible={visible}
        duration={250}
        style={{
          backgroundColor: 'rgba(0, 0, 0, .6)',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
      >
        <ActivityIndicator color={theme.colors.white} />
      </Visibility>
    </Portal>
  )
}

export default FullscreenLoading
