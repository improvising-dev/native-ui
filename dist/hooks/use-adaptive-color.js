import { useColorScheme } from 'react-native';
export const useAdaptiveColor = ({ light, dark, }) => {
    const colorScheme = useColorScheme();
    return colorScheme === 'light' ? light : dark;
};
