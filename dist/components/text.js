import React from 'react';
import { Text as RNText } from 'react-native';
import { useTheme } from '../core/theme';
export const Text = ({ children, style, ...textProps }) => {
    const theme = useTheme();
    return (<RNText style={[theme.textTheme.default, style]} {...textProps}>
      {children}
    </RNText>);
};
