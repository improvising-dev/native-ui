import React, { memo } from 'react'
import { ActivityIndicator } from 'react-native'
import { useTheme } from '../core/theme'
import { ControlledModal, ControlledModalRef } from './modal'

export interface FullscreenLoadingProps {
  ref?: React.Ref<ControlledModalRef>
  onDismiss?: () => void
}

export const FullscreenLoading: React.FC<FullscreenLoadingProps> = memo(
  ({ ref, onDismiss }) => {
    const theme = useTheme()

    return (
      <ControlledModal
        ref={ref}
        dismissible={false}
        onDismiss={onDismiss}
        zIndex={theme.componentTheme.fullscreenLoading.zIndex}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator color={theme.white} />
      </ControlledModal>
    )
  },
)
