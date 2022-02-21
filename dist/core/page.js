import React from 'react';
import { View } from 'react-native';
import { StatusBar } from '../components/status-bar';
import { withModal } from './modal';
import { useTheme } from './theme';
export const createPage = (Component) => {
    const theme = useTheme();
    const viewStyle = [
        {
            flex: 1,
            backgroundColor: theme.backgroundColor.secondary,
        },
    ];
    return withModal((props) => (<View pointerEvents="box-none" style={viewStyle}>
      <StatusBar style="auto"/>
      <Component {...props}/>
    </View>));
};
