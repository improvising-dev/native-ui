import React from 'react';
import { View } from 'react-native';
export const AppLoading = ({ loadAsync, onComplete, onError, }) => {
    const handleLayout = () => {
        loadAsync().then(onComplete).catch(onError);
    };
    return <View onLayout={handleLayout}/>;
};
