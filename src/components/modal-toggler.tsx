import React, { memo, useEffect, useImperativeHandle, useState } from 'react'
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
  builder: (params: ModalBuilderParams) => JSX.Element
}

const ModalTogglerComponent = React.forwardRef<
  ModalTogglerRef,
  ModalTogglerProps
>(({ transition, transitionDuration = 400, builder }, ref) => {
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

  return builder({
    visible,
    transition,
    transitionDuration,
    handleDismiss,
  })
})

export const ModalToggler = memo(ModalTogglerComponent)
