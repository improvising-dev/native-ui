import React from 'react'
import {
  FullscreenLoading,
  FullscreenLoadingController,
} from '../components/fullscreen-loading'
import { showModal } from './modal'

export interface FullscreenLoadingParams {
  controller?: FullscreenLoadingController
  message?: string
}

export const showLoading = ({
  controller,
  message,
}: FullscreenLoadingParams = {}) => {
  const { dispose, handleDismiss } = showModal({
    builder: ({ visible, handleDismiss }) => (
      <FullscreenLoading
        controller={controller}
        message={message}
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
  params: FullscreenLoadingParams = {},
) => {
  const hideLoading = showLoading(params)

  try {
    return await cb()
  } finally {
    hideLoading()
  }
}
