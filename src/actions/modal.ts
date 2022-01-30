import React from 'react'
import { ModalService } from '../core/modal'

export const showModal = (node: React.ReactNode) => {
  return ModalService.create(node)
}
