import React from 'react'
import {
  AlertDialog,
  AlertDialogProps,
  ConfirmDialog,
  ConfirmDialogProps,
  PromptDialog,
  PromptDialogProps,
} from '../components/dialog'
import { ModalStateProps } from '../components/modal'
import { showModal } from './modal'

export type AlertOptions = Omit<AlertDialogProps, keyof ModalStateProps>
export type ConfirmOptions = Omit<ConfirmDialogProps, keyof ModalStateProps>
export type PromptOptions = Omit<PromptDialogProps, keyof ModalStateProps>

export const showAlert = (options: AlertOptions) => {
  return new Promise<void>(resolve => {
    const { dispose } = showModal({
      builder: ({ visible, handleDismiss }) => (
        <AlertDialog
          visible={visible}
          onDismiss={handleDismiss}
          onDisappered={() => resolve(dispose())}
          {...options}
        />
      ),
    })
  })
}

export const showConfirm = (options: ConfirmOptions) => {
  return new Promise<boolean>(resolve => {
    let value: boolean

    const { dispose } = showModal({
      builder: ({ visible, handleDismiss }) => (
        <ConfirmDialog
          visible={visible}
          onDismiss={result => {
            value = result
            handleDismiss()
          }}
          onDisappered={() => {
            dispose()
            resolve(value)
          }}
          {...options}
        />
      ),
    })
  })
}

export const showPrompt = (options: PromptOptions) => {
  return new Promise<string | undefined>(resolve => {
    let value: string | undefined

    const { dispose } = showModal({
      builder: ({ visible, handleDismiss }) => (
        <PromptDialog
          visible={visible}
          onDismiss={result => {
            value = result
            handleDismiss()
          }}
          onDisappered={() => {
            dispose()
            resolve(value)
          }}
          {...options}
        />
      ),
    })
  })
}
