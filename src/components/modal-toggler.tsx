import React, { useEffect, useImperativeHandle, useState } from 'react'

export interface ModalBuilderParams {
  visible: boolean
  duration: number
  handleDismiss: () => void
}

export interface ModalTogglerRef {
  handleDismiss: () => void
}

export interface ModalTogglerProps {
  duration?: number
  children: (params: ModalBuilderParams) => React.ReactNode
}

export const ModalToggler = React.forwardRef<
  ModalTogglerRef,
  ModalTogglerProps
>(({ duration = 400, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const handleDismiss = () => {
    setVisible(false)
  }

  useEffect(() => {
    setVisible(true)
  }, [])

  useImperativeHandle(ref, () => {
    return { handleDismiss }
  })

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
