import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { StatusBar } from '../components/status-bar'
import { withModal } from './modal'
import { RouteName, RouteProps } from './router'
import { useTheme } from './theme'

export const createPage = <T extends RouteName>(
  Component: React.ComponentType<any>,
): React.ComponentType<RouteProps<T>> => {
  const theme = useTheme()
  const viewStyle: StyleProp<ViewStyle> = [
    {
      flex: 1,
      backgroundColor: theme.backgroundColor.secondary,
    },
  ]

  return withModal((props: RouteProps<T>) => (
    <View pointerEvents="box-none" style={viewStyle}>
      <StatusBar style="auto" />
      <Component {...props} />
    </View>
  ))
}
