import React, { memo } from 'react'
import { ActivityIndicator } from 'react-native'
import { useTheme } from '../core/theme'
import { FadeInModal } from './fade-in-modal'

export interface FullscreenLoadingProps {
  visible: boolean
}

export const FullscreenLoading: React.FC<FullscreenLoadingProps> = memo(
  ({ visible }) => {
    const theme = useTheme()

    return (
      <FadeInModal
        visible={visible}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator color={theme.colors.white} />
      </FadeInModal>
    )
  },
)
