import React, { useMemo } from 'react';
import { View } from 'react-native';
export const Stack = ({ direction, align, justify, style, spacing, children, }) => {
    const items = useMemo(() => {
        if (!spacing) {
            return children;
        }
        const builder = [];
        let index = 0;
        for (const child of React.Children.toArray(children)) {
            builder.push(<View key={index} style={direction === 'row' || direction === 'row-reverse'
                    ? { width: spacing }
                    : { height: spacing }}/>);
            index++;
            builder.push(<React.Fragment key={index}>{child}</React.Fragment>);
            index++;
        }
        builder.shift();
        return builder;
    }, [children]);
    return (<View style={[
            {
                flexDirection: direction,
                alignItems: align,
                justifyContent: justify,
            },
            style,
        ]}>
      {items}
    </View>);
};
