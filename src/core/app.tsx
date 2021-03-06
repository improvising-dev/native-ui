import React, { memo } from 'react'
import { Platform, UIManager } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RouteName } from '..'
import { AppLoading } from '../components/app-loading'
import { ModalProvider } from '../components/modal-context'
import { Route, RouterDelegate } from './router'
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
  splashScreen?: React.ReactNode
  loadAsync?: () => Promise<void>
  onReady?: () => void
  onError?: (reason: any) => void
}

export interface RouterRendererProps {
  initialRouteName?: RouteName | (() => RouteName)
  routes?: Route[] | ((theme: Theme) => Route[])
}

const RouterRenderer: React.FC<RouterRendererProps> = memo(
  ({ initialRouteName, routes }) => {
    const theme = useTheme()

    return (
      <RouterDelegate
        initialRouteName={
          typeof initialRouteName === 'function'
            ? initialRouteName()
            : initialRouteName
        }
        routes={typeof routes === 'function' ? routes(theme) : routes}
      />
    )
  },
)

const AppProviderComponent: React.FC<AppProviderProps> = ({
  loadAsync = () => Promise.resolve(),
  onReady,
  onError,
  splashScreen,
  theme,
  darkTheme,
  initialRouteName,
  routes,
}) => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme} darkTheme={darkTheme}>
        <ModalProvider>
          <AppLoading
            splashScreen={splashScreen}
            loadAsync={loadAsync}
            onReady={onReady}
            onError={onError}
          >
            <RouterRenderer
              initialRouteName={initialRouteName}
              routes={routes}
            />
          </AppLoading>
        </ModalProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export const AppProvider = memo(AppProviderComponent)
