import React from 'react'
import { FullscreenLoading } from '../components/fullscreen-loading'
import { showModal } from './modal'

export const showLoading = () => {
  const { dispose, handleDismiss } = showModal({
    builder: ({ visible, handleDismiss }) => (
      <FullscreenLoading
        visible={visible}
        onDismiss={handleDismiss}
        onUnmounted={() => dispose()}
      />
    ),
  })

  return handleDismiss
}

export const handleLoading = async <T,>(cb: () => Promise<T> | T) => {
  const hideLoading = showLoading()

  try {
    return await cb()
  } finally {
    hideLoading()
  }
}
