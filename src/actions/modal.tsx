import React, { createRef } from 'react'
import {
  ModalBuilderParams,
  ModalToggler,
  ModalTogglerRef,
} from '../components/modal-toggler'
import { ModalService } from '../core/modal'

export const showModal = ({
  duration,
  builder,
}: {
  duration?: number
  builder: (params: ModalBuilderParams) => React.ReactNode
}) => {
  const togglerRef = createRef<ModalTogglerRef>()

  const dispose = ModalService.create(
    <ModalToggler ref={togglerRef} duration={duration}>
      {builder}
    </ModalToggler>,
  )

  return {
    dispose,
    handleDismiss: () => togglerRef.current?.handleDismiss(),
  }
}
