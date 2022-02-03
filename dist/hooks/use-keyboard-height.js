import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';
export const useKeyboardHeight = (onChange) => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    useEffect(() => {
        if (Platform.OS === 'ios') {
            const showSub = Keyboard.addListener('keyboardWillShow', keyboardShow);
            const hideSub = Keyboard.addListener('keyboardWillHide', keyboardHide);
            return () => {
                showSub.remove();
                hideSub.remove();
            };
        }
        else {
            const showSub = Keyboard.addListener('keyboardDidShow', keyboardShow);
            const hideSub = Keyboard.addListener('keyboardDidHide', keyboardHide);
            return () => {
                showSub.remove();
                hideSub.remove();
            };
        }
    }, []);
    const keyboardShow = frames => {
        setKeyboardHeight(frames.endCoordinates.height);
        onChange === null || onChange === void 0 ? void 0 : onChange(frames.endCoordinates.height);
    };
    const keyboardHide = () => {
        setKeyboardHeight(0);
        onChange === null || onChange === void 0 ? void 0 : onChange(0);
    };
    return keyboardHeight;
};
