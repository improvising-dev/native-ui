import React, { useContext } from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme } from '../themes/dark';
import { LightTheme } from '../themes/light';
const themeContext = React.createContext({});
export const useTheme = () => useContext(themeContext);
export const ThemeProvider = ({ theme = LightTheme, darkTheme = DarkTheme, children, }) => {
    const colorScheme = useColorScheme();
    const selected = colorScheme === 'light' ? theme : darkTheme;
    return (<themeContext.Provider value={selected}>{children}</themeContext.Provider>);
};
