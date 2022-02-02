import React, { useContext } from 'react'
import { useWindowDimensions } from 'react-native'

export interface ConstraintsContext {
  maxWidth: number
  maxHeight: number
}

const constraintsContext = React.createContext({} as ConstraintsContext)

export const useConstraints = () => useContext(constraintsContext)

export interface ConstraintsProviderProps {
  maxWidth?: number
  maxHeight?: number
}

export const ConstraintsProvider: React.FC<ConstraintsProviderProps> = ({
  maxWidth: providedMaxWidth,
  maxHeight: providedMaxHeight,
  children,
}) => {
  const dimensions = useWindowDimensions()

  const maxWidth = providedMaxWidth ?? dimensions.width
  const maxHeight = providedMaxHeight ?? dimensions.height

  return (
    <constraintsContext.Provider value={{ maxWidth, maxHeight }}>
      {children}
    </constraintsContext.Provider>
  )
}
