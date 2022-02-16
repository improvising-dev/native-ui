import React from 'react'
import {
  ColorSchemeName,
  StatusBar as RNStatusBar,
  StatusBarProps as RNStatusBarProps,
  useColorScheme,
} from 'react-native'

export type StatusBarStyle = 'auto' | 'inverted' | 'light' | 'dark'

export interface StatusBarProps {
  style?: StatusBarStyle
  animated?: boolean
  translucent?: boolean
  hidden?: boolean
  backgroundColor?: string
}

export const resolveStatusBarStyle = (
  style: StatusBarStyle,
  colorScheme: ColorSchemeName,
): RNStatusBarProps['barStyle'] => {
  let resolvedStyle = style

  if (style === 'auto') {
    resolvedStyle = colorScheme === 'light' ? 'dark' : 'light'
  } else if (style === 'inverted') {
    resolvedStyle = colorScheme === 'light' ? 'light' : 'dark'
  }

  return resolvedStyle === 'light' ? 'light-content' : 'dark-content'
}

export const StatusBar: React.FC<StatusBarProps> = ({
  style = 'auto',
  animated = true,
  translucent = true,
  hidden = false,
  backgroundColor = '#ffffff00',
}) => {
  const colorScheme = useColorScheme()
  const barStyle = resolveStatusBarStyle(style, colorScheme)

  return (
    <RNStatusBar
      barStyle={barStyle}
      animated={animated}
      translucent={translucent}
      backgroundColor={backgroundColor}
      hidden={hidden}
    />
  )
}
