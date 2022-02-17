import React, { createRef } from 'react'
import { ModalTransition } from '../components/modal'
import {
  ModalBuilderParams,
  ModalToggler,
  ModalTogglerRef,
} from '../components/modal-toggler'
import { getCurrentModalService, globalModalService } from '../core/modal'

export const showModal = ({
  global = false,
  transition,
  transitionDuration,
  builder,
}: {
  global?: boolean
  transition?: ModalTransition
  transitionDuration?: number
  builder: (params: ModalBuilderParams) => JSX.Element
}) => {
  const togglerRef = createRef<ModalTogglerRef>()
  const modalService = global ? globalModalService : getCurrentModalService()

  const dispose = modalService.create(
    <ModalToggler
      ref={togglerRef}
      transition={transition}
      transitionDuration={transitionDuration}
      builder={builder}
    />,
  )

  return {
    dispose,
    handleDismiss: () => togglerRef.current?.handleDismiss(),
  }
}
