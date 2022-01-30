import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { ModalService } from '../core/modal'

export interface ModalContext {
  set: (id: string, node: React.ReactNode) => void
  delete: (id: string) => void
}

const modalContext = React.createContext({} as ModalContext)

export const ModalProvider: React.FC = ({ children }) => {
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
      .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([key, modal]) => <View key={key}>{modal}</View>)
  }, [modalMap])

  useEffect(() => {
    ModalService.mount(context)

    return () => {
      ModalService.unmount()
    }
  }, [])

  return (
    <modalContext.Provider value={context}>
      {children}
      {modalList}
    </modalContext.Provider>
  )
}
