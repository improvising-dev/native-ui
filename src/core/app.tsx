import React, { memo } from 'react'
import { Host } from 'react-native-portalize'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RouterProvider, RouterProviderProps } from './router'
import { ThemeProvider, ThemeProviderProps } from './theme'

export interface AppProviderProps
  extends RouterProviderProps,
    ThemeProviderProps {}

export const AppProvider: React.FC<AppProviderProps> = memo(
  ({ theme, darkTheme, initialRouteName, routes }) => {
    return (
      <SafeAreaProvider>
        <ThemeProvider theme={theme} darkTheme={darkTheme}>
          <Host>
            <RouterProvider
              initialRouteName={initialRouteName}
              routes={routes}
            />
          </Host>
        </ThemeProvider>
      </SafeAreaProvider>
    )
  },
)
