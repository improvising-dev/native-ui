import React, { useState } from 'react';
import { LayoutAnimation } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../core/theme';
import { useKeyboardHeight } from '../hooks/use-keyboard-height';
import { Button } from './button';
import { Input } from './input';
import { Modal } from './modal';
import { Stack } from './stack';
import { Text } from './text';
const DIALOG_TRANSITION_DURATION = 400;
export const Dialog = ({ children, visible, transition = 'slide-up', transitionDuration = DIALOG_TRANSITION_DURATION, onBackdropPress, onDismiss, onUnmounted, }) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();
    const [bottomInset, setBottomInset] = useState(insets.bottom);
    useKeyboardHeight(keyboardHeight => {
        LayoutAnimation.configureNext(Object.assign(Object.assign({}, LayoutAnimation.Presets.easeInEaseOut), { duration: 200 }));
        setBottomInset(keyboardHeight > 0 ? keyboardHeight : insets.bottom);
    });
    return (<Modal zIndex={theme.componentTheme.dialog.zIndex} visible={visible} transition={transition} transitionDuration={transitionDuration} onBackdropPress={onBackdropPress} onDismiss={onDismiss} onUnmounted={onUnmounted} style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: theme.spacing,
            paddingBottom: theme.spacing + bottomInset,
            borderTopLeftRadius: theme.borderRadius,
            borderTopRightRadius: theme.borderRadius,
            backgroundColor: theme.backgroundColor.primary,
        }}>
      {children}
    </Modal>);
};
export const AlertDialog = ({ title, message, okButtonText = 'Ok', visible, transition, transitionDuration = DIALOG_TRANSITION_DURATION, onBackdropPress, onDismiss, onUnmounted, }) => {
    const theme = useTheme();
    return (<Dialog visible={visible} transition={transition} transitionDuration={transitionDuration} onBackdropPress={onBackdropPress} onDismiss={onDismiss} onUnmounted={onUnmounted}>
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
      <Button style={{ flex: 1 }} onPress={onDismiss}>
        {okButtonText}
      </Button>
    </Dialog>);
};
export const ConfirmDialog = ({ title, message, cancelButtonText = 'Cancel', confirmButtonText = 'Confirm', visible, transition, transitionDuration = DIALOG_TRANSITION_DURATION, onBackdropPress, onDismiss, onUnmounted, }) => {
    const theme = useTheme();
    return (<Dialog visible={visible} transition={transition} transitionDuration={transitionDuration} onBackdropPress={onBackdropPress} onDismiss={() => onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss(false)} onUnmounted={onUnmounted}>
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
        }} onPress={() => onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss(false)}>
          {cancelButtonText}
        </Button>
        <Button style={{ flex: 1 }} onPress={() => onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss(true)}>
          {confirmButtonText}
        </Button>
      </Stack>
    </Dialog>);
};
export const PromptDialog = ({ title, message, cancelButtonText = 'Cancel', confirmButtonText = 'Confirm', placeholder, initialValue = '', visible, transition, transitionDuration = DIALOG_TRANSITION_DURATION, onBackdropPress, onDismiss, onUnmounted, }) => {
    const theme = useTheme();
    const [text, setText] = useState(initialValue);
    return (<Dialog visible={visible} transition={transition} transitionDuration={transitionDuration} onBackdropPress={onBackdropPress} onDismiss={() => onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss()} onUnmounted={onUnmounted}>
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
      <Input autoFocus={true} autoFocusDelay={transitionDuration} returnKeyType="done" defaultValue={text} onChangeText={setText} placeholder={placeholder} style={{
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
        }} onPress={() => onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss()}>
          {cancelButtonText}
        </Button>
        <Button style={{ flex: 1 }} onPress={() => onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss(text)}>
          {confirmButtonText}
        </Button>
      </Stack>
    </Dialog>);
};
