import React from 'react';
import { TextInput } from 'react-native';
import { useTheme } from '../core/theme';
export const Input = ({ style, ...props }) => {
    const theme = useTheme();
    return (<TextInput selectionColor={theme.primaryColor} style={{
            ...theme.textTheme.default,
            ...style,
        }} {...props}/>);
};
