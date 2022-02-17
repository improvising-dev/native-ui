import React, { createRef } from 'react'
import { ModalTransition } from '../components/modal'
import {
  ModalBuilderParams,
  ModalToggler,
  ModalTogglerRef,
} from '../components/modal-toggler'
import { globalModalService, ModalService } from '../core/modal'

export const showModal = ({
  modalService = globalModalService,
  transition,
  transitionDuration,
  builder,
}: {
  modalService?: ModalService
  transition?: ModalTransition
  transitionDuration?: number
  builder: (params: ModalBuilderParams) => JSX.Element
}) => {
  const togglerRef = createRef<ModalTogglerRef>()

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
