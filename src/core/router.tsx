import {
  CommonActions,
  createNavigationContainerRef,
  NavigationContainer,
  ParamListBase,
  StackActions,
} from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import React from 'react'

export interface RouteParamList extends ParamListBase {}

export type RouteName = Extract<keyof RouteParamList, string>
export type RouteProps<T extends RouteName> = NativeStackScreenProps<
  RouteParamList,
  T
>

export const navigationRef = createNavigationContainerRef<RouteParamList>()

export class Router {
  static push<T extends RouteName>(name: T, params?: RouteParamList[T]) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.push(name, params))
    }
  }

  static replace<T extends RouteName>(
    name: RouteName,
    params?: RouteParamList[T],
  ) {
    if (navigationRef.isReady()) {
      navigationRef.dispatch(StackActions.replace(name, params))
    }
  }

  static reset<T extends RouteName>(
    name: RouteName,
    params?: RouteParamList[T],
  ) {
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

export interface Route {
  name: RouteName
  component: React.ComponentType<any>
  options?: NativeStackNavigationOptions
}

export interface RouterDelegteProps {
  initialRouteName?: RouteName
  routes?: Route[]
}

const Stack = createNativeStackNavigator()

export const RouterDegelate: React.FC<RouterDelegteProps> = ({
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
