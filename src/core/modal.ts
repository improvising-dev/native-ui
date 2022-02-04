import React from 'react'
import { ModalContext } from '../components/modal-context'

const generateId = () => {
  return Math.random().toString(36).slice(2, 5)
}

class ModalServiceStatic {
  context?: ModalContext

  private ids: Set<string>

  constructor() {
    this.ids = new Set<string>()
  }

  mount(context: ModalContext) {
    this.context = context
  }

  unmount() {
    delete this.context
  }

  create(node: React.ReactNode) {
    let id = generateId()

    while (this.ids.has(id)) {
      id = generateId()
    }

    if (!this.context) {
      throw new Error('ModalContext is not mounted')
    }

    this.context?.set(id, node)
    this.ids.add(id)

    return () => {
      this.context?.delete(id)
      this.ids.delete(id)
    }
  }
}

export const ModalService = new ModalServiceStatic()
