import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

export interface ModalBuilderParams {
  visible: boolean
  duration: number
  handleDismiss: () => void
}

export interface ModalControllerRef {
  handleDismiss: () => void
}

export interface ModalControllerProps {
  duration?: number
  children: (params: ModalBuilderParams) => React.ReactNode
}

export const ModalController = forwardRef<
  ModalControllerRef,
  ModalControllerProps
>(({ duration = 400, children }, ref) => {
  const [visible, setVisible] = useState(false)

  const handleDismiss = () => {
    setVisible(false)
  }

  useEffect(() => {
    setVisible(true)
  }, [])

  useImperativeHandle(ref, () => {
    return { handleDismiss }
  })

  return (
    <>
      {children({
        duration,
        visible,
        handleDismiss,
      })}
    </>
  )
})
