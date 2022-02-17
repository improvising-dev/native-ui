import React, { useLayoutEffect, useMemo, useState } from 'react'
import { globalModalService, ModalService } from '../core/modal'

export interface ModalContext {
  set: (id: string, node: React.ReactNode) => void
  delete: (id: string) => void
}

const modalContext = React.createContext({} as ModalContext)

export interface ModalProviderProps {
  modalService?: ModalService
}

export const ModalProvider: React.FC<ModalProviderProps> = ({
  modalService = globalModalService,
  children,
}) => {
  const [modalMap, setModalMap] = useState(new Map<string, React.ReactNode>())

  const context = useMemo<ModalContext>(() => {
    return {
      set: (id, node) => {
        setModalMap(prevState => new Map(prevState).set(id, node))
      },
      delete: id => {
        setModalMap(prevState => {
          const nextMap = new Map(prevState)
          nextMap.delete(id)
          return nextMap
        })
      },
    }
  }, [])

  const modalList = useMemo(() => {
    return Array.from(modalMap.entries())
      .sort(([keyA], [keyB]) =>
        keyA.localeCompare(keyB, 'en', { numeric: true }),
      )
      .map(([key, modal]) => <React.Fragment key={key}>{modal}</React.Fragment>)
  }, [modalMap])

  useLayoutEffect(() => {
    modalService.mount(context)

    return () => {
      modalService.unmount()
    }
  }, [])

  return (
    <modalContext.Provider value={context}>
      {children}
      {modalList}
    </modalContext.Provider>
  )
}
