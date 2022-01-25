import React, { useContext } from 'react'
import { TextStyle, useColorScheme } from 'react-native'
import { DarkTheme } from '../themes/dark'
import { LightTheme } from '../themes/light'

export type Brightness = 'light' | 'dark'

export interface Sizes {
  spacing: number
  borderRadius: number
}

export interface Colors {
  white: string
  black: string
  primary: string
  background: {
    primary: string
    secondary: string
  }
  text: {
    primary: string
    secondary: string
    placeholder: string
    unselected: string
  }
}

export interface TextStyles {
  default: TextStyle
  body: TextStyle
  button: TextStyle
  small: TextStyle
  tab: TextStyle
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
