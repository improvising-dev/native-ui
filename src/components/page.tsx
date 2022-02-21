import React from 'react'
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native'
import { withModal } from '..'
import { useTheme } from '../core/theme'
import { StatusBar } from './status-bar'

export interface Page extends View {}
export interface PageProps extends ViewProps {}

const PageComponent: React.FC<PageProps> = React.forwardRef<Page, PageProps>(
  ({ style, children, ...props }, ref) => {
    const theme = useTheme()
    const viewStyle: StyleProp<ViewStyle> = [
      {
        flex: 1,
        backgroundColor: theme.backgroundColor.secondary,
      },
      style,
    ]

    return (
      <View ref={ref} style={viewStyle} {...props}>
        <StatusBar style="auto" />
        {children}
      </View>
    )
  },
)

export const Page = withModal(PageComponent)
