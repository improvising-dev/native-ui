import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useTheme } from '../core/theme'
import { Modal, ModalStateProps } from './modal'
import { Text } from './text'

interface FullscreenLoadingMethods {
  setMessage: (value?: string) => void
}

export class FullscreenLoadingController {
  private methods?: FullscreenLoadingMethods

  mount(methods: FullscreenLoadingMethods) {
    this.methods = methods
  }

  unmount() {
    delete this.methods
  }

  setMessage(message?: string) {
    this.methods?.setMessage(message)
  }
}

export interface FullscreenLoadingProps extends ModalStateProps {
  controller?: FullscreenLoadingController
}

export const FullscreenLoading: React.FC<FullscreenLoadingProps> = ({
  controller,
  visible,
  transition = 'fade',
  transitionDuration,
  onBackdropPressed,
  onDismiss,
  onUnmounted,
}) => {
  const theme = useTheme()
  const [message, setMessage] = useState<string>()

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

  useEffect(() => {
    controller?.mount({ setMessage })

    return () => {
      controller?.unmount()
    }
  }, [])

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
