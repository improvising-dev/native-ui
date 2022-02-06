import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { useTheme } from '../core/theme'
import { ScrollView, ScrollViewProps } from './scroll-view'
import { StatusBar } from './status-bar'

export interface Page extends ScrollView {}
export interface PageProps extends ScrollViewProps {
  scrollable?: boolean
}

export const Page = React.forwardRef<Page, PageProps>(
  ({ scrollable = false, style, children, ...props }, ref) => {
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
        <ScrollView ref={ref} style={viewStyle} {...props}>
          <StatusBar style="auto" />
          {children}
        </ScrollView>
      )
    }

    return (
      <View style={viewStyle} {...props}>
        <StatusBar style="auto" />
        {children}
      </View>
    )
  },
)
