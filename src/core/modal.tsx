import React, { useRef } from 'react'
import { ModalContext, ModalProvider } from '../components/modal-context'

export class ModalService {
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
    const id = Date.now().toString()

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

export const createModalService = () => new ModalService()

export const withModal =
  <P extends {}>(Component: React.ComponentType<P>) =>
  (props: P) => {
    const modalService = useRef(new ModalService()).current

    return (
      <ModalProvider modalService={modalService}>
        <Component {...props} />
      </ModalProvider>
    )
  }

export const globalModalService = new ModalService()
