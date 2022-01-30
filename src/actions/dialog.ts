import {
  AlertDialogOptions,
  ConfirmDialogOptions,
  PromptDialogOptions,
} from '../components/dialog-delegate'
import { globalEvent } from '../core/event'

export const showAlert = (options: AlertDialogOptions) => {
  return new Promise<void>(resolve => {
    globalEvent.fire('Dialog.showAlert', {
      options,
      callback: resolve,
    })
  })
}

export const showConfirm = (options: ConfirmDialogOptions) => {
  return new Promise<boolean>(resolve => {
    globalEvent.fire('Dialog.showConfirm', {
      options,
      callback: resolve,
    })
  })
}

export const showPrompt = (options: PromptDialogOptions) => {
  return new Promise<string | undefined>(resolve => {
    globalEvent.fire('Dialog.showPrompt', {
      options,
      callback: resolve,
    })
  })
}
