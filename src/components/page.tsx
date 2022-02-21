import React from 'react'
import { View, ViewProps } from 'react-native'
import { withModal } from '../core/modal'
import { useTheme } from '../core/theme'
import { ScrollView, ScrollViewProps } from './scroll-view'
import { StatusBar } from './status-bar'

export interface Page extends View {}
export interface PageProps extends ViewProps {}

const PageComponent = React.forwardRef<Page, PageProps>(
  ({ style, children, ...props }, ref) => {
    const theme = useTheme()

    return (
      <View
        ref={ref}
        style={[
          {
            flex: 1,
            backgroundColor: theme.backgroundColor.secondary,
          },
          style,
        ]}
        {...props}
      >
        <StatusBar style="auto" />
        {children}
      </View>
    )
  },
)

export const Page = withModal(PageComponent)

export interface ScrollPage extends ScrollView {}
export interface ScrollPageProps extends ScrollViewProps {}

const ScrollPageComponent = React.forwardRef<ScrollPage, ScrollPageProps>(
  ({ style, children, ...props }, ref) => {
    const theme = useTheme()

    return (
      <ScrollView
        ref={ref}
        style={[
          {
            flex: 1,
            backgroundColor: theme.backgroundColor.secondary,
          },
          style,
        ]}
        {...props}
      >
        <StatusBar style="auto" />
        {children}
      </ScrollView>
    )
  },
)

export const ScrollPage = withModal(ScrollPageComponent)
