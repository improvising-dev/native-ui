import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppLoading } from '../components/app-loading';
import { ModalProvider } from '../components/modal-context';
import { PortalProvider } from '../components/portal';
import { RouterView } from './router';
import { ThemeProvider, useTheme } from './theme';
const RouterRenderer = ({ initialRouteName, routes, }) => {
    const theme = useTheme();
    return (<RouterView initialRouteName={initialRouteName} routes={typeof routes === 'function' ? routes(theme) : routes}/>);
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
        <PortalProvider>
          <ModalProvider>
            <RouterRenderer initialRouteName={initialRouteName} routes={routes}/>
            {children}
          </ModalProvider>
        </PortalProvider>
      </ThemeProvider>
    </SafeAreaProvider>);
};
