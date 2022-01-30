import { FullscreenLoading } from '../components/fullscreen-loading'
import { showModal } from './modal'

export const showLoading = () => {
  const { dispose, handleDismiss } = showModal({
    builder: ({ visible, handleDismiss }) => (
      <FullscreenLoading
        visible={visible}
        onDismiss={handleDismiss}
        onStatusChanged={mounted => {
          if (!mounted) {
            dispose()
          }
        }}
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
