import React, { createRef } from 'react'
import { ModalTransition } from '../components/modal'
import {
  ModalBuilderParams,
  ModalToggler,
  ModalTogglerRef,
} from '../components/modal-toggler'
import { ModalService } from '../core/modal'

export const showModal = ({
  transition,
  transitionDuration,
  builder,
}: {
  transition?: ModalTransition
  transitionDuration?: number
  builder: (params: ModalBuilderParams) => React.ReactNode
}) => {
  const togglerRef = createRef<ModalTogglerRef>()

  const dispose = ModalService.create(
    <ModalToggler
      ref={togglerRef}
      transition={transition}
      transitionDuration={transitionDuration}
    >
      {builder}
    </ModalToggler>,
  )

  return {
    dispose,
    handleDismiss: () => togglerRef.current?.handleDismiss(),
  }
}
