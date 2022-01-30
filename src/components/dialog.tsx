import { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../core/theme'
import { useKeyboardHeight } from '../hooks/use-keyboard-height'
import { Button } from './button'
import { Input } from './input'
import { Modal, ModalProps } from './modal'
import { Stack } from './stack'
import { Text } from './text'

export interface DialogProps
  extends Pick<ModalProps, 'visible' | 'onDismiss'> {}

export const Dialog: React.FC<DialogProps> = ({
  visible,
  onDismiss,
  children,
}) => {
  const theme = useTheme()
  const insets = useSafeAreaInsets()
  const keyboardHeight = useKeyboardHeight()

  return (
    <Modal
      visible={visible}
      onDismiss={onDismiss}
      transition="slide"
      zIndex={theme.componentTheme.dialog.zIndex}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: theme.spacing,
        paddingBottom:
          theme.spacing + (keyboardHeight > 0 ? keyboardHeight : insets.bottom),
        borderTopLeftRadius: theme.borderRadius,
        borderTopRightRadius: theme.borderRadius,
        backgroundColor: theme.backgroundColor.primary,
      }}
    >
      {children}
    </Modal>
  )
}

export interface AlertDialogProps {
  title: string
  message: string
  okButtonText?: string
  visible: boolean
  onDismiss?: () => void
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  title,
  message,
  okButtonText = 'Ok',
  visible,
  onDismiss,
}) => {
  const theme = useTheme()

  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
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
      <Button style={{ flex: 1 }} onPressed={() => onDismiss}>
        {okButtonText}
      </Button>
    </Dialog>
  )
}

export interface ConfirmDialogProps {
  title: string
  message: string
  cancelButtonText?: string
  confirmButtonText?: string
  visible: boolean
  onDismiss?: (result: boolean) => void
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  message,
  cancelButtonText = 'Cancel',
  confirmButtonText = 'Confirm',
  visible,
  onDismiss,
}) => {
  const theme = useTheme()

  return (
    <Dialog visible={visible} onDismiss={() => onDismiss?.(false)}>
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
          onPressed={() => onDismiss?.(false)}
        >
          {cancelButtonText}
        </Button>
        <Button style={{ flex: 1 }} onPressed={() => onDismiss?.(true)}>
          {confirmButtonText}
        </Button>
      </Stack>
    </Dialog>
  )
}

export interface PromptDialogProps {
  title: string
  message?: string
  cancelButtonText?: string
  confirmButtonText?: string
  placeholder?: string
  initialValue?: string
  visible: boolean
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
  onDismiss,
}) => {
  const theme = useTheme()
  const [text, setText] = useState(initialValue)

  return (
    <Dialog visible={visible} onDismiss={() => onDismiss?.()}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '500',
          marginBottom: theme.spacing,
        }}
      >
        {title}
      </Text>
      {message && (
        <Text
          style={{
            color: theme.textColor.secondary,
            marginBottom: theme.spacing,
          }}
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
          onPressed={() => onDismiss?.()}
        >
          {cancelButtonText}
        </Button>
        <Button style={{ flex: 1 }} onPressed={() => onDismiss?.()}>
          {confirmButtonText}
        </Button>
      </Stack>
    </Dialog>
  )
}
