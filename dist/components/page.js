var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { View } from 'react-native';
import { withModal } from '..';
import { useTheme } from '../core/theme';
import { StatusBar } from './status-bar';
const PageComponent = React.forwardRef((_a, ref) => {
    var { style, children } = _a, props = __rest(_a, ["style", "children"]);
    const theme = useTheme();
    const viewStyle = [
        {
            flex: 1,
            backgroundColor: theme.backgroundColor.secondary,
        },
        style,
    ];
    return (<View ref={ref} style={viewStyle} {...props}>
        <StatusBar style="auto"/>
        {children}
      </View>);
});
export const Page = withModal(PageComponent);
