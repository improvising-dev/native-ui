import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../core/theme';
import { useKeyboardHeight } from '../hooks/use-keyboard-height';
import { Button } from './button';
import { Input } from './input';
import { Modal } from './modal';
import { Stack } from './stack';
import { Text } from './text';
export const Dialog = ({ children, visible, transitionDuration, onBackdropPressed, onDismiss, onUnmounted, }) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const keyboardHeight = useKeyboardHeight();
    return (<Modal zIndex={theme.componentTheme.dialog.zIndex} visible={visible} transition="slide" transitionDuration={transitionDuration} onBackdropPressed={onBackdropPressed} onDismiss={onDismiss} onUnmounted={onUnmounted} style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: theme.spacing,
            paddingBottom: theme.spacing + (keyboardHeight > 0 ? keyboardHeight : insets.bottom),
            borderTopLeftRadius: theme.borderRadius,
            borderTopRightRadius: theme.borderRadius,
            backgroundColor: theme.backgroundColor.primary,
        }}>
      {children}
    </Modal>);
};
export const AlertDialog = ({ title, message, okButtonText = 'Ok', visible, transitionDuration, onBackdropPressed, onDismiss, onUnmounted, }) => {
    const theme = useTheme();
    return (<Dialog visible={visible} transitionDuration={transitionDuration} onBackdropPressed={onBackdropPressed} onDismiss={onDismiss} onUnmounted={onUnmounted}>
      <Text style={{
            fontSize: 20,
            fontWeight: '500',
            marginBottom: theme.spacing,
        }}>
        {title}
      </Text>
      <Text style={{
            marginBottom: theme.spacing * 1.5,
        }}>
        {message}
      </Text>
      <Button style={{ flex: 1 }} onPressed={onDismiss}>
        {okButtonText}
      </Button>
    </Dialog>);
};
export const ConfirmDialog = ({ title, message, cancelButtonText = 'Cancel', confirmButtonText = 'Confirm', visible, transitionDuration, onBackdropPressed, onDismiss, onUnmounted, }) => {
    const theme = useTheme();
    return (<Dialog visible={visible} transitionDuration={transitionDuration} onBackdropPressed={onBackdropPressed} onDismiss={() => onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss(false)} onUnmounted={onUnmounted}>
      <Text style={{
            fontSize: 20,
            fontWeight: '500',
            marginBottom: theme.spacing,
        }}>
        {title}
      </Text>
      <Text style={{
            marginBottom: theme.spacing * 1.5,
        }}>
        {message}
      </Text>
      <Stack direction="row" spacing={theme.spacing}>
        <Button style={{
            flex: 1,
            backgroundColor: theme.backgroundColor.fill,
        }} textStyle={{
            color: theme.textColor.primary,
        }} onPressed={() => onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss(false)}>
          {cancelButtonText}
        </Button>
        <Button style={{ flex: 1 }} onPressed={() => onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss(true)}>
          {confirmButtonText}
        </Button>
      </Stack>
    </Dialog>);
};
export const PromptDialog = ({ title, message, cancelButtonText = 'Cancel', confirmButtonText = 'Confirm', placeholder, initialValue = '', visible, transitionDuration, onBackdropPressed, onDismiss, onUnmounted, }) => {
    const theme = useTheme();
    const [text, setText] = useState(initialValue);
    return (<Dialog visible={visible} transitionDuration={transitionDuration} onBackdropPressed={onBackdropPressed} onDismiss={() => onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss()} onUnmounted={onUnmounted}>
      <Text style={[
            theme.componentTheme.dialog.titleTextStyle,
            {
                marginBottom: theme.spacing,
            },
        ]}>
        {title}
      </Text>
      {message && (<Text style={[
                theme.componentTheme.dialog.messageTextStyle,
                {
                    marginBottom: theme.spacing,
                },
            ]}>
          {message}
        </Text>)}
      <Input autoFocus={true} returnKeyType="done" defaultValue={text} onChangeText={setText} placeholder={placeholder} style={{
            padding: theme.spacing,
            borderRadius: theme.borderRadius,
            backgroundColor: theme.backgroundColor.fill,
            marginBottom: theme.spacing,
        }}/>
      <Stack direction="row" spacing={theme.spacing}>
        <Button style={{
            flex: 1,
            backgroundColor: theme.backgroundColor.fill,
        }} textStyle={{
            color: theme.textColor.primary,
        }} onPressed={() => onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss()}>
          {cancelButtonText}
        </Button>
        <Button style={{ flex: 1 }} onPressed={() => onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss()}>
          {confirmButtonText}
        </Button>
      </Stack>
    </Dialog>);
};
