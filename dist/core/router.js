import { CommonActions, createNavigationContainerRef, NavigationContainer, StackActions, } from '@react-navigation/native';
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import React from 'react';
import { withModal } from './modal';
export const navigationRef = createNavigationContainerRef();
export class Router {
    static push(name, params) {
        if (navigationRef.isReady()) {
            navigationRef.dispatch(StackActions.push(name, params));
        }
    }
    static replace(name, params) {
        if (navigationRef.isReady()) {
            navigationRef.dispatch(StackActions.replace(name, params));
        }
    }
    static reset(name, params) {
        if (navigationRef.isReady()) {
            navigationRef.dispatch(CommonActions.reset({
                index: 0,
                routes: [{ name, params }],
            }));
        }
    }
    static pop() {
        if (navigationRef.isReady() && navigationRef.canGoBack()) {
            navigationRef.dispatch(StackActions.pop());
        }
    }
}
const Stack = createNativeStackNavigator();
export const RouterDegelate = ({ initialRouteName, routes = [], }) => {
    return (<NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={initialRouteName} defaultScreenOptions={{
            animationTypeForReplace: 'push',
            animation: 'slide_from_left',
        }}>
        {routes.map(route => (<Stack.Screen key={route.name} name={route.name} component={withModal(route.component)} options={route.options}/>))}
      </Stack.Navigator>
    </NavigationContainer>);
};
