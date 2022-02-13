import React, { memo, useState } from 'react'
import { FullscreenLoadingController } from '../controllers/fullscreen-loading'
import { useMountController } from '../core/controller'
import { useTheme } from '../core/theme'
import { ActivityIndicator } from './activity-indicator'
import { Modal, ModalStateProps } from './modal'
import { Text } from './text'

export interface FullscreenLoadingProps extends ModalStateProps {
  controller?: FullscreenLoadingController
  message?: string
}

const FullscreenLoadingComponent: React.FC<FullscreenLoadingProps> = ({
  controller,
  message: initialMessage,
  visible,
  transition = 'fade',
  transitionDuration,
  onBackdropPress,
  onDismiss,
  onUnmounted,
}) => {
  const theme = useTheme()
  const [message, setMessage] = useState(initialMessage)

  const renderMessage = () => {
    if (!message) {
      return null
    }

    return (
      <Text
        style={{
          marginTop: theme.spacing,
          color: theme.white,
        }}
      >
        {message}
      </Text>
    )
  }

  useMountController({
    controller,
    methods: { setMessage },
  })

  return (
    <Modal
      zIndex={theme.componentTheme.fullscreenLoading.zIndex}
      visible={visible}
      transition={transition}
      transitionDuration={transitionDuration}
      dismissible={false}
      onBackdropPress={onBackdropPress}
      onDismiss={onDismiss}
      onUnmounted={onUnmounted}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size={35} color={theme.white} />
      {renderMessage()}
    </Modal>
  )
}

export const FullscreenLoading = memo(FullscreenLoadingComponent)
