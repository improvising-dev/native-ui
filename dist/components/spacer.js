import React, { memo } from 'react';
import { View } from 'react-native';
export const Spacer = memo(({ width, height }) => {
    if (width || height) {
        return <View pointerEvents="box-none" style={{ width, height }}/>;
    }
    return <View pointerEvents="box-none" style={{ flex: 1 }}/>;
});
