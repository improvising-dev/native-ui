import React from 'react'
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native'
import { useTheme } from '../core/theme'
import { ScrollView } from './scroll-view'
import { StatusBar } from './status-bar'

export interface PageProps extends ViewProps {
  scrollable?: boolean
  keyboardAvoiding?: boolean
}

export const Page: React.FC<PageProps> = ({
  scrollable = false,
  keyboardAvoiding = false,
  style,
  children,
  ...viewProps
}) => {
  const theme = useTheme()

  const viewStyle: StyleProp<ViewStyle> = [
    {
      flex: 1,
      backgroundColor: theme.backgroundColor.secondary,
    },
    style,
  ]

  if (scrollable) {
    return (
      <ScrollView
        keyboardAvoiding={keyboardAvoiding}
        style={viewStyle}
        {...viewProps}
      >
        <StatusBar style="auto" />
        {children}
      </ScrollView>
    )
  }

  return (
    <View style={viewStyle} {...viewProps}>
      <StatusBar style="auto" />
      {children}
    </View>
  )
}
