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
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Container } from './container';
export const Stack = React.forwardRef((_a, ref) => {
    var { direction, spacing, children } = _a, viewProps = __rest(_a, ["direction", "spacing", "children"]);
    const node = useMemo(() => {
        if (!spacing) {
            return children;
        }
        return React.Children.toArray(children)
            .filter(Boolean)
            .reduce((builder, element) => {
            if (!builder) {
                return element;
            }
            return (<>
              {builder}
              <View style={direction === 'row' || direction === 'row-reverse'
                    ? { width: spacing }
                    : { height: spacing }}/>
              {element}
            </>);
        }, null);
    }, [direction, spacing, children]);
    return (<Container ref={ref} direction={direction} {...viewProps}>
        {node}
      </Container>);
});
