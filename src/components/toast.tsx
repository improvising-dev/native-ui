import React from 'react'
import { Modal, ModalStateProps } from './modal'

export interface ToastProps extends ModalStateProps {}

export const Toast: React.FC<ToastProps> = ({
  visible,
  transitionDuration,
  onDismiss,
  onUnmounted,
}) => {
  return (
    <Modal
      visible={visible}
      transitionDuration={transitionDuration}
      backdrop={false}
      onDismiss={onDismiss}
      onUnmounted={onUnmounted}
    ></Modal>
  )
}
