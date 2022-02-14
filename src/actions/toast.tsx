import React from 'react'
import { Toast, ToastVariant } from '../components/toast'
import { showModal } from './modal'

export const showToast = ({
  variant = 'info',
  title,
  message,
  duration,
  onPress,
}: {
  variant?: ToastVariant
  title?: string
  message?: string
  duration?: number
  onPress?: () => void
}) => {
  const { dispose } = showModal({
    transitionDuration: 500,
    builder: ({ visible, transitionDuration, handleDismiss }) => (
      <Toast
        variant={variant}
        title={title}
        message={message}
        duration={duration}
        visible={visible}
        transitionDuration={transitionDuration}
        onDismiss={handleDismiss}
        onUnmounted={() => dispose()}
        onPress={onPress}
      />
    ),
  })
}
