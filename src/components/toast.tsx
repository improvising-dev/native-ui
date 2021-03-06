import React, { memo, useEffect, useRef } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../core/theme'
import { Modal, ModalProps, ModalStateProps } from './modal'
import { Text } from './text'

export type ToastVariant = 'info' | 'success' | 'error'

export interface ToastProps extends ModalStateProps {
  variant?: ToastVariant
  title?: string
  message?: string
  duration?: number
  onPress?: () => void
}

const ToastComponent: React.FC<ToastProps> = ({
  variant = 'info',
  title,
  message,
  duration = 2000,
  visible,
  transitionDuration = 500,
  onDismiss,
  onUnmounted,
  onPress,
}) => {
  const theme = useTheme()
  const insets = useSafeAreaInsets()

  const variantTheme = theme.componentTheme.toast.variants[variant]

  const timeoutRef = useRef<NodeJS.Timeout>()

  const handleHandlerStateChange: ModalProps['onHandlerStateChange'] =
    event => {
      switch (event.nativeEvent.state) {
        case 2:
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
          break
        case 1:
        case 3:
        case 5:
          timeoutRef.current = setTimeout(() => onDismiss?.(), duration)
          break
      }
    }

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => onDismiss?.(),
      duration + transitionDuration,
    )

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <Modal
      zIndex={theme.componentTheme.toast.zIndex}
      visible={visible}
      transition="slide-down"
      transitionDuration={transitionDuration}
      backdrop={false}
      enableDismissGesture={true}
      onDismiss={onDismiss}
      onUnmounted={onUnmounted}
      onPress={onPress}
      onHandlerStateChange={handleHandlerStateChange}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: theme.spacing,
        paddingTop: theme.spacing + insets.top,
        backgroundColor: variantTheme.backgroundColor,
      }}
    >
      {title && (
        <Text
          style={[
            theme.textTheme.small,
            {
              fontWeight: '500',
              color: variantTheme.textColor,
              marginBottom: 5,
            },
          ]}
        >
          {title}
        </Text>
      )}
      {message && (
        <Text
          style={{
            color: variantTheme.textColor,
          }}
        >
          {message}
        </Text>
      )}
    </Modal>
  )
}

export const Toast = memo(ToastComponent)
