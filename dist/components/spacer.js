import React, { memo } from 'react';
import { View } from 'react-native';
const SpacerComponent = ({ width, height }) => {
    if (width || height) {
        return <View pointerEvents="box-none" style={{ width, height }}/>;
    }
    return <View pointerEvents="box-none" style={{ flex: 1 }}/>;
};
export const Spacer = memo(SpacerComponent);
