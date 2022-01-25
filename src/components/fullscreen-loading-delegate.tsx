import { memo, useEffect, useState } from 'react'
import { globalEvent } from '../core/event'
import { FullscreenLoading } from './fullscreen-loading'

export const FullscreenLoadingDelegate: React.FC = memo(() => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    globalEvent.on('FullscreenLoading.showLoading', () => setVisible(true))
    globalEvent.on('FullscreenLoading.hideLoading', () => setVisible(false))

    return () => {
      globalEvent.off('FullscreenLoading.showLoading')
      globalEvent.off('FullscreenLoading.hideLoading')
    }
  }, [])

  return <FullscreenLoading visible={visible} />
})
