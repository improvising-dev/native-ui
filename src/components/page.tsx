import React from 'react'
import { ScrollView, StyleProp, View, ViewProps, ViewStyle } from 'react-native'
import { useTheme } from '../core/theme'
import { StatusBar } from './status-bar'

export interface PageProps extends ViewProps {
  scrollable?: boolean
}

export const Page: React.FC<PageProps> = ({
  scrollable = false,
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
      <ScrollView style={viewStyle} {...viewProps}>
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
