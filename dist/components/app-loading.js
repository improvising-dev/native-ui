import React from 'react';
import { StyleSheet, View } from 'react-native';
export const AppLoading = ({ children, loadAsync, onComplete, onError, }) => {
    const handleLayout = () => {
        loadAsync().then(onComplete).catch(onError);
    };
    return (<View style={StyleSheet.absoluteFill} pointerEvents="box-none" onLayout={handleLayout}>
      {children}
    </View>);
};
