import React, { memo, useEffect, useRef, useState } from 'react'
import { globalEvent } from '../core/event'
import {
  AlertDialog,
  AlertDialogProps,
  ConfirmDialog,
  ConfirmDialogProps,
  PromptDialog,
  PromptDialogProps,
} from './dialog'

type MakeOptions<T> = Omit<T, 'visible' | 'onDismiss'>

export type AlertDialogOptions = MakeOptions<AlertDialogProps>

const AlertDialogDelegate: React.FC = memo(() => {
  const [visible, setVisible] = useState(false)
  const [options, setOptions] = useState({} as AlertDialogOptions)
  const callbackRef = useRef<() => void>()

  useEffect(() => {
    globalEvent.on('Dialog.showAlert', event => {
      const { options, callback } = event.data

      callbackRef.current = callback

      setOptions(options)
      setVisible(true)
    })

    return () => {
      globalEvent.off('Dialog.showAlert')
    }
  }, [])

  return (
    <AlertDialog
      visible={visible}
      onDismiss={() => {
        setVisible(false)
        callbackRef.current?.()
      }}
      {...options}
    />
  )
})

export type ConfirmDialogOptions = MakeOptions<ConfirmDialogProps>

const ConfirmDialogDelegate: React.FC = memo(() => {
  const [visible, setVisible] = useState(false)
  const [options, setOptions] = useState({} as ConfirmDialogOptions)
  const callbackRef = useRef<(result: boolean) => void>()

  useEffect(() => {
    globalEvent.on('Dialog.showConfirm', event => {
      const { options, callback } = event.data

      callbackRef.current = callback

      setOptions(options)
      setVisible(true)
    })

    return () => {
      globalEvent.off('Dialog.showConfirm')
    }
  }, [])

  return (
    <ConfirmDialog
      visible={visible}
      onDismiss={result => {
        setVisible(false)
        callbackRef.current?.(result)
      }}
      {...options}
    />
  )
})

export type PromptDialogOptions = MakeOptions<PromptDialogProps>

const PromptDialogDelegate: React.FC = memo(() => {
  const [visible, setVisible] = useState(false)
  const [options, setOptions] = useState({} as PromptDialogOptions)
  const callbackRef = useRef<(result?: string) => void>()

  useEffect(() => {
    globalEvent.on('Dialog.showPrompt', event => {
      const { options, callback } = event.data

      callbackRef.current = callback

      setOptions(options)
      setVisible(true)
    })

    return () => {
      globalEvent.off('Dialog.showPrompt')
    }
  }, [])

  return (
    <PromptDialog
      visible={visible}
      onDismiss={result => {
        setVisible(false)
        callbackRef.current?.(result)
      }}
      {...options}
    />
  )
})

export const DialogDelegate: React.FC = () => {
  return (
    <>
      <AlertDialogDelegate />
      <ConfirmDialogDelegate />
      <PromptDialogDelegate />
    </>
  )
}
