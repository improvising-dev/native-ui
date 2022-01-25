import { useEffect, useState } from 'react'
import FullscreenLoading from './fullscreen-loading'
import { globalEvent } from '../core/event'

const FullscreenLoadingDelegate: React.FC = () => {
  const [fullscreenLoadingVisible, setFullscreenLoadingVisible] =
    useState(false)

  useEffect(() => {
    globalEvent.on('FullscreenLoading.showLoading', () => {
      setFullscreenLoadingVisible(true)
    })

    globalEvent.on('FullscreenLoading.hideLoading', () => {
      setFullscreenLoadingVisible(false)
    })

    return () => {
      globalEvent.off('FullscreenLoading.showLoading')
      globalEvent.off('FullscreenLoading.hideLoading')
    }
  }, [])

  return <FullscreenLoading visible={fullscreenLoadingVisible} />
}

export default FullscreenLoadingDelegate
