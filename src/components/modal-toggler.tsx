import React, { useEffect, useImperativeHandle, useState } from 'react'

export interface ModalBuilderParams {
  visible: boolean
  transitionDuration: number
  handleDismiss: () => void
}

export interface ModalTogglerRef {
  handleDismiss: () => void
}

export interface ModalTogglerProps {
  transitionDuration?: number
  children: (params: ModalBuilderParams) => React.ReactNode
}

export const ModalToggler = React.forwardRef<
  ModalTogglerRef,
  ModalTogglerProps
>(({ transitionDuration = 400, children }, ref) => {
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
        visible,
        transitionDuration,
        handleDismiss,
      })}
    </>
  )
})
