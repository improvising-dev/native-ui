import React from 'react'
import {
  FullscreenLoading,
  FullscreenLoadingController,
} from '../components/fullscreen-loading'
import { showModal } from './modal'

export const showLoading = (controller?: FullscreenLoadingController) => {
  const { dispose, handleDismiss } = showModal({
    builder: ({ visible, handleDismiss }) => (
      <FullscreenLoading
        controller={controller}
        visible={visible}
        onDismiss={handleDismiss}
        onUnmounted={() => dispose()}
      />
    ),
  })

  return handleDismiss
}

export const handleLoading = async <T,>(
  cb: () => Promise<T> | T,
  controller?: FullscreenLoadingController,
) => {
  const hideLoading = showLoading(controller)

  try {
    return await cb()
  } finally {
    hideLoading()
  }
}
