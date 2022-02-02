import React, { memo, useContext } from 'react'
import { useWindowDimensions } from 'react-native'

export interface Constraints {
  maxWidth?: number
  maxHeight?: number
}

const constraintsContext = React.createContext<Constraints>({})

export const useConstraints = () => {
  const { width, height } = useWindowDimensions()
  const { maxWidth = width, maxHeight = height } =
    useContext(constraintsContext)

  return { maxWidth, maxHeight }
}

export interface ConstraintsProviderProps {
  maxWidth?: number
  maxHeight?: number
}

export const ConstraintsProvider: React.FC<ConstraintsProviderProps> = memo(
  ({ maxWidth, maxHeight, children }) => {
    return (
      <constraintsContext.Provider value={{ maxWidth, maxHeight }}>
        {children}
      </constraintsContext.Provider>
    )
  },
)
