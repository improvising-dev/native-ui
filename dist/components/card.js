import React from 'react';
import { Pressable } from 'react-native';
import { HapticFeedback } from '../actions/haptic-feedback';
import { useTheme } from '../core/theme';
export const Card = ({ children, style, haptic = false, onPressed, ...viewProps }) => {
    const theme = useTheme();
    const disabled = !onPressed;
    const handlePress = () => {
        if (haptic) {
            HapticFeedback.lightImpact();
        }
        onPressed?.();
    };
    return (<Pressable disabled={disabled} onPress={handlePress} style={[
            {
                backgroundColor: theme.backgroundColor.primary,
                borderRadius: theme.borderRadius,
                padding: theme.spacing,
            },
            style,
        ]} {...viewProps}>
      {children}
    </Pressable>);
};
