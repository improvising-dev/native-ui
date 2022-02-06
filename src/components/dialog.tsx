import React, { useState } from 'react'
import { LayoutAnimation } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../core/theme'
import { useKeyboardHeight } from '../hooks/use-keyboard-height'
import { Button } from './button'
import { Input } from './input'
import { Modal, ModalStateProps } from './modal'
import { Stack } from './stack'
import { Text } from './text'

export interface DialogProps extends ModalStateProps {}

export const Dialog: React.FC<DialogProps> = ({
  children,
  visible,
  transition = 'slide-up',
  transitionDuration,
  onBackdropPress,
  onDismiss,
  onUnmounted,
}) => {
  const theme = useTheme()
  const insets = useSafeAreaInsets()

  const [bottomInset, setBottomInset] = useState(insets.bottom)

  useKeyboardHeight(keyboardHeight => {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 200,
    })

    setBottomInset(keyboardHeight > 0 ? keyboardHeight : insets.bottom)
  })

  return (
    <Modal
      zIndex={theme.componentTheme.dialog.zIndex}
      visible={visible}
      transition={transition}
      transitionDuration={transitionDuration}
      onBackdropPress={onBackdropPress}
      onDismiss={onDismiss}
      onUnmounted={onUnmounted}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: theme.spacing,
        paddingBottom: theme.spacing + bottomInset,
        borderTopLeftRadius: theme.borderRadius,
        borderTopRightRadius: theme.borderRadius,
        backgroundColor: theme.backgroundColor.primary,
      }}
    >
      {children}
    </Modal>
  )
}

export interface AlertDialogProps extends DialogProps {
  title: string
  message: string
  okButtonText?: string
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  title,
  message,
  okButtonText = 'Ok',
  visible,
  transition,
  transitionDuration,
  onBackdropPress,
  onDismiss,
  onUnmounted,
}) => {
  const theme = useTheme()

  return (
    <Dialog
      visible={visible}
      transition={transition}
      transitionDuration={transitionDuration}
      onBackdropPress={onBackdropPress}
      onDismiss={onDismiss}
      onUnmounted={onUnmounted}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: '500',
          marginBottom: theme.spacing,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          marginBottom: theme.spacing * 1.5,
        }}
      >
        {message}
      </Text>
      <Button style={{ flex: 1 }} onPress={onDismiss}>
        {okButtonText}
      </Button>
    </Dialog>
  )
}

export interface ConfirmDialogProps extends Omit<DialogProps, 'onDismiss'> {
  title: string
  message: string
  cancelButtonText?: string
  confirmButtonText?: string
  onDismiss?: (result: boolean) => void
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  message,
  cancelButtonText = 'Cancel',
  confirmButtonText = 'Confirm',
  visible,
  transition,
  transitionDuration,
  onBackdropPress,
  onDismiss,
  onUnmounted,
}) => {
  const theme = useTheme()

  return (
    <Dialog
      visible={visible}
      transition={transition}
      transitionDuration={transitionDuration}
      onBackdropPress={onBackdropPress}
      onDismiss={() => onDismiss?.(false)}
      onUnmounted={onUnmounted}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: '500',
          marginBottom: theme.spacing,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          marginBottom: theme.spacing * 1.5,
        }}
      >
        {message}
      </Text>
      <Stack direction="row" spacing={theme.spacing}>
        <Button
          style={{
            flex: 1,
            backgroundColor: theme.backgroundColor.fill,
          }}
          textStyle={{
            color: theme.textColor.primary,
          }}
          onPress={() => onDismiss?.(false)}
        >
          {cancelButtonText}
        </Button>
        <Button style={{ flex: 1 }} onPress={() => onDismiss?.(true)}>
          {confirmButtonText}
        </Button>
      </Stack>
    </Dialog>
  )
}

export interface PromptDialogProps extends Omit<DialogProps, 'onDismiss'> {
  title: string
  message?: string
  cancelButtonText?: string
  confirmButtonText?: string
  placeholder?: string
  initialValue?: string
  onDismiss?: (result?: string) => void
}

export const PromptDialog: React.FC<PromptDialogProps> = ({
  title,
  message,
  cancelButtonText = 'Cancel',
  confirmButtonText = 'Confirm',
  placeholder,
  initialValue = '',
  visible,
  transition,
  transitionDuration,
  onBackdropPress,
  onDismiss,
  onUnmounted,
}) => {
  const theme = useTheme()
  const [text, setText] = useState(initialValue)

  return (
    <Dialog
      visible={visible}
      transition={transition}
      transitionDuration={transitionDuration}
      onBackdropPress={onBackdropPress}
      onDismiss={() => onDismiss?.()}
      onUnmounted={onUnmounted}
    >
      <Text
        style={[
          theme.componentTheme.dialog.titleTextStyle,
          {
            marginBottom: theme.spacing,
          },
        ]}
      >
        {title}
      </Text>
      {message && (
        <Text
          style={[
            theme.componentTheme.dialog.messageTextStyle,
            {
              marginBottom: theme.spacing,
            },
          ]}
        >
          {message}
        </Text>
      )}
      <Input
        autoFocus={true}
        returnKeyType="done"
        defaultValue={text}
        onChangeText={setText}
        placeholder={placeholder}
        style={{
          padding: theme.spacing,
          borderRadius: theme.borderRadius,
          backgroundColor: theme.backgroundColor.fill,
          marginBottom: theme.spacing,
        }}
      />
      <Stack direction="row" spacing={theme.spacing}>
        <Button
          style={{
            flex: 1,
            backgroundColor: theme.backgroundColor.fill,
          }}
          textStyle={{
            color: theme.textColor.primary,
          }}
          onPress={() => onDismiss?.()}
        >
          {cancelButtonText}
        </Button>
        <Button style={{ flex: 1 }} onPress={() => onDismiss?.(text)}>
          {confirmButtonText}
        </Button>
      </Stack>
    </Dialog>
  )
}
