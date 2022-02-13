import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
import { AndroidKeyboard, } from 'react-native-android-keyboard';
export const useKeyboardHeight = (onChange) => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const handleAndroidKeyboardEvent = height => {
        setKeyboardHeight(height);
        onChange === null || onChange === void 0 ? void 0 : onChange(height);
    };
    const handleKeyboardShow = event => {
        setKeyboardHeight(event.endCoordinates.height);
        onChange === null || onChange === void 0 ? void 0 : onChange(event.endCoordinates.height);
    };
    const handleKeyboardHide = () => {
        setKeyboardHeight(0);
        onChange === null || onChange === void 0 ? void 0 : onChange(0);
    };
    useEffect(() => {
        if (Platform.OS === 'android') {
            AndroidKeyboard.addListener(handleAndroidKeyboardEvent);
            return () => {
                AndroidKeyboard.removeListener(handleAndroidKeyboardEvent);
            };
        }
        else {
            const [keyboardWillShowSub, keyboardWillHideSub] = [
                Keyboard.addListener('keyboardWillShow', handleKeyboardShow),
                Keyboard.addListener('keyboardWillHide', handleKeyboardHide),
            ];
            return () => {
                keyboardWillShowSub.remove();
                keyboardWillHideSub.remove();
            };
        }
    }, []);
    return keyboardHeight;
};
