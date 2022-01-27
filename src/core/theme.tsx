import React, { useContext } from 'react'
import { TextStyle, useColorScheme } from 'react-native'
import { DarkTheme } from '../themes/dark'
import { LightTheme } from '../themes/light'

export type Brightness = 'light' | 'dark'

export interface Sizes {
  spacing: number
  borderRadius: number
  checkBoxSize: number
  actionSheetItemHeight: number
}

export interface Colors {
  white: string
  black: string
  primary: string
  background: {
    primary: string
    secondary: string
    fill: string
    modalBarrier: string
  }
  text: {
    primary: string
    primaryUnselected: string
    secondary: string
    secondaryUnselected: string
    placeholder: string
  }
}

export interface TextStyles {
  default: TextStyle
  body: TextStyle
  button: TextStyle
  small: TextStyle
  tab: TextStyle
  picker: {
    title: TextStyle
    subtitle: TextStyle
  }
}

export interface Theme {
  brightness: Brightness
  sizes: Sizes
  colors: Colors
  textStyles: TextStyles
}

const themeContext = React.createContext({} as Theme)

export const useTheme = () => useContext(themeContext)

export interface ThemeProviderProps {
  theme?: Theme
  darkTheme?: Theme
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme = LightTheme,
  darkTheme = DarkTheme,
  children,
}) => {
  const colorScheme = useColorScheme()
  const selected = colorScheme === 'light' ? theme : darkTheme

  return (
    <themeContext.Provider value={selected}>{children}</themeContext.Provider>
  )
}
