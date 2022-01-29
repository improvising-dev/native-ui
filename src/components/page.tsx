import { StatusBar } from 'expo-status-bar'
import { ScrollView, View, ViewStyle } from 'react-native'
import { useTheme } from '../core/theme'

export interface PageProps {
  scrollable?: boolean
  style?: ViewStyle
}

export const Page: React.FC<PageProps> = ({
  scrollable = false,
  style,
  children,
}) => {
  const theme = useTheme()

  const viewStyle: ViewStyle = {
    flex: 1,
    backgroundColor: theme.backgroundColor.secondary,
    ...style,
  }

  if (scrollable) {
    return (
      <ScrollView style={viewStyle}>
        <StatusBar style="auto" />
        {children}
      </ScrollView>
    )
  }

  return (
    <View style={viewStyle}>
      <StatusBar style="auto" />
      {children}
    </View>
  )
}
