import React from 'react'
import { Toast } from '../components/toast'
import { showModal } from './modal'

export const showToast = ({
  title,
  message,
  duration,
  onPress,
}: {
  title?: string
  message?: string
  duration?: number
  onPress?: () => void
}) => {
  const { dispose } = showModal({
    builder: ({ visible, handleDismiss }) => (
      <Toast
        title={title}
        message={message}
        duration={duration}
        visible={visible}
        onDismiss={handleDismiss}
        onUnmounted={() => dispose()}
        onPress={onPress}
      />
    ),
  })
}
