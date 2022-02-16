import React, { memo } from 'react';
import { Platform, UIManager } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppLoading } from '../components/app-loading';
import { ModalProvider } from '../components/modal-context';
import { RouterDegelate } from './router';
import { ThemeProvider, useTheme } from './theme';
if (Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
const RouterRenderer = ({ initialRouteName, routes, }) => {
    const theme = useTheme();
    return (<RouterDegelate initialRouteName={initialRouteName} routes={typeof routes === 'function' ? routes(theme) : routes}/>);
};
const AppProviderComponent = ({ loadAsync = () => Promise.resolve(), onReady, onError, splashScreen, theme, darkTheme, initialRouteName, routes, }) => {
    return (<SafeAreaProvider>
      <ThemeProvider theme={theme} darkTheme={darkTheme}>
        <ModalProvider>
          <AppLoading splashScreen={splashScreen} loadAsync={loadAsync} onReady={onReady} onError={onError}>
            <RouterRenderer initialRouteName={initialRouteName} routes={routes}/>
          </AppLoading>
        </ModalProvider>
      </ThemeProvider>
    </SafeAreaProvider>);
};
export const AppProvider = memo(AppProviderComponent);
