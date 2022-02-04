import React, { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { FullscreenLoadingController } from '../controllers/fullscreen-loading'
import { useMountController } from '../core/controller'
import { useTheme } from '../core/theme'
import { Modal, ModalStateProps } from './modal'
import { Text } from './text'

export interface FullscreenLoadingProps extends ModalStateProps {
  controller?: FullscreenLoadingController
  message?: string
}

export const FullscreenLoading: React.FC<FullscreenLoadingProps> = ({
  controller,
  message: initialMessage,
  visible,
  transition = 'fade',
  transitionDuration,
  onBackdropPressed,
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
      onBackdropPressed={onBackdropPressed}
      onDismiss={onDismiss}
      onUnmounted={onUnmounted}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator color={theme.white} />
      {renderMessage()}
    </Modal>
  )
}
