import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../core/theme'
import { Modal, ModalStateProps } from './modal'
import { Text } from './text'

export interface ToastProps extends ModalStateProps {
  title?: string
  message?: string
}

export const Toast: React.FC<ToastProps> = ({
  title,
  message,
  visible,
  transitionDuration,
  onDismiss,
  onUnmounted,
}) => {
  const theme = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <Modal
      visible={visible}
      transition="slide-down"
      transitionDuration={transitionDuration}
      backdrop={false}
      enableDismissGesture={true}
      onDismiss={onDismiss}
      onUnmounted={onUnmounted}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: theme.spacing,
        paddingTop: theme.spacing + insets.top,
        backgroundColor: '#303030',
      }}
    >
      {title && (
        <Text
          style={[
            theme.textTheme.small,
            {
              fontWeight: '500',
              marginBottom: 2,
            },
          ]}
        >
          {title}
        </Text>
      )}
      {message && <Text>{message}</Text>}
    </Modal>
  )
}
