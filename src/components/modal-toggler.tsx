import React, { useEffect, useImperativeHandle, useState } from 'react'
import { ModalTransition } from './modal'

export interface ModalBuilderParams {
  visible: boolean
  transition?: ModalTransition
  transitionDuration: number
  handleDismiss: () => void
}

export interface ModalTogglerRef {
  handleDismiss: () => void
}

export interface ModalTogglerProps {
  transition?: ModalTransition
  transitionDuration?: number
  children: (params: ModalBuilderParams) => React.ReactNode
}

export const ModalToggler = React.forwardRef<
  ModalTogglerRef,
  ModalTogglerProps
>(({ transition, transitionDuration = 400, children }, ref) => {
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
        transition,
        transitionDuration,
        handleDismiss,
      })}
    </>
  )
})
