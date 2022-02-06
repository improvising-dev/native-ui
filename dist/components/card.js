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
import { Pressable } from 'react-native';
import { HapticFeedback } from '../actions/haptic-feedback';
import { useTheme } from '../core/theme';
export const Card = React.forwardRef((_a, ref) => {
    var { children, style, haptic = false, onPress, onLongPress } = _a, viewProps = __rest(_a, ["children", "style", "haptic", "onPress", "onLongPress"]);
    const theme = useTheme();
    const disabled = !onPress;
    const handlePress = () => {
        if (haptic) {
            HapticFeedback.lightImpact();
        }
        onPress === null || onPress === void 0 ? void 0 : onPress();
    };
    return (<Pressable ref={ref} disabled={disabled} onPress={handlePress} onLongPress={onLongPress} style={[
            {
                backgroundColor: theme.backgroundColor.primary,
                borderRadius: theme.borderRadius,
                padding: theme.spacing,
            },
            style,
        ]} {...viewProps}>
        {children}
      </Pressable>);
});
