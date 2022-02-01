import React from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from '../core/theme';
import { StatusBar } from './status-bar';
export const Page = ({ scrollable = false, style, children, ...viewProps }) => {
    const theme = useTheme();
    const viewStyle = [
        {
            flex: 1,
            backgroundColor: theme.backgroundColor.secondary,
        },
        style,
    ];
    if (scrollable) {
        return (<ScrollView style={viewStyle} {...viewProps}>
        <StatusBar style="auto"/>
        {children}
      </ScrollView>);
    }
    return (<View style={viewStyle} {...viewProps}>
      <StatusBar style="auto"/>
      {children}
    </View>);
};
