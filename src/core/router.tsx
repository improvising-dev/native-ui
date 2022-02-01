import {
  CommonActions,
  createNavigationContainerRef,
  NavigationContainer,
  StackActions,
} from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import React from 'react'

export interface RouteParamList {}

export const navigationRef = createNavigationContainerRef<RouteParamList>()

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
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name, params }],
        }),
      )
    }
  }

  static pop() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
      navigationRef.dispatch(StackActions.pop())
    }
  }
}

export type RouteProps<T extends keyof RouteParamList> =
  NativeStackScreenProps<T>

export interface Route {
  name: keyof RouteParamList
  component: React.ComponentType
  options?: NativeStackNavigationOptions
}

export interface RouterViewProps {
  initialRouteName?: keyof RouteParamList
  routes?: Route[]
}

const Stack = createNativeStackNavigator()

export const RouterView: React.FC<RouterViewProps> = ({
  initialRouteName,
  routes = [],
}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={initialRouteName}>
        {routes.map(route => (
          <Stack.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={route.options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
