import { useColorScheme } from 'react-native'

export const useAdaptiveColor = ({
  light,
  dark,
}: {
  light: string
  dark: string
}) => {
  const colorScheme = useColorScheme()

  return colorScheme === 'light' ? light : dark
}
