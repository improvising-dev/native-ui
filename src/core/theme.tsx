import React, { useContext } from 'react'
import { TextStyle, useColorScheme } from 'react-native'
import { DarkTheme } from '../themes/dark'
import { LightTheme } from '../themes/light'

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
  sizes: Sizes
  colors: Colors
  textStyles: TextStyles
}

export interface ThemeContext {
  theme: Theme
  darkTheme: Theme
}

const themeContext = React.createContext({} as ThemeContext)

export const useTheme = () => {
  const { theme, darkTheme } = useContext(themeContext)
  const colorScheme = useColorScheme()

  return colorScheme === 'light' ? theme : darkTheme
}

export interface ThemeProviderProps {
  theme?: Theme
  darkTheme?: Theme
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme = LightTheme,
  darkTheme = DarkTheme,
  children,
}) => {
  return (
    <themeContext.Provider value={{ theme, darkTheme }}>
      {children}
    </themeContext.Provider>
  )
}
