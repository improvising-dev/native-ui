import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { BaseController, useMountController } from '../core/controller';
import { useTheme } from '../core/theme';
import { Modal } from './modal';
import { Text } from './text';
export class FullscreenLoadingController extends BaseController {
    setMessage(message) {
        var _a;
        (_a = this.methods) === null || _a === void 0 ? void 0 : _a.setMessage(message);
    }
}
export const FullscreenLoading = ({ controller, visible, transition = 'fade', transitionDuration, onBackdropPressed, onDismiss, onUnmounted, }) => {
    const theme = useTheme();
    const [message, setMessage] = useState();
    const renderMessage = () => {
        if (!message) {
            return null;
        }
        return (<Text style={{
                marginTop: theme.spacing,
                color: theme.white,
            }}>
        {message}
      </Text>);
    };
    useMountController({
        controller,
        methods: { setMessage },
    });
    return (<Modal zIndex={theme.componentTheme.fullscreenLoading.zIndex} visible={visible} transition={transition} transitionDuration={transitionDuration} dismissible={false} onBackdropPressed={onBackdropPressed} onDismiss={onDismiss} onUnmounted={onUnmounted} style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
      <ActivityIndicator color={theme.white}/>
      {renderMessage()}
    </Modal>);
};
