import { globalEvent } from '../core/event'

export const showLoading = () => {
  globalEvent.fire('FullscreenLoading.showLoading')
}

export const hideLoading = () => {
  globalEvent.fire('FullscreenLoading.showLoading')
}

export const handleLoading = async <T>(cb: () => Promise<T> | T) => {
  showLoading()

  try {
    return await cb()
  } finally {
    hideLoading()
  }
}
