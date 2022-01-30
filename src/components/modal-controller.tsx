import React, { forwardRef, useEffect, useState } from 'react'

export interface ModalBuilderParams {
  visible: boolean
  duration: number
  handleDismiss: () => void
}

export interface ModalControllerRef {
  handleDismiss: () => void
}

export interface ModalControllerProps {
  duration?: number
  children: (params: ModalBuilderParams) => React.ReactNode
}

export const ModalController = forwardRef<
  ModalControllerRef,
  ModalControllerProps
>(({ duration = 400, children }) => {
  const [visible, setVisible] = useState(false)

  const handleDismiss = () => {
    setVisible(false)
  }

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <>
      {children({
        duration,
        visible,
        handleDismiss,
      })}
    </>
  )
})
