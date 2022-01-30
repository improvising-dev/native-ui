import React, { createRef } from 'react'
import {
  ModalBuilderParams,
  ModalController,
  ModalControllerRef,
} from '../components/modal-controller'
import { ModalService } from '../core/modal'

export const showModal = ({
  duration,
  builder,
}: {
  duration?: number
  builder: (params: ModalBuilderParams) => React.ReactNode
}) => {
  const controllerRef = createRef<ModalControllerRef>()

  const dispose = ModalService.create(
    <ModalController ref={controllerRef} duration={duration}>
      {builder}
    </ModalController>,
  )

  return {
    dispose,
    handleDismiss: () => controllerRef.current?.handleDismiss(),
  }
}
