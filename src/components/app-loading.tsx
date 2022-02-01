import { ActivityIndicator, useColorScheme, View } from 'react-native'

export interface AppLoadingProps {
  loadAsync: () => Promise<void>
  onComplete: () => void
  onError: (reason: any) => void
}

export const AppLoading: React.FC<AppLoadingProps> = ({
  loadAsync,
  onComplete,
  onError,
}) => {
  const colorScheme = useColorScheme()

  const backgroundColor = colorScheme === 'dark' ? '#000000' : '#ffffff'
  const activityIndicatorColor = colorScheme === 'dark' ? '#ffffff' : '#000000'

  const handleLayout = () => {
    loadAsync().then(onComplete).catch(onError)
  }

  return (
    <View
      onLayout={handleLayout}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
      }}
    >
      <ActivityIndicator color={activityIndicatorColor} />
    </View>
  )
}
