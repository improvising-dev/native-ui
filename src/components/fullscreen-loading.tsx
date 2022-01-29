import React, { memo } from 'react'
import { ActivityIndicator } from 'react-native'
import { useTheme } from '../core/theme'
import { Modal } from './modal'

export interface FullscreenLoadingProps {
  visible: boolean
}

export const FullscreenLoading: React.FC<FullscreenLoadingProps> = memo(
  ({ visible }) => {
    const theme = useTheme()

    return (
      <Modal
        visible={visible}
        dismissible={false}
        zIndex={10000}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator color={theme.white} />
      </Modal>
    )
  },
)
