import React from 'react'
import { ModalContext } from '../components/modal-context'

class ModalServiceStatic {
  context?: ModalContext

  mount(context: ModalContext) {
    this.context = context
  }

  unmount() {
    delete this.context
  }

  create(node: React.ReactNode) {
    const id = Math.random().toString(36).slice(2, 5)

    if (!this.context) {
      throw new Error('ModalContext is not mounted')
    }

    this.context?.set(id, node)

    return () => this.context?.delete(id)
  }
}

export const ModalService = new ModalServiceStatic()
