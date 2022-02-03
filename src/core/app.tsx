import React, { useEffect, useState } from 'react'
import { Platform, UIManager } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppLoading } from '../components/app-loading'
import { ModalProvider } from '../components/modal-context'
import { PortalProvider } from '../components/portal'
import { Route, RouterView, RouteParamList } from './router'
import { Theme, ThemeProvider, ThemeProviderProps, useTheme } from './theme'

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export interface AppProviderProps
  extends ThemeProviderProps,
    RouterRendererProps {
  loadAsync?: () => Promise<void>
  onReady?: () => void
}

export interface RouterRendererProps {
  initialRouteName?: keyof RouteParamList
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
      <AppLoading
        loadAsync={loadAsync}
        onComplete={() => setAppIsReady(true)}
        onError={console.warn}
      />
    )
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme} darkTheme={darkTheme}>
        <PortalProvider>
          <ModalProvider>
            <RouterRenderer
              initialRouteName={initialRouteName}
              routes={routes}
            />
            {children}
          </ModalProvider>
        </PortalProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
