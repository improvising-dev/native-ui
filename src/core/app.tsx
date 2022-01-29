import AppLoading from 'expo-app-loading'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ActionSheetDelegate } from '../components/action-sheet-delegate'
import { FullscreenLoadingDelegate } from '../components/fullscreen-loading-delegate'
import { PortalProvider } from '../components/portal'
import { Route, RouterView } from './router'
import { Theme, ThemeProvider, ThemeProviderProps, useTheme } from './theme'

export interface AppContext {
  appIsReady: boolean
}

const appContext = React.createContext({} as AppContext)

export const useApp = () => useContext(appContext)

export interface AppProviderProps
  extends ThemeProviderProps,
    RouterRendererProps {
  loadAsync?: () => Promise<void>
  onReady?: () => void
}

export interface RouterRendererProps {
  initialRouteName?: string
  routes?: Route[] | ((theme: Theme) => Route[])
}

const RouterRenderer: React.FC<RouterRendererProps> = ({
  initialRouteName,
  routes,
}) => {
  const theme = useTheme()

  return (
    <RouterView
      initialRouteName={initialRouteName}
      routes={typeof routes === 'function' ? routes(theme) : routes}
    />
  )
}

export const AppProvider: React.FC<AppProviderProps> = ({
  loadAsync = () => Promise.resolve(),
  onReady,
  theme,
  darkTheme,
  initialRouteName,
  routes,
  children,
}) => {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    if (appIsReady) {
      onReady?.()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return (
      <appContext.Provider value={{ appIsReady }}>
        <AppLoading
          startAsync={loadAsync}
          onFinish={() => setAppIsReady(true)}
          onError={console.warn}
        />
      </appContext.Provider>
    )
  }

  return (
    <appContext.Provider value={{ appIsReady }}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme} darkTheme={darkTheme}>
          <PortalProvider>
            <RouterRenderer
              initialRouteName={initialRouteName}
              routes={routes}
            />
            <FullscreenLoadingDelegate />
            <ActionSheetDelegate />
            {children}
          </PortalProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </appContext.Provider>
  )
}
