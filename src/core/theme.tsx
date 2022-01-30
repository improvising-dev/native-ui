import React, { useContext } from 'react'
import { TextStyle, useColorScheme } from 'react-native'
import { DarkTheme } from '../themes/dark'
import { LightTheme } from '../themes/light'

export type Brightness = 'light' | 'dark'

export interface TextTheme {
  default: TextStyle
  body: TextStyle
  button: TextStyle
  small: TextStyle
}

export interface ComponentTheme {
  actionSheet: {
    zIndex: number
    itemHeight: number
  }
  checkbox: {
    size: number
  }
  dialog: {
    zIndex: number
  }
  fullscreenLoading: {
    zIndex: number
  }
  picker: {
    itemHeight: number
    titleTextStyle: TextStyle
    subtitleTextStyle: TextStyle
  }
}

export interface Theme {
  brightness: Brightness

  spacing: number
  borderRadius: number

  white: string
  black: string

  primaryColor: string
  primaryContrastingColor: string

  backgroundColor: {
    primary: string
    secondary: string
    fill: string
    modalBarrier: string
  }

  textColor: {
    primary: string
    primaryUnselected: string
    secondary: string
    secondaryUnselected: string
    placeholder: string
  }

  textTheme: TextTheme
  componentTheme: ComponentTheme
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
