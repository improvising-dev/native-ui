import React, { useEffect, useState } from 'react';
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
export const AppProvider = ({ loadAsync = () => Promise.resolve(), onReady, theme, darkTheme, initialRouteName, routes, children, }) => {
    const [appIsReady, setAppIsReady] = useState(false);
    useEffect(() => {
        if (appIsReady) {
            onReady === null || onReady === void 0 ? void 0 : onReady();
        }
    }, [appIsReady]);
    if (!appIsReady) {
        return (<AppLoading loadAsync={loadAsync} onComplete={() => setAppIsReady(true)} onError={console.warn}/>);
    }
    return (<SafeAreaProvider>
      <ThemeProvider theme={theme} darkTheme={darkTheme}>
        <ModalProvider>
          <RouterRenderer initialRouteName={initialRouteName} routes={routes}/>
          {children}
        </ModalProvider>
      </ThemeProvider>
    </SafeAreaProvider>);
};
