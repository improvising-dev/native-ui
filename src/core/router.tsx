import {
  createNavigationContainerRef,
  NavigationContainer,
  ParamListBase,
  StackActions,
} from '@react-navigation/native'
import React, { memo } from 'react'
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'

export const navigationRef = createNavigationContainerRef<ParamListBase>()

export class Router {
  static push(name: string, params?: any) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.push(name, params))
    }
  }

  static replace(name: string, params?: any) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.replace(name, params))
    }
  }

  static reset(name: string, params?: any) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.popToTop())
      navigationRef.dispatch(StackActions.replace(name, params))
    }
  }

  static pop() {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.pop())
    }
  }
}

export interface Route {
  name: string
  component: React.ComponentType
  options?: NativeStackNavigationOptions
}

export interface RouterViewProps {
  initialRouteName?: string
  routes?: Route[]
}

const Stack = createNativeStackNavigator()

export const RouterView: React.FC<RouterViewProps> = memo(
  ({ initialRouteName, routes = [] }) => {
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={initialRouteName}>
          {routes.map(route => (
            <Stack.Screen
              name={route.name}
              component={route.component}
              options={route.options}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    )
  },
)
