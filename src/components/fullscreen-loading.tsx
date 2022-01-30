import React from 'react'
import { ActivityIndicator } from 'react-native'
import { useTheme } from '../core/theme'
import { Modal, ModalStateProps } from './modal'

export type FullscreenLoadingProps = ModalStateProps

export const FullscreenLoading: React.FC<FullscreenLoadingProps> = ({
  visible,
  onStatusChanged,
}) => {
  const theme = useTheme()

  return (
    <Modal
      dismissible={false}
      visible={visible}
      onStatusChanged={onStatusChanged}
      zIndex={theme.componentTheme.fullscreenLoading.zIndex}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator color={theme.white} />
    </Modal>
  )
}
