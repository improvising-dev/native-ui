import { useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';
export const useBackHandler = (handler, deps = []) => {
    useEffect(() => {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', handler);
        }
        return () => {
            if (Platform.OS === 'android') {
                BackHandler.removeEventListener('hardwareBackPress', handler);
            }
        };
    }, deps);
};
