import {
  AlertDialog,
  AlertDialogProps,
  ConfirmDialog,
  ConfirmDialogProps,
  PromptDialog,
  PromptDialogProps,
} from '../components/dialog'
import { showModal } from './modal'

export type AlertOptions = Omit<AlertDialogProps, 'onDismiss'>
export type ConfirmOptions = Omit<ConfirmDialogProps, 'onDismiss'>
export type PromptOptions = Omit<PromptDialogProps, 'onDismiss'>

export const showAlert = (options: AlertOptions) => {
  return new Promise<void>(resolve => {
    const disposeModal = showModal(
      <AlertDialog
        onDismiss={() => {
          disposeModal()
          resolve()
        }}
        {...options}
      />,
    )
  })
}

export const showConfirm = (options: ConfirmOptions) => {
  return new Promise<boolean>(resolve => {
    const disposeModal = showModal(
      <ConfirmDialog
        onDismiss={result => {
          disposeModal()
          resolve(result)
        }}
        {...options}
      />,
    )
  })
}

export const showPrompt = (options: PromptOptions) => {
  return new Promise<string | undefined>(resolve => {
    const disposeModal = showModal(
      <PromptDialog
        onDismiss={result => {
          disposeModal()
          resolve(result)
        }}
        {...options}
      />,
    )
  })
}
