import React from 'react';
import { StatusBar as RNStatusBar, useColorScheme, } from 'react-native';
export const resolveStatusBarStyle = (style, colorScheme) => {
    let resolvedStyle = style;
    if (style === 'auto') {
        resolvedStyle = colorScheme === 'light' ? 'dark' : 'light';
    }
    else if (style === 'inverted') {
        resolvedStyle = colorScheme === 'light' ? 'light' : 'dark';
    }
    return resolvedStyle === 'light' ? 'light-content' : 'dark-content';
};
export const StatusBar = ({ style = 'auto', animated = true, translucent = true, hidden = false, }) => {
    const colorScheme = useColorScheme();
    const barStyle = resolveStatusBarStyle(style, colorScheme);
    return (<RNStatusBar barStyle={barStyle} animated={animated} translucent={translucent} hidden={hidden}/>);
};
