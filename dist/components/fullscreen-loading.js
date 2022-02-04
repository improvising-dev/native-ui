import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from '../core/theme';
import { Modal } from './modal';
import { Text } from './text';
export class FullscreenLoadingController {
    mount(methods) {
        this.methods = methods;
    }
    unmount() {
        delete this.methods;
    }
    setMessage(message) {
        var _a;
        (_a = this.methods) === null || _a === void 0 ? void 0 : _a.setMessage(message);
    }
}
export const FullscreenLoading = ({ controller, visible, transition = 'fade', transitionDuration, onBackdropPressed, onDismiss, onDisappered, }) => {
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
    useEffect(() => {
        controller === null || controller === void 0 ? void 0 : controller.mount({ setMessage });
        return () => {
            controller === null || controller === void 0 ? void 0 : controller.unmount();
        };
    }, []);
    return (<Modal zIndex={theme.componentTheme.fullscreenLoading.zIndex} visible={visible} transition={transition} transitionDuration={transitionDuration} dismissible={false} onBackdropPressed={onBackdropPressed} onDismiss={onDismiss} onDisappered={onDisappered} style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
      <ActivityIndicator color={theme.white}/>
      {renderMessage()}
    </Modal>);
};
