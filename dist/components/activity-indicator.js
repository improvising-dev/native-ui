import { range } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { useTheme } from '../core/theme';
const calcOutputRange = (count) => {
    return (index) => Math.max(1.0 - index * (1 / (count - 1)), 0);
};
export const ActivityIndicator = ({ size: customSize, count: customCount, color, }) => {
    const theme = useTheme();
    const progress = useRef(new Animated.Value(0));
    const size = customSize !== null && customSize !== void 0 ? customSize : theme.componentTheme.activityIndicator.size;
    const count = customCount !== null && customCount !== void 0 ? customCount : theme.componentTheme.activityIndicator.count;
    const backgroundColor = color !== null && color !== void 0 ? color : theme.componentTheme.activityIndicator.color;
    const renderComponent = (index) => {
        const angle = (index * 360) / count;
        const inputRange = range(0, count + 1).map(i => i / count);
        const outputRange = range(0, count).map(calcOutputRange(count));
        for (let j = 0; j < index; j++) {
            outputRange.unshift(outputRange.pop());
        }
        outputRange.unshift(...outputRange.slice(-1));
        return (<View key={index} style={[
                StyleSheet.absoluteFill,
                {
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                },
                {
                    transform: [
                        {
                            rotate: angle + 'deg',
                        },
                    ],
                },
            ]}>
        <Animated.View style={{
                width: size / 10,
                height: size / 4,
                borderRadius: size / 20,
                backgroundColor,
                opacity: progress.current.interpolate({ inputRange, outputRange }),
            }}/>
      </View>);
    };
    useEffect(() => {
        const animation = Animated.timing(progress.current, {
            toValue: 1,
            easing: Easing.linear,
            duration: 1000,
            isInteraction: true,
            useNativeDriver: true,
        });
        Animated.loop(animation).start();
        //return () => animation.stop()
    }, []);
    return (<View style={{
            width: size,
            height: size,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
      {range(0, count).map(renderComponent)}
    </View>);
};
