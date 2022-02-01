import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { usePortalizeKey } from '../hooks/use-portalize-key'

interface PortalManagerHandles {
  mount(key: string, children: React.ReactNode): void
  update(key?: string, children?: React.ReactNode): void
  unmount(key?: string): void
}

interface PortalState {
  key: string
  children: React.ReactNode
}

const PortalManager = React.forwardRef<PortalManagerHandles>((_, ref) => {
  const [portals, setPortals] = useState<PortalState[]>([])

  useImperativeHandle(ref, () => ({
    mount(key, children) {
      setPortals(prev => [...prev, { key, children }])
    },
    update(key, children) {
      setPortals(prev =>
        prev.map(item => {
          if (item.key === key) {
            return { ...item, children }
          }

          return item
        }),
      )
    },
    unmount(key) {
      setPortals(prev => prev.filter(item => item.key !== key))
    },
  }))

  return (
    <>
      {portals.map(({ key, children }, index) => (
        <View
          key={`react-native-portalize-${key}-${index}`}
          collapsable={false}
          pointerEvents="box-none"
          style={StyleSheet.absoluteFill}
        >
          {children}
        </View>
      ))}
    </>
  )
})

export interface PortalProviderProps {
  style?: StyleProp<ViewStyle>
}

interface PortalContext {
  mount(children: React.ReactNode): string
  update(key?: string, children?: React.ReactNode): void
  unmount(key?: string): void
}

const portalContext = React.createContext({} as PortalContext)

interface PortalQueueItem {
  type: 'mount' | 'update' | 'unmount'
  key: string
  children?: React.ReactNode
}

export const PortalProvider: React.FC<PortalProviderProps> = ({
  style,
  children,
}) => {
  const managerRef = useRef<PortalManagerHandles>(null)
  const queue: PortalQueueItem[] = []

  const { generateKey, removeKey } = usePortalizeKey()

  useEffect(() => {
    while (queue.length && managerRef.current) {
      const action = queue.pop()

      if (action) {
        switch (action.type) {
          case 'mount':
            managerRef.current?.mount(action.key, action.children)
            break
          case 'update':
            managerRef.current?.update(action.key, action.children)
            break
          case 'unmount':
            managerRef.current?.unmount(action.key)
            break
        }
      }
    }
  }, [])

  const mount = (children: React.ReactNode): string => {
    const key = generateKey()

    if (managerRef.current) {
      managerRef.current.mount(key, children)
    } else {
      queue.push({ type: 'mount', key, children })
    }

    return key
  }

  const update = (key: string, children: React.ReactNode): void => {
    if (managerRef.current) {
      managerRef.current.update(key, children)
    } else {
      const op = { type: 'mount' as 'mount', key, children }
      const index = queue.findIndex(
        o => o.type === 'mount' || (o.type === 'update' && o.key === key),
      )

      if (index > -1) {
        queue[index] = op
      } else {
        queue.push(op)
      }
    }
  }

  const unmount = (key: string): void => {
    if (managerRef.current) {
      managerRef.current.unmount(key)
      removeKey(key)
    } else {
      queue.push({ type: 'unmount', key })
    }
  }

  return (
    <portalContext.Provider value={{ mount, update, unmount }}>
      <View
        style={[{ flex: 1 }, style]}
        collapsable={false}
        pointerEvents="box-none"
      >
        {children}
      </View>

      <PortalManager ref={managerRef} />
    </portalContext.Provider>
  )
}

interface PortalConsumerProps {
  children: React.ReactNode
  context?: PortalContext
}

const Consumer: React.FC<PortalConsumerProps> = ({ children, context }) => {
  const key = useRef<string>()

  const checkManager = () => {
    if (!context) {
      throw new Error('No portal context defined')
    }
  }

  const handleInit = () => {
    checkManager()
    key.current = context?.mount(children)
  }

  useEffect(() => {
    checkManager()
    context?.update(key.current, children)
  }, [children, context])

  useEffect(() => {
    handleInit()

    return () => {
      checkManager()
      context?.unmount(key.current)
    }
  }, [])

  return null
}

export const Portal: React.FC = ({ children }) => (
  <portalContext.Consumer>
    {context => <Consumer context={context}>{children}</Consumer>}
  </portalContext.Consumer>
)
