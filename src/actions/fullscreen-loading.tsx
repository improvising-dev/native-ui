import { createRef } from 'react'
import { FullscreenLoading } from '../components/fullscreen-loading'
import { ControlledModalRef } from '../components/modal'
import { showModal } from './modal'

export const showLoading = () => {
  const ref = createRef<ControlledModalRef>()
  const disposeModal = showModal(
    <FullscreenLoading ref={ref} onDismiss={() => disposeModal()} />,
  )

  return ref.current!.dismiss
}

export const handleLoading = async <T,>(cb: () => Promise<T> | T) => {
  const hideLoading = showLoading()

  try {
    return await cb()
  } finally {
    hideLoading()
  }
}
